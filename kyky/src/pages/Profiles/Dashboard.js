import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { getDashboardProfile } from '../../redux/profiles/profileSlice';
import CreateProfileModal from '../../components/Profiles/CreateProfileModal';
import starIcon from '../../image/star.svg';
import '../../styles/Profiles.scss';

const Dashboard = () => {
  const setSelectedWindow = useOutletContext();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState('Etunimi Sukunimi');
  const [profileTitle, setProfileTitle] = useState('');
  const [profileRating, setProfileRating] = useState(5);
  const [registered, setRegistered] = useState(new Date('2023-01-12'));
  const [userType, setUserType] = useState('Seller');
  const [allJobs, setAllJobs] = useState('4');
  const [ongoingBookings, setOngoingBookings] = useState('3');
  const [earnings, setEarnings] = useState('€200');
  const [profileImage, setProfileImage] = useState('');

  const dispatch = useDispatch();

  const _user = useSelector((state) => state.user);
  const _profile = useSelector((state) => state.profile.dashboardProfile);

  useEffect(() => {
    setSelectedWindow('dashboard');
  }, []);

  useEffect(() => {
    if (_user.uid) {
      dispatch(getDashboardProfile(_user.uid));
    }
  }, []);

  useEffect(() => {
    if (_profile?.name) {
      setProfileImage(_profile.s7Url);
      setProfileName(_profile.name);
      setProfileTitle(_profile.s1Title);
      setRegistered(new Date(_profile.created.seconds * 1000));
      setUserType(_user.userType);
    }
  }, [_profile]);

  function loopStars() {
    let star_img_list = [];
    for (let i = 0; i < profileRating; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starIcon} alt="" />);
    }
    return star_img_list;
  }

  return (
    <div className="dashboard-main">
      <div className="dashboard-upper-content">
        <div className="dashboard-user-data-box">
          <div className="user-data-item">
            <div className="user-data-title">
              <p>Current saldo</p>
            </div>
            <div className="user-data-value">
              <p>20,00</p>
            </div>
          </div>
          <div className="user-data-item">
            <div className="user-data-title">
              <p>Active sells</p>
            </div>
            <div className="user-data-value">
              <p>15</p>
            </div>
          </div>
          <div className="user-data-item">
            <div className="user-data-title">
              <p>Active buys</p>
            </div>
            <div className="user-data-value">
              <p>2</p>
            </div>
          </div>
          <div className="user-data-item last">
            <div className="user-data-title">
              <p>In-box messages</p>
            </div>
            <div className="user-data-value">
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
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
            <div className="user-info-rating">{loopStars().map((star) => star)}</div>
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
            <div className="jobs-tasks-item">
              <p className="jobs-tasks-key">Käynnissä olevat tilaukset</p>
              <p className="jobs-tasks-value">4</p>
            </div>
            <div className="jobs-tasks-item">
              <p className="jobs-tasks-key">Ansaittu</p>
              <p className="jobs-tasks-value">€200</p>
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
