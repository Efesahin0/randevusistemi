import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Tabs, Calendar, Badge, Card, Row, Col, Modal, Spin, Empty, Typography } from "antd";
import '../css/CalenderPage.css';

const { Title } = Typography;

function CalenderPage() {
    const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3001/randevular");
        setAppointments(res.data || []);
      } catch (e) {
        console.error("Randevu çekme hatası:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Ay görünümü
  const monthRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const list = appointments.filter((a) => a.randevudate === dateStr);

    return (
      <div className="calendar-cell">
        <div className="calendar-date">{value.date()}</div>
        {list.slice(0, 2).map((it) => (
          <div
            key={it.randevuid}
            className="calendar-item"
            onClick={() => setSelected(it)}
          >
            {it.randevusaati} — {it.name}
          </div>
        ))}
        {list.length > 2 && (
          <div style={{ fontSize: 11, opacity: 0.6 }}>
            +{list.length - 2} daha
          </div>
        )}
      </div>
    );
  };

  // 🔹 Hafta görünümü
  const WeekView = () => {
    const startOfWeek = dayjs().startOf("week");
    const days = Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day")
    );

    return (
      <Row gutter={16}>
        {days.map((day) => {
          const dateStr = day.format("YYYY-MM-DD");
          const dayAppointments = appointments.filter(
            (a) => a.randevudate === dateStr
          );

          return (
            <Col span={24 / 7} key={dateStr}>
              <div className="week-day-col">
                <h4 className="week-day-title">{day.format("DD MMM")}</h4>
                {dayAppointments.map((app) => (
                  <Card
                    key={app.randevuid}
                    size="small"
                    className="appointment-card"
                    onClick={() => setSelected(app)}
                  >
                    <p>
                      <b>{app.randevusaati}</b>
                    </p>
                    <p>
                      {app.name} {app.surname}
                    </p>
                  </Card>
                ))}
              </div>
            </Col>
          );
        })}
      </Row>
    );
  };

  // 🔹 Gün görünümü
  const DayView = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const todaysAppointments = appointments
      .filter((a) => a.randevudate === today)
      .sort((a, b) =>
        (a.randevusaati || "").localeCompare(b.randevusaati || "")
      );

    return (
      <div>
        <Title level={4} className="day-view-title">
          {dayjs().format("D MMMM YYYY")} Randevuları
        </Title>
        {todaysAppointments.length === 0 ? (
          <Empty description="Bugün için randevu yok" className="empty-state" />
        ) : (
          todaysAppointments.map((app) => (
            <Card
              key={app.randevuid}
              className="appointment-card"
              onClick={() => setSelected(app)}
            >
              <p>
                <b>{app.randevusaati}</b> — {app.name} {app.surname}
              </p>
              <p>{app.randevutürü}</p>
            </Card>
          ))
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div
        style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin tip="Yükleniyor..." />
      </div>
    );
  }

  return (
    <div className="appointments-wrapper">
      <Tabs
        defaultActiveKey="month"
        items={[
          {
            key: "month",
            label: "Aylık",
            children: (
              <Calendar fullscreen dateFullCellRender={monthRender} />
            ),
          },
          {
            key: "week",
            label: "Haftalık",
            children: <WeekView />,
          },
          {
            key: "day",
            label: "Günlük",
            children: <DayView />,
          },
        ]}
      />

      {/* 🔹 Modal */}
      <Modal
        open={!!selected}
        title="Randevu Detayı"
        onCancel={() => setSelected(null)}
        footer={null}
      >
        {selected && (
          <>
            <p>
              <b>Hasta:</b> {selected.name} {selected.surname}
            </p>
            <p>
              <b>Tarih:</b> {selected.randevudate} {selected.randevusaati}
            </p>
            <p>
              <b>Doktor:</b> {selected.doctor}
            </p>
            <p>
              <b>Tür:</b> {selected.randevutürü}
            </p>
            <p>
              <b>TCKN:</b> {selected.tckn}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}
  
export default CalenderPage