import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import { Image } from 'antd';
import useStore from '../store/index';
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function OtherProfile() {
  const { userID } = useParams(); // Get userID from route parameters
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
      <h1>Other Profile</h1>
      <Image src="https://via.placeholder.com/150" />
      <h2>Name: {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Major: {user.major}</p>
      <p>Minor: {user.minor}</p>
      <p>Skills: {user.skills.join(', ')}</p>
      <p>Interests: {user.interests.join(', ')}</p>
      <p>Tindar Index: {user.tindarIndex}</p>
      <p>Endorsements: {user.endorsements}</p>
      <p>Endorsements Remaining: {user.endorsementsRemaining}</p>
      <p>Referrals Remaining: {user.referralsRemaining}</p>
      <NavBar />
    </div>
  );
}

export default OtherProfile;
