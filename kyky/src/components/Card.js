import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../image/profileicon2.svg';
import starIcon from '../image/star.svg';
import heartIcon from '../image/heartIcon.png';
import uploadIcon from '../image/upload.png';
import defaultJobImage from '../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';

export default function Card({ job }) {
  let jobImage = job.urls[0] ? job.urls[0] : defaultJobImage;
  let profileImage = job.profileImgUrl ? job.profileImgUrl : profileIcon;

  return (
    <div className="user-card">
      <img src={jobImage} className="user-card--image" alt={'profileImage'} />
      <div className="user-card--username-container">
        <div className="user-card--title">
          <img src={profileImage} className="user-card--profile-image" alt={'jobImage'} />
          <Link to={`/user-profile/${job.slug}`}>
            <div className="user-card--bolded-font">{job.name}</div>
          </Link>
        </div>
      </div>
      <div className="user-card--job-title">
        {job.description < 65 ? job.description : job.description.substring(0, 65) + '...'}
      </div>
      <div className="user-card--content user-card--bolded-font rating-and-price">
        <div className="rating-and-price--star-icon-and-rating">
          <img src={starIcon} alt={'starIcon'} />
          <div>4</div>
        </div>
        <div>
          {job.price} {job.unit}
        </div>
      </div>
      <div className="user-card--buttons">
        <img src={heartIcon} className="heart-icon" alt={'heartIcon'} />
        <Link to={'/service-booking'} state={{ ...job }}>
          <button className="user-card--bolded-font">Learn More</button>
        </Link>
        <img src={uploadIcon} className="upload-icon" alt={'uploadIcon'} />
      </div>
    </div>
  );
}

Card.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    unit: PropTypes.oneOf(['€', '$', '£']).isRequired,
    weekday: PropTypes.string.isRequired,
    weekend: PropTypes.string.isRequired,
    everyOtherWeekday: PropTypes.string.isRequired,
    everyOtherWeekend: PropTypes.string.isRequired,
    onceAMonth: PropTypes.string.isRequired,
    urls: PropTypes.arrayOf(PropTypes.string).isRequired,
    photoURL: PropTypes.string,
    slug: PropTypes.string.isRequired
  }).isRequired
};
