import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Input, Button,
} from 'antd';
import useStore from '../store/index'; // Import the zustand store
import '../style/VerifyEmail1.css';

function VerifyEmail1() {
  const [form] = Form.useForm();
  const [setError] = useState('');
  const { verifyEmail1, isLoading } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const {
      email,
    } = values;

    try {
      const result = await verifyEmail1(
        email,
      );
      console.log(result);
      if (result) {
        // navigate(redirectUrl.redirect);
        navigate('/verifyEmail2');
      } else {
        setError('Email Verification Failed.');
      }
    } catch {
      setError('Email verification failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="login-section">
        <h2>Enter your email to get started.</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Dartmouth Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                validator: (_, value) => {
                  const emailRegex = /^.*(25|26|27|28)@dartmouth\.edu$/;
                  if (!value || emailRegex.test(value)) {
                    return Promise.resolve(); // Email is valid
                  }
                  // message.error('You must use a valid Dartmouth email, and class year must be between \'24 and \'28');
                  return Promise.reject(new Error('You must use a valid dartmouth email, and grad year must be between \'25 and \'28'));
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-submit-button" loading={isLoading}>
              Get Code
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default VerifyEmail1;
