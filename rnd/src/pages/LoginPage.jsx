import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { useAuth } from "../contextapi/AuthContext";
import { useNavigate } from 'react-router-dom';
function LoginPage() {

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const {login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async() => {
        const result = await login(username , password);    

        if(result.success){
            if(result.role === "doctor"){
                navigate("/doctor");

            } else if(result.role === "patient"){
                navigate("/patient");
            }

        }

        else {
            alert("Giriş Hatalı");
        }
    
    }


  const onFinish = (values) => {
    console.log("Success:", values);
    handleLogin();
    // burada login işlemi yapılacak
    // örnek: login(values.username, values.password);
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5"
      }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 400, width: "100%", background: "white", padding: 30, borderRadius: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          
          autoComplete="off"
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[{ required: true, message: "Lütfen Kullanıcı Adınızı Girin!" }]}
          >
            <Input value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Lütfen Şifrenizi Girin!" }]}
          >
            <Input.Password value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Beni Hatırla</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              Giriş Yap
            </Button>
            
             <Button type="primary" htmlType="submit">
            Hesap Oluştur
            </Button>

          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;