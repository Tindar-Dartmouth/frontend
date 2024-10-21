import React, { useEffect } from 'react';
import { Img } from 'react-image';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/index';
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function UserProfile() {
  const {
    user, getProfile, isLoading, error,
  } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (!isLoading && error) {
      navigate('/login');
    }
  }, [isLoading, error, navigate]);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    navigate('/login');
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <div className="gen">
        <img src="/resume.png" alt="Recruiting Page" className="relative-top-image" />
      </div>
      <div className="resume">
        <header className="resume-header">
          <h1>{user.name}</h1>
          <p><div className="intro"><a href="https://www.mapquest.com/us/new-hampshire/collis-market-433362678">2 N Main St. Hanover NH, 03755</a> • {user.email}</div></p>
          <br />
        </header>
        <section className="resume-section">
          <h3><div className="newH2">Education</div></h3>
          <ul>
            <li>
              <strong>Dartmouth College</strong>, Hanover, NH <br />
              Tindar Index: <strong> {Number(user.tindarIndex || 0).toFixed(2)} / 100.00</strong>  Height: <strong>{user.height} / 6&apos;0&quot; </strong>
              <br />
              Bachelor of Arts, Major in {user.major}, Minor in {user.minor}
              <br />
              Class of {user.classYear}
            </li>
          </ul>
        </section>

        <section className="resume-section">
          <h3><div className="newH2">Endorsements</div></h3>
          {user.endorsements && user.endorsements.length > 0 ? (
            user.endorsements.map(([endorserId, comment], indexr) => (
              <div key={comment}>
                <span><strong>{endorserId}, Student at Dartmouth College</strong></span>
                <div className="endorsement-text">
                  <em>&quot;{comment}&quot;</em>
                </div>
              </div>
            ))
          ) : (
            <p>No endorsements yet.</p>
          )}
          <Img
            src="https://drive.google.com/uc?export=view&id=1MbB7MCA3f51poZWO_YnK094PiK1d4RmL"
            loader={<div>Loading...</div>}
          />
        </section>

        <section className="resume-section">
          <h3><div className="newH2">Skills ＆ Interests</div></h3>
          <ul>
            <p><strong>Skills:</strong> {user.skills}</p>
            <p><strong>Interests:</strong> {user.interests}</p>
          </ul>
        </section>
        {/* <img alt="" src="https://drive.google.com/thumbnail?id=1PMcGxuCNxdPXjIpGNu1dmRIftzv0l9OL" />
        <img alt="" src="https://drive.google.com/thumbnail?id=17fTjvpIF7vn6RZf28TvzD_xaNETI2zO6" />
        <img alt="pete" src="https://lh3.googleusercontent.com/d/1MbB7MCA3f51poZWO_YnK094PiK1d4RmL=s220?authuser=0" />
        <img alt="" src="https://lh3.googleusercontent.com/d/1MbB7MCA3f51poZWO_YnK094PiK1d4RmL=s300?authuser=0" /> */}
      </div>
      <br /><br />
      <NavBar />
    </div>
  );
}

export default UserProfile;
