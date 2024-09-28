import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Form, Input, Button, message as antdMessage,
} from 'antd';
import useStore from '../store/index';
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function NDA() {
  const location = useLocation();
  const { selfUserID, bUserID } = location.state || {};
  const { sendMessage } = useStore();
  const {
    getMessages,
    isLoading,
    error,
    setError,
  } = useStore();

  const [messages, setMessages] = useState([]);

  // Endorsement form handler
  const handleSendMessage = async (values) => {
    const { msg } = values;
    try {
      const result = await sendMessage(msg, bUserID);
      console.log(result);
      if (result.error) {
        antdMessage.error('Ensure your message is void of profanity.');
      }
    } catch {
      setError('Endorsement failed.');
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    if (selfUserID && bUserID) {
      const fetchData = async () => {
        try {
          const result = await getMessages(selfUserID, bUserID); // Fetch messages
          setMessages(result); // Assuming `getMessages` returns the list of tuples
        } catch (err) {
          console.error('Failed to fetch messages', err);
        }
      };
      fetchData();
    }
  }, [selfUserID, bUserID, getMessages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>NON-DISCLOSURE AGREEMENT</h1>
      <h2>PARTIES</h2>
      <p>
        This Non-Disclosure Agreement (hereinafter referred to as the Agreement) is entered into by and between
        PARTY1, with an address of EMAIL1, and tindar index of INDEX1 (hereinafter referred to as the Disclosing Party),
        and PARTY2, with an address of EMAIL2 (hereinafter referred to as the Receiving Party)
        (collectively referred to as the Parties).
      </p>
      <h2>CONFIDENTIAL INFORMATION</h2>
      <p>
        The Receiving Party agrees not to disclose, copy, clone, or modify any confidential information
        related to the Disclosing Party and agrees not to use any such information without obtaining consent.
        Confidential Information refers to any data and/or information related to the Disclosing Party,
        in any form, but not limited to, oral or written. Such confidential information includes, but is not limited to, any information
        related to the business or industry of the Disclosing Party, such as discoveries, processes, techniques, programs, knowledge-bases,
        customer lists, potential customers, business partners, affiliated partners, leads, know-how, or any other services related to the Disclosing Party.
      </p>
      <h2>STIPULATIONS</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <li key={message[0]}>
              <strong>{message[0]}. {message[1]}:</strong> {message[2]}
            </li>
          ))
        ) : (
          <li>No messages available</li>
        )}
      </ul>
      <NavBar />
      <h2>Send a message</h2>
      <Form layout="vertical" onFinish={handleSendMessage}>
        <Form.Item
          label="Enter msg"
          name="msg"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (!value) {
                  antdMessage.error('Please enter a message');
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
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NDA;
