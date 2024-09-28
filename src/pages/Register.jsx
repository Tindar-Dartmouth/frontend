import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Input, InputNumber, Button, Select,
} from 'antd';
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
      heightFeet,
      heightInches,
    } = values;

    const heightTotal = heightFeet * 12 + heightInches;

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
        heightTotal,
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
          <Form.Item
            label="Dartmouth Email" // Corrected label
            name="email" // Ensure this matches the name used in your backend and store
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
                  return Promise.reject(new Error('Grad year must be between 24 and 28 & email must end with @dartmouth.edu'));
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
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
              { required: true, message: 'Please input your minor!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          {/* NEW SHIT */}
          <Form.Item
            label="Height"
            required
          >
            <Input.Group compact>
              <Form.Item
                name="heightFeet"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the feet!',
                  },
                  {
                    validator: (_, value) => {
                      if (value >= 3 && value <= 8) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Feet must be between 1 and 8'));
                    },
                  },
                ]}
              >
                <InputNumber min={1} max={8} placeholder="Feet" style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item
                name="heightInches"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the inches!',
                  },
                  {
                    validator: (_, value) => {
                      if (value >= 0 && value <= 11) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Inches must be between 0 and 11'));
                    },
                  },
                ]}
              >
                <InputNumber min={0} max={11} placeholder="Inches" style={{ width: '50%' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          {/* NEW SHIT */}
          <Form.Item
            label="Gender" // Corrected label
            name="sex" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your sex!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            {/* <Input /> */}
            <Select
              style={{ width: '240%' }}
              options={[
                {
                  value: 'm',
                  label: 'Male',
                },
                {
                  value: 'f',
                  label: 'Female',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Preferred Gender" // Corrected label
            name="prefSex" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your preferred gender!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            {/* <Input /> */}
            <Select
              options={[
                {
                  value: 'm',
                  label: 'Male',
                },
                {
                  value: 'f',
                  label: 'Female',
                },
                {
                  value: 'b',
                  label: 'Either',
                },
              ]}
            />
          </Form.Item>
          <h3>Please maintain honesty.</h3>
          <h3>These metrics will not be visible.</h3>
          <Form.Item
            label="GPA" // Corrected label
            name="gpa" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input your major!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Select
              style={{ width: '240%' }}
              options={[
                {
                  value: '4.0',
                  label: '4.0',
                },
                {
                  value: '3.97',
                  label: '3.95 - 3.99',
                },
                {
                  value: '3.92',
                  label: '3.90 - 3.94',
                },
                {
                  value: '3.87',
                  label: '3.85 - 3.89',
                },
                {
                  value: '3.82',
                  label: '3.80 - 3.84',
                },
                {
                  value: '3.77',
                  label: '3.75 - 3.79',
                },
                {
                  value: '3.72',
                  label: '3.70 - 3.74',
                },
                {
                  value: '3.67',
                  label: '3.65 - 3.69',
                },
                {
                  value: '3.62',
                  label: '3.60 - 3.64',
                },
                {
                  value: '3.57',
                  label: '3.55 - 3.59',
                },
                {
                  value: '3.52',
                  label: '3.50 - 3.54',
                },
                {
                  value: '3.47',
                  label: '3.45 - 3.49',
                },
                {
                  value: '3.42',
                  label: '3.40 - 3.44',
                },
                {
                  value: '3.37',
                  label: '3.35 - 3.39',
                },
                {
                  value: '3.32',
                  label: '3.30 - 3.34',
                },
                {
                  value: '3.27',
                  label: '3.25 - 3.29',
                },
                {
                  value: '3.22',
                  label: '3.20 - 3.24',
                },
                {
                  value: '3.17',
                  label: '3.15 - 3.19',
                },
                {
                  value: '3.12',
                  label: '3.10 - 3.14',
                },
                {
                  value: '3.07',
                  label: '3.05 - 3.09',
                },
                {
                  value: '3.02',
                  label: '3.00 - 3.04',
                },
                {
                  value: '2.97',
                  label: '2.95 - 2.99',
                },
                {
                  value: '2.92',
                  label: '2.90 - 2.94',
                },
                {
                  value: '2.87',
                  label: '2.85 - 2.89',
                },
                {
                  value: '2.82',
                  label: '2.80 - 2.84',
                },
                {
                  value: '2.77',
                  label: '2.75 - 2.79',
                },
                {
                  value: '2.72',
                  label: '2.70 - 2.74',
                },
                {
                  value: '2.67',
                  label: '2.65 - 2.69',
                },
                {
                  value: '2.62',
                  label: '2.60 - 2.64',
                },
                {
                  value: '2.57',
                  label: '2.55 - 2.59',
                },
                {
                  value: '2.52',
                  label: '2.50 - 2.54',
                },
              ]}
            />

          </Form.Item>
          <Form.Item
            label="Rice Purity Score" // Corrected label
            name="ricePurity" // Ensure this matches the name used in your backend and store
            rules={[
              {
                required: true,
                message: 'Please input a number!',
              },
              {
                validator: (_, value) => {
                  if (value >= 0 && value <= 100) {
                    return Promise.resolve(); // Number is valid
                  }
                  return Promise.reject(new Error('Number must be between 0 and 100'));
                },
              },
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <h3>Keep skills under 30 characters total.</h3>
          <Form.Item
            label="First Skill" // Corrected label
            name="skill1" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input a skill!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Second Skill" // Corrected label
            name="skill2" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input a skill!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Third Skill" // Corrected label
            name="skill3" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input a skill!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <h3>Keep interests under 30 characters total.</h3>
          <Form.Item
            label="First Interest" // Corrected label
            name="interest1" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input an interest!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Second Interest" // Corrected label
            name="interest2" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input an interest!' }, // Updated message
              // Removed incorrect type validation
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Third Interest" // Corrected label
            name="interest3" // Ensure this matches the name used in your backend and store
            rules={[
              { required: true, message: 'Please input an interest!' }, // Updated message
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
