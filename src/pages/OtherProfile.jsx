import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Image } from 'antd';
import useStore from '../store/index';
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function OtherProfile() {
  const location = useLocation();
  const { userID } = location.state || {};
  const {
    user,
    getOtherProfile,
    isLoading,
    error,
  } = useStore();

  useEffect(() => {
    if (userID) {
      getOtherProfile(userID);
    }
  }, [userID, getOtherProfile]);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="profile-container">
      <h1>{user.name}s Resume</h1>
      <Image src="https://parade.com/.image/t_share/MTk3MTYxNjA3ODYyNjkxMTM1/rachel-mcadams-dating-history-copy.jpg" />
      <h2>Name: {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Major: {user.major}</p>
      <p>Minor: {user.minor}</p>
      <p>Skills: {user.skills.join(', ')}</p>
      <p>Interests: {user.interests.join(', ')}</p>
      <p>Tindar Index: {user.tindarIndex}</p>
      <p>Endorsements: {user.endorsements}</p>
      <NavBar />
    </div>
  );
}

export default OtherProfile;
