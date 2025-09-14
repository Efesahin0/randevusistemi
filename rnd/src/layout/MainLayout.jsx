import React, { useState } from "react";
import {

  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MedicineBoxOutlined ,
  CalendarOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom"; // 🔑 içerideki sayfaları göstermek için
import { useAuth } from "../contextapi/AuthContext";

const { Header, Content, Footer, Sider } = Layout;



const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const { user } = useAuth();

  const doctorItems = [
    { key : "/doctor/profile" , label: "Kullanıcı Paneli" , icon: <UserOutlined/> } , 
    { key : "/doctor/patients" , label: "Hastalarım" , icon: <MedicineBoxOutlined /> } , 
    { key : "/doctor/reports" , label: "Raporlar" , icon: <FileOutlined /> } ,
    { key : "/doctor/messages" , label: "Mesajlar" , icon: <FileOutlined /> } ,
    { key : "/doctor/takvim" , label: "Takvim" , icon: <FileOutlined /> } 
  ];

  const patientItems = [
    { key: "/patient/profile", label: "Kullanıcı Paneli", icon: <UserOutlined /> },
    { key: "/patient/appointments", label: "Randevularım", icon: <CalendarOutlined /> },
    { key: "/patient/add-delete-appointments", label: "Randevu Ekle/Sil", icon: <CalendarOutlined /> },
    { key: "/patient/sendmessage", label: "Mesaj İlet", icon: <FileOutlined /> },
  ]

    const items = user?.role === "doctor" ? doctorItems : patientItems;


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" 
        defaultSelectedKeys={[items[0]?.key]} 
        mode="inline" 
        items={items} 
        onClick={({key}) =>navigate(key)}/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={[{ title: "Home" }]} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Router sayfası buraya gelecek */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
         Gonca Görgülü Diş Hekimliği Randevu Sistemi ©{new Date().getFullYear()} 
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;