import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import useStore from '../store/index'; // Import the zustand store
import '../style/Leaderboard.css';

function Leaderboard() {
  const [users, setUsers] = useState({});
  const { setError, isLoading, setLoading } = useStore();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    const serverPath = 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${serverPath}/api/leaderboard`, {
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
        setUsers(data);
        console.log('Session data:', data);
      } else {
        throw new Error(data.error || 'Failed to fetch leaderboard');
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

  const goToUserProfile = (userID) => {
    navigate('/otherProfile', { state: { userID } });
  };

  return (
    <div className="leaderboard-container">
      <h2><div className="intro-font">Leaderboard of the Most Endorsed Applicants</div></h2>
      {isLoading ? (
        <p />
      ) : (
        <ul className="leaderboard-list">
          {Object.keys(users).length > 0 ? (
            Object.keys(users).map((id, index) => {
              const user = users[id];
              const imgUrl = `https://drive.google.com/thumbnail?id=${user.photoID}`;
              return (
                <li key={id} className="leaderboard-item">
                  <div className="rank-box">
                    <span className="rank-number">#{index + 1}</span>
                  </div>
                  <div className="profile-box">
                    <div className="photo-box">
                      <img alt="" src={imgUrl} />
                    </div>
                    <div className="profile-info">
                      <h3>{user.name} &apos;{String(user.classYear).slice(-2)}</h3>
                      <p>{user.major?.[0] || 'N/A'} & {user.minor?.[0] || 'N/A'}</p><br /><br />
                      <button type="submit" className="connect-button" onClick={() => goToUserProfile(user.userID)}>Resume</button>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
      <NavBar />
    </div>
  );
}

export default Leaderboard;
