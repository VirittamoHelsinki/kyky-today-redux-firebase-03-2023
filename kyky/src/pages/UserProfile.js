import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../redux/chat/contactSlice';
import { addNotification } from '../redux/notifications/notificationSlice';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Card from '../components/Card';
import starFilled from '../image/star-filled.svg';
import starBlank from '../image/star-white.svg';
import '../styles/UserProfile.scss';

const UserProfile = () => {
  const [profileName, setProfileName] = useState('');
  const [profileTitle, setProfileTitle] = useState('');
  const [profileRating, setProfileRating] = useState(0);
  const [lastseen, setLastseen] = useState(new Date('2023-02-03'));
  const [registered, setRegistered] = useState(new Date('2023-01-12'));
  const [userType, setUserType] = useState('Seller');
  const [location, setLocation] = useState('');
  const [allJobs, setAllJobs] = useState('4');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [ratings, setRatings] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [uid, setUid] = useState(null);

  const _user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { slug } = useParams();

  const getUserId = async (slug) => {
    try {
      const idSnap = await getDoc(doc(db, 'slugs', slug));
      setUid(idSnap.data().uid);
    } catch (error) {
      return;
    }
  };

  const getUserProfile = async (uid) => {
    try {
      const profileSnap = await getDoc(doc(db, 'users', uid, 'data', 'profile'));
      if (profileSnap.exists()) {
        setProfileImage(profileSnap.data().url);
        setProfileName(profileSnap.data().name);
        setProfileTitle(profileSnap.data().title);
        setLocation(profileSnap.data().city + ', ' + profileSnap.data().country.label);
        setDescription(profileSnap.data().workInput);
        setSkills(profileSnap.data().skills);
      }
    } catch (error) {
      return;
    }
  };

  const getUserData = async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, 'users', uid, 'data', 'userdata'));
      setLastseen(new Date(userSnap.data().lastseen.seconds * 1000));
      setRegistered(new Date(userSnap.data().created.seconds * 1000));
      setProfileRating(Math.round(userSnap.data().totalRating / userSnap.data().totalAmount));
      setUserType(userSnap.data().userType);
    } catch (error) {
      return;
    }
  };

  const getUserProfileJobs = async (uid) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where('uid', '==', uid));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      setCards(documents);
      setAllJobs(documents.length);
    } catch (error) {
      return;
    }
  };

  const getRatings = async (uid) => {
    try {
      const documents = [];
      const snap = await getDocs(collection(db, 'users', uid, 'ratings'));
      snap.docs.forEach((doc) => {
        documents.push(doc.data());
      });
      setRatings(documents);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (_user.uid) {
      setUser(_user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserId(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (uid) {
      getUserProfile(uid);
      getUserData(uid);
      getUserProfileJobs(uid);
      getRatings(uid);
    }
  }, [uid]);

  function loopReviewStars(rating) {
    let star_img_list = [];
    for (let i = 0; i < rating; i++) {
      star_img_list.push(<img className="review-star-img" key={i} src={starFilled} alt="" />);
    }
    for (let i = rating; i < 5; i++) {
      star_img_list.push(<img className="review-star-img" key={i} src={starBlank} alt="" />);
    }
    return star_img_list;
  }

  function onContactClick() {
    dispatch(
      createContact({
        myUid: user.uid,
        myName: user.displayName,
        myPhotoURL: user.photoURL,
        contactUid: uid.uid,
        contactName: uid.name,
        contactPhotoURL: uid.photoURL
      })
    );
    dispatch(
      addNotification({
        uid: uid.uid,
        notification: {
          icon: 'mail',
          color: '#4285F4',
          name: user.displayName,
          text: 'send you a message',
          to: '/seller/messages',
          read: false
        }
      })
    );
  }

  return (
    <div className="user-profile-content">
      <div className="user-profile-main">
        <div className="user-profile-right-content">
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
              <div className="user-info-rating-reviews-button">
                <div className="user-info-rating">
                  {loopReviewStars(profileRating).map((star) => star)}
                </div>
                <div className="user-info-reviews-button">
                  <p
                    className="reviews-button"
                    onClick={() => {
                      setShowReviewModal(true);
                    }}>
                    {ratings.length} ratings
                  </p>
                </div>
              </div>
            ) : (
              <div className="user-info-rating-reviews-button">
                <p>No ratings yet</p>
              </div>
            )}
            <div className="user-info-contact-button">
              {user ? (
                <button
                  className="contact-button-enabled"
                  onClick={() => {
                    onContactClick();
                    navigate('/buyer/messages');
                  }}>
                  Contact Seller
                </button>
              ) : (
                <button className="contact-button-disabled">Contact Seller</button>
              )}
            </div>
          </div>
          <div className="user-profile-user-data">
            <div className="user-data-item">
              <p className="user-data-key">Viimeksi online</p>
              <p className="user-data-value">{lastseen.toLocaleDateString('fi-FI')}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Rekisteröitynyt</p>
              <p className="user-data-value">{registered.toLocaleDateString('fi-FI')}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">User type</p>
              <p className="user-data-value">{userType}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Sijainti</p>
              <p className="user-data-value">{location}</p>
            </div>
          </div>
          <div className="user-profile-jobs-tasks">
            <div className="jobs-tasks-item">
              <p className="jobs-task-key">Kaikki käyttäjän työt</p>
              <p className="jobs-tasks-value">{allJobs}</p>
            </div>
          </div>
          <div className="user-profile-description">
            <div className="description-headline">
              <p>Kuvaus</p>
            </div>
            <div className="description-text">
              <p>{description}</p>
            </div>
          </div>
          <div className="user-profile-skills">
            <div className="skills-headline">
              <p>Taidot</p>
            </div>
            <div className="skills-content">
              {skills.map((skill, index) => (
                <div className="skill" key={index}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="user-profile-left-content">
          <div className="user-profile-user-jobs-title">
            <p>Käyttäjän työpaikat</p>
          </div>
          <div className="user-profile-user-cards-wrap">
            {cards.map((card, index) => (
              <Card job={card} key={index} />
            ))}
          </div>
        </div>
        {showReviewModal && (
          <div className="review-modal transparent-background">
            <div className="review-modal">
              <div className="review-content">
                <div className="review-close-button">
                  <span
                    className="material-icons-outlined"
                    onClick={() => setShowReviewModal(false)}>
                    close
                  </span>
                </div>
                <div className="review-title">
                  <p>Customer rating</p>
                </div>
                <div className="review-item-content">
                  {ratings.map((rating, index) => (
                    <div className="review-item" key={index}>
                      <div className="item-title-date">
                        <div className="item-title">
                          <p>{rating.buyerName}</p>
                        </div>
                        <div className="item-date">
                          <p>
                            {new Date(rating.created.seconds * 1000).toLocaleDateString('fi-FI')}
                          </p>
                        </div>
                      </div>
                      <div className="stars-rating-number">
                        <div className="stars">
                          {loopReviewStars(rating.stars).map((star) => star)}
                        </div>
                        <div className="rating-number">
                          <p>{rating.stars}</p>
                        </div>
                      </div>
                      <div className="rating-texts">
                        {rating.texts.map((text) => (
                          <div className="rating-text">{text}</div>
                        ))}
                      </div>
                      <div className="review-comment">
                        <p>{rating.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
