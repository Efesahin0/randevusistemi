import React from 'react'
import { Form, Input, Button, Flex , DatePicker , TimePicker , Select} from 'antd';
import { useAppointments } from '../contextapi/AppointmentContext';
import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';
const format = 'HH:mm';


function AddAppointmentPage() {

     const [form] = Form.useForm();

     const { addAppointment } = useAppointments();

     const handleAppointment = (values)=>{

        addAppointment(values);
        form.resetFields();
        alert("Randevu Talebiniz Oluşturuldu");


     }

  return (
    <div>
        <div> 
        <h1> RANDEVU EKLE </h1>
        </div>

        <div>
        <Form
        form={form}
        onFinish={handleAppointment}
        scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >


      <Form.Item name="name" label="Adınız" rules={[{ required: true }] } >
        <Input />
      </Form.Item>

  

      <Form.Item name="surname" label="Soyadınız" rules={[{ required: true }]}>
     
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item name="tckn" label="TC Kimlik Numaranız" rules={[{ required: true }]}>
        <Input.TextArea rows={1} />
      </Form.Item>

       <Form.Item name="randevudate" label="Randevu Tarihi Seçiniz" rules={[{ required: true }]}>
                <DatePicker
                        defaultValue={dayjs('2019-09-03', dateFormat)}
                        minDate={dayjs('2019-08-01', dateFormat)}
                        maxDate={dayjs('2020-10-31', dateFormat)}
                />
        </Form.Item>

      
      <Form.Item name="randevusaati" label="Randevu Saati" rules={[{ required: true }] } >
        <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
      </Form.Item>

      
      <Form.Item name="doctor" label="Doktor seçiniz" rules={[{ required: true }] } >
        <Select
            showSearch
            placeholder="Doktor Seçiniz"
            filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
            { value: '1', label: 'Gonca' },
            { value: '2', label: 'Efe' },
            { value: '3', label: 'Selin' },
            ]}
        />
      </Form.Item>

      <Form.Item name="randevutürü" label="İşlem seçiniz" rules={[{ required: true }] } >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Flex gap="small">
          <Button type="primary" htmlType="submit" >
            Gönder
          </Button>
          <Button danger onClick={() => form.resetFields()}>
            Tümünü Temizle
          </Button>
        </Flex>
      </Form.Item>
    </Form>
        </div>



    </div>
  )
}

export default AddAppointmentPage