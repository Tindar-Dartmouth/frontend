import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/index'; // Import the zustand store
import NavBar from '../components/NavBar';
import '../style/connections.css';

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
      return <p><strong><div className="black">Sorry, no referrals yet.</div></strong></p>;
    }

    return users.referrals.map(([key, referral]) => (
      <div>
        <div className="connect-box">
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
        </div>
      </div>
    ));
  };

  console.log('users');
  console.log(users);

  const renderSwipingMatches = () => {
    if (users.swipingMatches.length === 0) {
      return <p>Sorry, no leads yet.</p>;
    }

    return users.swipingMatches.map((match) => (
      <div>
        <div className="connect-box">
          <li key={match.userID}>
            <div className="inner-box" />
            <p><strong>{match.name} &apos;{String(match.classYear).slice(-2)} </strong></p>
            <p>{match.major} & {match.minor}, {match.height}</p>
            <p>{parseFloat(match.tindarIndex).toFixed(2)}</p>
            <br />
            <div className="button-cont">
              <button type="submit" className="connect-button" onClick={() => goToUserProfile(match.userID)}>Resume</button>
              <button type="submit" className="connect-button" onClick={() => goToNDA(match.userID)}>Non-Disclosure Agreement</button>
            </div>
          </li>
        </div>
        <br />
      </div>
    ));
  };

  return (
    <div className="connections-container">
      <div className="gen">
        <img src="/connections.png" alt="Recruiting Page" className="relative-top-image" />
      </div>
      <br />
      <div className="connections-container">
        {isLoading ? (
          <p />
        ) : (
          <div>
            <div className="intro-box">
              <strong>Referrals</strong>
            </div>
            <ul>
              {renderReferralMatches()}
            </ul>
            <br />

            <div className="intro-box">
              <strong>Leads</strong>
            </div>
            <ul>
              {renderSwipingMatches()}
            </ul>
          </div>
        )}
        <NavBar />
      </div>
      <br />
    </div>
  );
}

export default Connections;
