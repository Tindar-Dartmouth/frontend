import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import useStore from '../store/index'; // Import the zustand store
import '../style/RegisterStyle.css';

function Register() {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const { register, isLoading } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const {
      email,
      password,
      confirmPassword,
      major,
      minor,
      sex,
      prefSex,
      gpa,
      ricePurity,
      skill1,
      skill2,
      skill3,
      interest1,
      interest2,
      interest3,
    } = values;

    if (!email.endsWith('.26@dartmouth.edu')) {
      setError('Email must end with .26@dartmouth.edu');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await register(
        email,
        password,
        major,
        minor,
        sex,
        prefSex,
        gpa,
        ricePurity,
        skill1,
        skill2,
        skill3,
        interest1,
        interest2,
        interest3,
      );
      if (result.message) {
        navigate('/recruiting'); // Redirect on successful registration
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-section">
        <h2>Register</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Input />
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          {error && <p className="error">{error}</p>}
          {/* new additions */}
          <Form.Item
            label="Major" // Corrected label
            name="major" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Minor" // Corrected label
            name="minor" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="sex" // Corrected label
            name="sex" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="pref sex ('m' 'f' or 'b')" // Corrected label
            name="prefSex" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="GPA" // Corrected label
            name="gpa" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Rice purity score" // Corrected label
            name="ricePurity" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Skill1" // Corrected label
            name="skill1" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Skill2" // Corrected label
            name="skill2" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Skill3" // Corrected label
            name="skill3" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Interest1" // Corrected label
            name="interest1" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Interest2" // Corrected label
            name="interest2" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Interest3" // Corrected label
            name="interest3" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          {/* end of new inputs */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
