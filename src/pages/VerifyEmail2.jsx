import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import useStore from '../store/index'; // Import the zustand store
import '../style/RegisterStyle.css';

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
        setError('Incorrect Code.');
      }
    } catch {
      setError('Email verification failed.');
    }
  };

  return (
    <div className="register-container">
      <h2>Verify Email 2</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email Key"
          name="emailKey"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Verify.
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default VerifyEmail2;
