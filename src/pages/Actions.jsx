import React, { useEffect } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function Actions() {
  const { endorse, refer, blacklist } = useStore();
  const {
    user, getProfile, isLoading, error, setError,
  } = useStore();

  // Endorsement form handler (Form 1)
  const handleEndorse = async (values) => {
    const { email, msg } = values;
    try {
      const result = await endorse(email, msg);
      if (result.error) {
        message.error('Ensure you have provided a message without profanity to an active user.');
      }
    } catch {
      message.error('Make sure to provide the email address of an active user of the application');
      setError('Endorsement failed.');
    }
  };

  // Referral form handler (Form 2)
  const handleReferral = async (values) => {
    const { email1, email2 } = values;
    try {
      const result = await refer(email1, email2);
      console.log(result);
      if (result.error) {
        message.error('Ensure you have provided two valid Dartmouth email addresses');
        message.error('These users might have already matched or rejected one another.');
      }
    } catch {
      message.error('Ensure you have provided two valid Dartmouth email addresses');
      setError('Referral failed.');
    }
  };

  // Blacklist form handler (Form 3)
  const handleBlacklist = async (values) => {
    const { email } = values;
    try {
      const result = await blacklist(email);
      console.log(result);
      if (result.error) {
        message.error('Ensure you have provided the email of an active user');
      }
    } catch {
      setError('Blacklist failed.');
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Actions for {user.name}</h1>
      <p>Endorsements Remaining: {user.endorsementsRemaining}</p>
      <p>Referrals Remaining: {user.referralsRemaining}</p>
      {/* Form 1: Endorsement */}
      <h2>Endorse a User</h2>
      <Form layout="vertical" onFinish={handleEndorse}>
        <Form.Item
          label="Enter Email"
          name="email"
          rules={[
            // { required: true, message: 'Please enter a valid email' },
            // { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Enter msg"
          name="msg"
          // rules={[{ required: true, message: 'Please enter a message' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Endorse
          </Button>
        </Form.Item>
      </Form>
      {/* Form 2: Referral */}
      <h2>Send a Referral</h2>
      <Form layout="vertical" onFinish={handleReferral}>
        <Form.Item
          label="Enter First Email"
          name="email1"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (!value) {
                  message.error('Ensure you have entered the email address of an active user.');
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Enter Second Email"
          name="email2"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (!value) {
                  message.error('Ensure you have entered the email address of an active user.');
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Refer
          </Button>
        </Form.Item>
      </Form>

      {/* Form 3: Blacklist */}
      <h2>Blacklist an Applicant (you will not see them in your recruiting page or connections)</h2>
      <Form layout="vertical" onFinish={handleBlacklist}>
        <Form.Item
          label="Enter Email"
          name="email"
          // rules={[{ required: true, message: 'Please enter a valid dartmouth email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Blacklist
          </Button>
        </Form.Item>
      </Form>

      <NavBar />
    </div>
  );
}

export default Actions;
