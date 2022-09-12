import '../../styles/NewProfileCreation.scss';
import dogPic from '../../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';
import { ReactComponent as Star } from '../../image/star.svg';
import { ReactComponent as ProfileIcon } from '../../image/profileIcon.svg';
import Button from '../../components/Button';

export default function NewProfileCreation() {
  return (
    <div className="mainContainer">
      <div className="leftContainer">
        <h1>
          Hey FirstName. Ready for new<br></br> opportunities?
        </h1>
        <ProfileIcon />
        <div className="profileNotice">
          <p>Make a profile to get noticed!</p>
        </div>
        <p>It only takes 5-10 minutes.</p>
        <Button link="get-started" className="getStarted">
          Get Started
        </Button>
        <h1> Or </h1>
        <button className="linkedIn">Fill with LinkedIn</button>
      </div>
      <div className="rightContainer">
        <img src={dogPic} alt="dogPic" className="dogPic" />
        <h3>FirstName LastName</h3>
        <p>I will walk your dog with love and care.</p>

        <div className="ratingPrice">
          <p className="rating">
            <Star />
            4.9
          </p>
          <p className="price">30€/h</p>
        </div>
        <div className="quoteContainer">
          "I love dogs. I enjoy their company. I would be happy to help you with walking your dog."
        </div>
      </div>
    </div>
  );
}
