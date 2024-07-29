import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { useSwipeable } from 'react-swipeable';
// import {
//   HomeOutlined,
//   UserOutlined,
//   MessageOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
import NavBar from '../components/NavBar';
import '../style/RecruitingStyle.css'; // Create and import your CSS file for styling

const mockData = [
  {
    id: 1, name: 'John Doe', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 3, name: 'Alice Johnson', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 4, name: 'Robert Brown', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 5, name: 'Emily Davis', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 6, name: 'Michael Wilson', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 7, name: 'Sarah Miller', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 8, name: 'David Anderson', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 9, name: 'Linda Martinez', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 10, name: 'James Rodriguez', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 11, name: 'Patricia Garcia', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 12, name: 'Christopher Martinez', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 13, name: 'Barbara Thomas', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 14, name: 'Joseph Robinson', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 15, name: 'Susan Clark', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 16, name: 'Daniel Lewis', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 17, name: 'Jessica Lee', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 18, name: 'Paul Walker', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 19, name: 'Karen Hall', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
  {
    id: 20, name: 'Matthew Allen', image: 'https://via.placeholder.com/150', classYear: '2026',
  },
];

function Recruiting() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');

  useEffect(() => {
    // Simulate fetching data from a database
    setCards(mockData);
  }, []);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      console.log(direction === 'right' ? 'Liked' : 'Disliked', cards[currentIndex].name);
      setSwipeDirection('');
      const nextIndex = (currentIndex + 1) % cards.length;
      setCurrentIndex(nextIndex);
    }, 500); // Duration should match the CSS transition time
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="recruiting-container">
      {cards.length > 0 && (
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
            cover={<img alt={cards[currentIndex].name} src={cards[currentIndex].image} />}
            style={{ width: 300, margin: '0 auto', textAlign: 'center' }}
          >
            <Card.Meta
              title={<span className="card-meta-title">{cards[currentIndex].name}</span>}
              description={<span className="card-meta-subtitle">Class of {cards[currentIndex].classYear}</span>}
            />
          </Card>
        </div>
      )}
      <div className="buttons-container">
        <Button onClick={() => handleSwipe('left')}>No</Button>
        <Button onClick={() => handleSwipe('right')}>Yes</Button>
      </div>
      {/* <Menu mode="horizontal" className="bottom-menu" selectedKeys={[]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="messages" icon={<MessageOutlined />}>
          Messages
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu> */}
      <NavBar />
    </div>
  );
}

export default Recruiting;
