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
    const serverPath = 'http://127.0.0.1:5000';
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

  // const renderReferralMatches = () => {
  //   if (users.referrals.length === 0) {
  //     return <h2><strong><div className="black">Sorry, no referrals yet.</div></strong></h2>;
  //   }

  //   return users.referrals.map(([key, referral]) => (
  //     <div key={key}>
  //       <div className="connect-box">
  //         <li>
  //           <div className="inner-box">
  //             <img
  //               alt=""
  //               src={`https://drive.google.com/thumbnail?id=${referral.photoID}`}
  //             />
  //           </div>
  //           <p>
  //             <strong>
  //               {referral.name} &apos;{String(referral.classYear).slice(-2)}
  //             </strong>
  //             <br />
  //             Referred by {key}
  //           </p>
  //           <p>
  //             {referral.major} & {referral.minor}, {referral.height}
  //           </p>
  //           <p>
  //             {parseFloat(referral.tindarIndex).toFixed(2)}
  //           </p>
  //           <br />
  //           <div className="button-cont">
  //             <button
  //               type="submit"
  //               className="connect-button"
  //               onClick={() => goToUserProfile(referral.userID)}
  //             >
  //               Resume
  //             </button>
  //             <button
  //               type="submit"
  //               className="connect-button"
  //               onClick={() => goToNDA(referral.userID)}
  //             >
  //               Non-Disclosure Agreement
  //             </button>
  //           </div>
  //         </li>
  //       </div>
  //       <br />
  //     </div>
  //   ));
  // };
  const renderReferralMatches = () => {
    if (users.referrals.length === 0) {
      return (
        <h2>
          <strong>
            <div className="black">Sorry, no referrals yet.</div>
          </strong>
        </h2>
      );
    }
    console.log('referal as define: ', users.referrals);

    return users.referrals.map(([name, referralArray]) => {
      const [referralName, referralData] = referralArray;

      return (
        <div key={name}>
          <div className="connect-box">
            <li>
              <div className="inner-box">
                <img
                  alt=""
                  src={`https://drive.google.com/thumbnail?id=${referralData.photoID}`}
                />
              </div>
              <p>
                <strong>
                  {referralData.name} &apos;{String(referralData.classYear).slice(-2)}
                </strong>
                <br />
                <em>Referred by {referralName}</em>
              </p>
              <p>
                {referralData.major} & {referralData.minor}, {referralData.height}
              </p>
              <p>{parseFloat(referralData.tindarIndex).toFixed(2)}</p>
              <br />
              <div className="button-cont">
                <button
                  type="submit"
                  className="connect-button"
                  onClick={() => goToUserProfile(referralData.userID)}
                >
                  Resume
                </button>
                <button
                  type="submit"
                  className="connect-button"
                  onClick={() => goToNDA(referralData.userID)}
                >
                  Non-Disclosure Agreement
                </button>
              </div>
            </li>
          </div>
          <br />
        </div>
      );
    });
  };

  console.log('users');
  console.log(users);

  const renderSwipingMatches = () => {
    if (users.swipingMatches.length === 0) {
      return <h2><strong><div className="black">Sorry, no leads yet.</div></strong></h2>;
    }
    return users.swipingMatches.map((match) => (
      <div>
        <div className="connect-box">
          <li key={match.userID}>
            <div className="inner-box">
              <img alt="" src={`https://drive.google.com/thumbnail?id=${match.photoID}`} />
            </div>
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
