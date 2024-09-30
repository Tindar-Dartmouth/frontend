import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Input, Button, message,
} from 'antd';
import useStore from '../store/index'; // Import the zustand store
import '../style/VerifyEmail1.css';

function VerifyEmail2() {
  const [form] = Form.useForm();
  const [setError] = useState('');
  const { verifyEmail2, isLoading } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const {
      emailKey,
    } = values;

    try {
      const result = await verifyEmail2(
        emailKey,
      );
      console.log(result);
      if (result.res) {
        // navigate(redirectUrl.redirect);
        navigate('/register');
      } else {
        message.error('Incorrect code.');
        setError('Incorrect Code.');
      }
    } catch {
      setError('Email verification failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="login-section">
        <h2>You should recieve an email shortly.</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Verification Code"
            name="emailKey"
            rules={[
              {
                required: true,
                message: 'Input your verification code!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-submit-button" loading={isLoading}>
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default VerifyEmail2;
