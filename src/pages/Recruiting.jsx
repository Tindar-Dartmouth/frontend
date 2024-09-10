import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { useSwipeable } from 'react-swipeable';
import NavBar from '../components/NavBar';
import useStore from '../store/index'; // Import the zustand store
import '../style/RecruitingStyle.css'; // Make sure this CSS file is still included

// SwipingCards component definition
function SwipingCards({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deckEmpty, setDeckEmpty] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState('');

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      console.log(direction === 'right' ? 'Liked' : 'Disliked', data[currentIndex].name);
      setSwipeDirection('');
      // const nextIndex = (currentIndex + 1) % data.length;
      const nextIndex = (currentIndex + 1);
      setCurrentIndex(nextIndex);
      if (currentIndex >= data.length - 1) {
        console.log('deck proc.d as empty');
        setDeckEmpty(true);
      }
    }, 500); // Duration should match the CSS transition time
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (data.length === 0) return <p>No data available</p>;
  if (deckEmpty) return <p>Deck is empty</p>;
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
                <div className="text-overlay">
                  <div className="text-content">
                    <span className="card-meta-title">{data[currentIndex].name}</span>
                    <div className="card-meta-subtitle">Major: {data[currentIndex].major}</div>
                    <div className="card-meta-subtitle">Minor: {data[currentIndex].minor}</div>
                    <div className="card-meta-subtitle">Skills: {data[currentIndex].skills.join(', ')}</div>
                    <div className="card-meta-subtitle">Interests: {data[currentIndex].interests.join(', ')}</div>
                    <div className="card-meta-subtitle">Tindar Index: {data[currentIndex].tindarIndex}</div>
                  </div>
                </div>
              </div>
            )}
            style={{ width: 300, margin: '0 auto', textAlign: 'center' }}
          />
        </div>
        <div className="buttons-container">
          <Button onClick={() => handleSwipe('left')}>No</Button>
          <Button onClick={() => handleSwipe('right')}>Yes</Button>
        </div>
      </div>
    );
  }
}

// Recruiting component definition
function Recruiting() {
  const [cards, setCards] = useState([]);
  const { setError, isLoading, setLoading } = useStore();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/recruiting', {
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
          return {
            id,
            name: user.name,
            image: user.image || 'https://via.placeholder.com/150', // Default image if not provided
            major: user.major?.[0] || 'N/A',
            minor: user.minor?.[0] || 'N/A',
            skills: user.skills?.[0] ? user.skills[0].split(',') : [], // Assuming skills are comma-separated
            interests: user.interests?.[0] ? user.interests[0].split(',') : [], // Assuming interests are comma-separated
            tindarIndex: user.tindarIndex?.[0] || 0,
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
    return <p>Loading...</p>;
  }

  return (
    <div className="recruiting-container">
      <h2>Recruiting Page</h2>
      {cards.length > 0 ? (
        <SwipingCards data={cards} />
      ) : (
        <p>No users found.</p>
      )}
      <NavBar />
    </div>
  );
}

export default Recruiting;
