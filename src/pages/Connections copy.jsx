import React, { useEffect, useState } from 'react';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';

function Connections() {
  const [users, setUsers] = useState({ swipingMatches: [], referrals: [] });
  const { setError, isLoading, setLoading } = useStore();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/connections', {
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
        <h3>Referred by: {key}</h3>
        <p><strong>Match User Profile:</strong></p>
        <p><strong>Name:</strong> {referral.name}</p>
        <p><strong>Email:</strong> {referral.email}</p>
        <p><strong>Class Year:</strong> {referral.classYear}</p>
        <p><strong>Major:</strong> {referral.major}</p>
        <p><strong>Minor:</strong> {referral.minor}</p>
        <p><strong>Interests:</strong> {referral.interests}</p>
        <p><strong>Skills:</strong> {referral.skills}</p>
        <p><strong>Tindar Index:</strong> {referral.tindarIndex}</p>
        <p><strong>Blurb:</strong> {referral.blurb}</p>
        <p><strong>Endorsements:</strong> {referral.endorsements}</p>
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
        <h3>Match User Profile</h3>
        <p><strong>Name:</strong> {match.name}</p>
        <p><strong>Email:</strong> {match.email}</p>
        <p><strong>Class Year:</strong> {match.classYear}</p>
        <p><strong>Major:</strong> {match.major}</p>
        <p><strong>Minor:</strong> {match.minor}</p>
        <p><strong>Interests:</strong> {match.interests}</p>
        <p><strong>Skills:</strong> {match.skills}</p>
        <p><strong>Tindar Index:</strong> {match.tindarIndex}</p>
        <p><strong>Blurb:</strong> {match.blurb}</p>
        <p><strong>Endorsements:</strong> {match.endorsements}</p>
      </li>
    ));
  };

  return (
    <div className="connections-container">
      <h2>Connections Page</h2>
      {isLoading ? (
        <p>Loading...</p>
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
