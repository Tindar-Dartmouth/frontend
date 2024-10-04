import React, { useEffect } from 'react';
import useStore from '../store/index';
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function UserProfile() {
  const {
    user, getProfile, isLoading, error,
  } = useStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

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
              <strong>Dartmouth College</strong>, Hanover, NH
              <br />
              Bachelor of Arts, Major in {user.major}, Minor in {user.minor}
              <br />
              Calls of {user.classYear}
            </li>
          </ul>
        </section>

        <section className="resume-section">
          <h3><div className="newH2">Endorsements</div></h3>
          <ul>
            <li>
              <strong>Software Developer</strong> - Company Name, City, State
              <br />
              January 2023 - Present
              <ul>
                <li>Developed web applications using React and Node.js.</li>
                <li>Collaborated with cross-functional teams to enhance user experience.</li>
              </ul>
            </li>
            <li>
              <strong>Intern</strong> - Another Company Name, City, State
              <br />
              June 2022 - December 2022
              <ul>
                <li>Assisted in developing backend services with Python and Flask.</li>
                <li>Conducted testing and debugging of software applications.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="resume-section">
          <h3><div className="newH2">Skills ＆ Interests</div></h3>
          <ul>
            <p><strong>Skills:</strong> {user.skills}</p>
            <p><strong>Interests:</strong> {user.interests}</p>
          </ul>
        </section>

        <section className="resume-section">
          <h3><div className="newH2">Analytics</div></h3>
          <ul>
            <li>
              <strong>Portfolio Website</strong> - A personal portfolio website built with React.
            </li>
            <li>
              <strong>Task Manager App</strong> - A task management application using Python and Flask.
            </li>
          </ul>
        </section>
      </div>
      <NavBar />
    </div>
  );
}

export default UserProfile;
