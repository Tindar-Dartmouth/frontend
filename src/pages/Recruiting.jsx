import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useSwipeable } from 'react-swipeable';
import NavBar from '../components/NavBar';
import useStore from '../store/index'; // Import the zustand store
import '../style/RecruitingStyle.css'; // Make sure this CSS file is still included

// SwipingCards component definition
function SwipingCards({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deckEmpty, setDeckEmpty] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState('');

  const handleSwipe = async (direction) => {
    setSwipeDirection(direction);
    // new code for post request
    const serverPath = 'http://127.0.0.1:5000';

    try {
      const response = await fetch(`${serverPath}/api/recruiting`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: data[currentIndex].id,
          choice: direction,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send swipe direction');
      }
      console.log('Swipe direction sent successfully');
    } catch (error) {
      console.error('Error sending swipe direction:', error);
    }
    // end of post request code
    setTimeout(() => {
      console.log(direction === 'right' ? 'Liked' : 'Disliked', data[currentIndex].name);
      setSwipeDirection('');
      const nextIndex = (currentIndex + 1);
      setCurrentIndex(nextIndex);
      if (currentIndex >= data.length - 1) {
        console.log('deck proc.d as empty');
        setDeckEmpty(true);
      }
    }, 500);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (data.length === 0) return <p>No data available</p>;
  if (deckEmpty) return <p>No applicants remaining. Check back soon!</p>;
  else {
    return (
      <div className="recruiting-container">
        <div
          role="button"
          aria-label="Swipeable card"
          tabIndex={0}
          onMouseDown={swipeHandlers.onMouseDown}
          onMouseUp={swipeHandlers.onMouseUp}
          onTouchStart={swipeHandlers.onTouchStart}
          onTouchEnd={swipeHandlers.onTouchEnd}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handleSwipe('left');
            if (e.key === 'ArrowRight') handleSwipe('right');
          }}
        >
          <Card
            className={`card ${swipeDirection === 'left' ? 'swipe-left' : ''} ${swipeDirection === 'right' ? 'swipe-right' : ''}`}
            cover={(
              <div className="image-container">
                <img alt={data[currentIndex].name} src={data[currentIndex].image} className="card-image" />
                <div className="tindar-index">
                  {data[currentIndex].tindarIndex.toFixed(2)}
                </div>
                <div className="text-overlay">
                  <div className="text-content">
                    <span className="card-meta-title">{data[currentIndex].name} &apos;{data[currentIndex].classYear.toString().slice(-2)}</span>
                    <div className="card-meta-subtitle">{data[currentIndex].major} & {data[currentIndex].minor}, {data[currentIndex].height}</div>
                    {/* <div className="card-meta-subtitle">Minor: </div> */}
                    <div className="card-meta-subtitle">Skills: {data[currentIndex].skills.join(', ')}</div>
                    <div className="card-meta-subtitle">Interests: {data[currentIndex].interests.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}
            style={{ width: 300, margin: '0 auto', textAlign: 'center' }}
          />

        </div>
        <div className="buttons-container">
          <button className="dismiss-button" type="button" onClick={() => handleSwipe('left')}>Dismiss</button>
          <button className="offer-button" type="button" onClick={() => handleSwipe('right')}>Offer</button>
        </div>
      </div>
    );
  }
}

// Recruiting component definition
function Recruiting() {
  const [cards, setCards] = useState([]);
  const { setError, isLoading, setLoading } = useStore();
  const serverPath = 'http://127.0.0.1:5000';
  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${serverPath}/api/recruiting`, {
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
        // Transform the data into the format required by SwipingCards
        const transformedData = Object.keys(data).map((id) => {
          const user = data[id];
          const photoURL = `https://drive.google.com/thumbnail?id=${user.photoID}`;
          console.log('user info: ', user);
          return {
            id,
            name: user.name,
            image: user.image || photoURL, // Default image if not provided
            major: user.major?.[0] || 'N/A',
            minor: user.minor?.[0] || 'N/A',
            skills: user.skills?.[0] ? user.skills[0].split(',') : [], // Assuming skills are comma-separated
            interests: user.interests?.[0] ? user.interests[0].split(',') : [], // Assuming interests are comma-separated
            tindarIndex: user.tindarIndex?.[0] || 0,
            classYear: user.classYear,
            height: user.height,
          };
        });
        setCards(transformedData);
        console.log('Transformed data:', transformedData);
      } else {
        throw new Error(data.error || 'Failed to fetch users');
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

  if (isLoading) {
    return <p />;
  }

  return (
    <div className="recruiting-container">
      <img src="/recruiting.png" alt="Recruiting Page" className="relative-top-image" />
      {/* <h2>Recruiting Page</h2> */}
      {cards.length > 0 ? (
        <SwipingCards data={cards} />
      ) : (
        <p>No applicants remaining. Check back soon!</p>
      )}
      <NavBar />
    </div>
  );
}

export default Recruiting;
