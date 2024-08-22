import React, { useEffect, useState } from 'react';
import useStore from '../store/index'; // Import the zustand store

function Leaderboard() {
  const [users, setUsers] = useState({});
  const { setError, isLoading, setLoading } = useStore();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/leaderboard', {
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
    <div className="recruiting-container">
      <h2>Leaderbaord of Most Endrosed Applicants</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Object.keys(users).length > 0 ? (
            Object.keys(users).map((id) => {
              const user = users[id];
              return (
                <li key={id}>
                  <h3>{user.name}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Class Year:</strong> {user.classYear}</p>
                  <p><strong>Major:</strong> {user.major?.[0] || 'N/A'}</p>
                  <p><strong>Minor:</strong> {user.minor?.[0] || 'N/A'}</p>
                  <p><strong>Interests:</strong> {user.interests?.[0] || 'N/A'}</p>
                  <p><strong>Skills:</strong> {user.skills?.[0] || 'N/A'}</p>
                  <p><strong>Tindar Index:</strong> {user.tindarIndex?.[0] || 'N/A'}</p>
                  <p><strong>Blurb:</strong> {user.blurb?.[0] || 'N/A'}</p>
                  <p><strong>Endorsements:</strong> {user.endorsements?.map(([endorserId, comment]) => (
                    <span key={endorserId}> {comment}</span>
                  )) || 'N/A'}
                  </p>
                </li>
              );
            })
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
