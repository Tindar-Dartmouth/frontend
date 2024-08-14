import React, { useEffect } from 'react';
import { Image } from 'antd';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function UserProfile() {
  const {
    user, getProfile, isLoading, error,
  } = useStore();

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
      <p>Blurb: {user.blurb}</p>
      <p>Endorsements Remaining: {user.endorsementsRemaining}</p>
      <p>Referrals Remaining: {user.referralsRemaining}</p>
      <NavBar />
    </div>
  );
}

export default UserProfile;
// import React from 'react';
// import { Image } from 'antd';
// import NavBar from '../components/NavBar';
// import '../style/UserProfileStyle.css';

// function UserProfile() {
//   return (
//     <div className="profile-container">
//       <h1>This Your profile</h1>
//       <Image src="https://via.placeholder.com/150" />
//       <NavBar />
//     </div>
//   );
// }

// export default UserProfile;
