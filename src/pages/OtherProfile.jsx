import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../store/index';
import NavBar from '../components/NavBar';
import '../style/OtherUserProfileStyle.css';

function OtherProfile() {
  const location = useLocation();
  const { userID } = location.state || {};
  const {
    user,
    getOtherProfile,
    isLoading,
    error,
  } = useStore();

  useEffect(() => {
    if (userID) {
      getOtherProfile(userID);
    }
  }, [userID, getOtherProfile]);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
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
        </section>

        <section className="resume-section">
          <h3><div className="newH2">Skills ＆ Interests</div></h3>
          <ul>
            <p><strong>Skills:</strong> {user.skills}</p>
            <p><strong>Interests:</strong> {user.interests}</p>
          </ul>
        </section>

      </div>
      <br /><br />
      <NavBar />
    </div>

  //   <div className="profile-container">
  //     <h1>{user.name}s Resume</h1>
  //     <Image src="https://parade.com/.image/t_share/MTk3MTYxNjA3ODYyNjkxMTM1/rachel-mcadams-dating-history-copy.jpg" />
  //     <h2>Name: {user.name}</h2>
  //     <p>Email: {user.email}</p>
  //     <p>Major: {user.major}</p>
  //     <p>Minor: {user.minor}</p>
  //     <p>Skills: {user.skills.join(', ')}</p>
  //     <p>Interests: {user.interests.join(', ')}</p>
  //     <p>Tindar Index: {user.tindarIndex}</p>
  //     <p>Endorsements: {user.endorsements}</p>
  //     <NavBar />
  //   </div>
  );
}

export default OtherProfile;
