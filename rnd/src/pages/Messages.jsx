import React from 'react'
import { useMessages } from '../contextapi/MessageContext';
import { Button } from 'antd';
import {
  DeleteOutlined , 
  ReadOutlined ,
  MessageOutlined
 
} from '@ant-design/icons';
function Messages() {

  const { messages } = useMessages();
  return (
    <div>
      <div>
        <h1> TÜM MESAJLAR </h1>

      </div>
      <div>
              {messages.map((msg, index) => (
                <div key={index} style={{ border: '1px solid black', margin: '20px', padding: '20px' }}>
                  <p><strong>Gönderen:</strong> {msg.adsoyad}</p> 
                  <p><strong>Başlık:</strong> {msg.baslik }</p>
                  <p><strong>Mesaj:</strong> {msg.mesaj}</p>       
            <div style={{ display: 'flex', gap: '10px' }}>
            <Button type="primary" block>
              Cevapla
              <MessageOutlined />
            </Button>
              <Button type="primary" block>
              Okundu Olarak İşaretle
              <ReadOutlined />
            </Button>
              <Button type="dashed" block>
            Sil
            <DeleteOutlined />
            </Button>
            </div>
            </div>
            ))}
      </div>
      <div>

      


      </div>
    </div>
  )
}

export default Messages