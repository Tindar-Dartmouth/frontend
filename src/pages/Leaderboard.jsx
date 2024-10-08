import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import useStore from '../store/index'; // Import the zustand store
import '../style/Leaderboard.css';

function Leaderboard() {
  const [users, setUsers] = useState({});
  const { setError, isLoading, setLoading } = useStore();

  const fetchUsers = async () => {
    setLoading(true);
    const serverPath = 'https://tindar-backend-8188efd22985.herokuapp.com';
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
              return (
                <li key={id} className="leaderboard-item">
                  <div className="rank-box">
                    <span className="rank-number">#{index + 1}</span>
                  </div>
                  <div className="profile-box">
                    <div className="photo-box">{/* Photo will go here */}</div>
                    <div className="profile-info">
                      <h3>{user.name}, &apos;{String(user.classYear).slice(-2)}</h3>
                      <p><strong>Tindar Index:</strong> {user.tindarIndex?.[0] || 'N/A'}</p>
                      <p>{user.major?.[0] || 'N/A'} & {user.minor?.[0] || 'N/A'}</p>
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
