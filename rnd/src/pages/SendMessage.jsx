import React, { useState } from 'react'
import { Button, Flex, Form, Input, Select } from 'antd';
import { useMessages } from '../contextapi/MessageContext';

function SendMessage() {

   const [form] = Form.useForm();
  const {  addMessage } = useMessages();
 

  const handleMessage = (values)=>{

    addMessage(values);
   form.resetFields();
    alert("Mesajınız Gönderildi");
  }

  return (
    <div>
      <div>
        <h1> MESAJ OLUŞTUR </h1>
      </div>
      <div>
         <Form
        form={form}
        onFinish={handleMessage}
        scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >


      <Form.Item name="adsoyad" label="Ad Soyad" rules={[{ required: true }] } >
        <Input />
      </Form.Item>

  

      <Form.Item name="baslik" label="Mesaj Başlığı" rules={[{ required: true }]}>
     
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item name="mesaj" label="Mesaj" rules={[{ required: true }]}>
        <Input.TextArea rows={6} />
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

export default SendMessage