import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import CreateProfileModal from '../../components/Profiles/CreateProfileModal';
import starFilled from '../../image/star-filled.svg';
import starBlank from '../../image/star-white.svg';
import '../../styles/Profiles.scss';

const Dashboard = () => {
  const setSelectedWindow = useOutletContext();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState('Etunimi Sukunimi');
  const [profileTitle, setProfileTitle] = useState('');
  const [profileRating, setProfileRating] = useState(0);
  const [registered, setRegistered] = useState(new Date('2023-01-12'));
  const [userType, setUserType] = useState('Seller');
  const [profileImage, setProfileImage] = useState('');

  const _user = useSelector((state) => state.user);
  const _profileChanged = useSelector((state) => state.profile.dashboard);

  const getUser = async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, 'users', uid, 'data', 'userdata'));
      setProfileName(userSnap.data().username);
      setRegistered(new Date(userSnap.data().created.seconds * 1000));
      setProfileRating(
        parseInt(userSnap.data().totalRating) / parseInt(userSnap.data().totalAmount)
      );
      setUserType(userSnap.data().userType);
    } catch (error) {
      return;
    }
  };

  const getProfile = async (uid) => {
    try {
      const profileSnap = await getDoc(doc(db, 'users', uid, 'data', 'profile'));
      if (profileSnap.exists()) {
        setProfileImage(profileSnap.data().url);
        setProfileTitle(profileSnap.data().title);
      } else {
        setProfileImage('https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp');
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    setSelectedWindow('dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_user.uid) {
      getUser(_user.uid);
      getProfile(_user.uid);
    }
  }, [_user, _profileChanged]);

  function loopReviewStars(rating) {
    let star_img_list = [];
    for (let i = 0; i < rating; i++) {
      star_img_list.push(<img className="review-star-img" key={i} src={starFilled} alt="" />);
    }
    for (let i = rating; i < 4; i++) {
      star_img_list.push(<img className="review-star-img" key={i} src={starBlank} alt="" />);
    }
    return star_img_list;
  }

  return (
    <div className="dashboard-main">
      <div className="dashboard-lower-content">
        <div className="dashboard-user-profile">
          <div className="user-profile-user-info">
            <div className="user-info-image">
              <img className="rounded-image" src={profileImage} alt="" />
            </div>
            <div className="user-info-name">
              <p>{profileName}</p>
            </div>
            <div className="user-info-title">
              <p>{profileTitle}</p>
            </div>
            {profileRating > 0 ? (
              <div className="user-info-rating">
                {loopReviewStars(profileRating).map((star) => star)}
              </div>
            ) : (
              <div className="user-info-rating">
                <p>No ratings yet</p>
              </div>
            )}
            <div className="user-profile-button">
              {profileTitle !== '' ? (
                <button className="profile-button" onClick={() => setShowProfileModal(true)}>
                  Edit profile
                </button>
              ) : (
                <button className="profile-button" onClick={() => setShowProfileModal(true)}>
                  Create profile
                </button>
              )}
            </div>
          </div>
          <div className="user-profile-user-data">
            <div className="user-data-item">
              <p className="user-data-key">Rekisteröitynyt</p>
              <p className="user-data-value">{registered.toLocaleDateString('fi-FI')}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">User type</p>
              <p className="user-data-value">{userType}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Omat keskustelut</p>
              <p className="user-data-value">Katso viestit</p>
            </div>
          </div>
          <div className="user-profile-jobs-tasks">
            <div className="jobs-tasks-item">
              <p className="jobs-task-key">Kaikki käyttäjän työt</p>
              <p className="jobs-tasks-value">20</p>
            </div>
          </div>
        </div>
        <div className="dashboard-own-sells"></div>
      </div>
      {showProfileModal && (
        <div className="create-profile-modal transparent-background">
          <div className="create-profile-modal">
            <CreateProfileModal setShowProfileModal={setShowProfileModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
