import React, { useEffect } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';
import '../style/Actions.css';

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
      } else {
        message.success('Successful endorsement!');
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
      } else {
        message.success('Successful referral!');
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
      } else {
        message.success('Successful blacklist! You can no longer connect with that user.');
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
      <img src="src/img/actions.png" alt="Actions" className="relative-top-image" />
      {/* <h1>Actions for {user.name}</h1> */}
      <div className="login-section">
        <h2>Endorsements Remaining: {user.endorsementsRemaining}</h2>
        <h2>Referrals Remaining: {user.referralsRemaining}</h2>
      </div>
      {/* Form 1: Endorsement */}
      <div className="login-section">
        <h2>Endorse a User</h2>
        <Form layout="vertical" onFinish={handleEndorse}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              // { required: true, message: 'Please enter a valid email' },
              // { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            name="msg"
            // rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-submit-button" loading={isLoading}>
              Endorse
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* Form 2: Referral */}
      <div className="login-section">
        <h2>Send a Referral</h2>
        <Form layout="vertical" onFinish={handleReferral}>
          <Form.Item
            label="First Email"
            name="email1"
            rules={[
              {
                // required: true,
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
            label="Second Email"
            name="email2"
            rules={[
              {
                // required: true,
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
            <Button type="primary" htmlType="submit" className="login-submit-button" loading={isLoading}>
              Refer
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* Form 3: Blacklist */}
      <div className="login-section">
        <h2>Blacklist an Applicant</h2>
        <Form layout="vertical" onFinish={handleBlacklist}>
          <Form.Item
            label="Email"
            name="email"
            // rules={[{ required: true, message: 'Please enter a valid dartmouth email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-submit-button" loading={isLoading}>
              Blacklist
            </Button>
          </Form.Item>
        </Form>

        <NavBar />
      </div>
      <div className="spacer" />
    </div>
  );
}

export default Actions;
