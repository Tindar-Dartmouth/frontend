import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function UserProfile() {
  const {
    user, getProfile, isLoading, error,
  } = useStore();

  const navigate = useNavigate();
  const goToUserProfile = (userID) => {
    console.log('were here');
    navigate(`/profile/${userID}`);
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
      <h1>Your Profile</h1>
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
      <div>
        <h1>Some Page</h1>
        <button type="submit" onClick={() => goToUserProfile(49468)}>Go to User 49468s Profile</button>
      </div>
      <NavBar />
    </div>
  );
}

export default UserProfile;
