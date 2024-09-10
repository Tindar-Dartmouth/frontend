import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
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

    if (!email.endsWith('.26@dartmouth.edu')) {
      setError('Email must end with .26@dartmouth.edu');
      return;
    }

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
      <h2>Verify Email 1</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Dartmouth Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your Dartmouth email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Get Verification Code.
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default VerifyEmail1;
