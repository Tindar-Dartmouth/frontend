import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Input, Button, message,
} from 'antd';
import useStore from '../store/index'; // Import the zustand store
import '../style/RegisterStyle.css';

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
      <h2>Enter Your Email to Get Started</h2>
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
                const emailRegex = /^.*(24|25|26|27|28)@dartmouth\.edu$/;
                if (!value || emailRegex.test(value)) {
                  return Promise.resolve(); // Email is valid
                }
                message.error('You must use a valid Dartmouth email, and class year must be betweeb \'24 and \'28');
                return Promise.reject(new Error('You must use a valid dartmouth email, and class year must be between \'24 and \'28'));
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Get Verification Code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default VerifyEmail1;
