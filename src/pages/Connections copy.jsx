import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';

function Connections() {
  const [users, setUsers] = useState({ swipingMatches: [], referrals: [] });
  const [selfUserID, setSelfUserID] = useState(null);
  const { setError, isLoading, setLoading } = useStore();

  const navigate = useNavigate();
  const goToNDA = (bUserID) => {
    navigate('/nda', { state: { selfUserID, bUserID } });
  };

  const goToUserProfile = (userID) => {
    navigate('/otherProfile', { state: { userID } });
  };

  const fetchUsers = async () => {
    setLoading(true);
    const serverPath = 'https://tindar-backend-8188efd22985.herokuapp.com';
    try {
      const response = await fetch(`${serverPath}/api/connections`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Response was okay.');
        console.log('Session data:', data);
        const refs = Object.entries(data.refs);
        const selfUID = data.selfID;
        console.log('the selfID: ', selfUID);
        setSelfUserID(selfUID);
        console.log('here the refs: ', refs);
        const swipeMatches = Object.values(data.swipeMatches);
        setUsers({
          referrals: refs,
          swipingMatches: swipeMatches,
        });
      } else {
        throw new Error(data.error || 'Failed to fetch connections');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderReferralMatches = () => {
    if (users.referrals.length === 0) {
      return <p>No referral matches found.</p>;
    }

    return users.referrals.map(([key, referral]) => (
      <li key={key}>
        <h3>This match was referred by {key}</h3>
        <p><strong>Name:</strong> {referral.name}</p>
        <p><strong>Class Year:</strong> {referral.classYear}</p>
        <p><strong>Major:</strong> {referral.major}</p>
        <p><strong>Minor:</strong> {referral.minor}</p>
        <p><strong>Tindar Index:</strong> {referral.tindarIndex}</p>
        <button type="submit" onClick={() => goToUserProfile(referral.userID)}>Go to {referral.name}s full profile</button>
        <button type="submit" onClick={() => goToNDA(referral.userID)}>Go to NDA between with {referral.name}</button>
      </li>
    ));
  };

  console.log('users');
  console.log(users);

  const renderSwipingMatches = () => {
    if (users.swipingMatches.length === 0) {
      return <p>No swiping matches found.</p>;
    }

    return users.swipingMatches.map((match) => (
      <li key={match.userID}>
        <h3><strong>Profile</strong></h3>
        <p><strong>Name:</strong> {match.name}</p>
        <p><strong>Class Year:</strong> {match.classYear}</p>
        <p><strong>Major:</strong> {match.major}</p>
        <p><strong>Minor:</strong> {match.minor}</p>
        <p><strong>Tindar Index:</strong> {match.tindarIndex}</p>
        <button type="submit" onClick={() => goToUserProfile(match.userID)}>Go to {match.name}s full profile</button>
        <button type="submit" onClick={() => goToNDA(match.userID)}>Go to NDA between with {match.name}</button>
      </li>
    ));
  };

  return (
    <div className="connections-container">
      <h2>Connections Page</h2>
      {isLoading ? (
        <p />
      ) : (
        <div>
          <h3>Referral Matches</h3>
          <ul>
            {renderReferralMatches()}
          </ul>

          <h3>Swiping Matches</h3>
          <ul>
            {renderSwipingMatches()}
          </ul>
        </div>
      )}
      <NavBar />
    </div>
  );
}

export default Connections;
