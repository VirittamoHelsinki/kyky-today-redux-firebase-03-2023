import profileIcon from '../image/profileicon2.svg';
import starIcon from '../image/star.svg'
import heartIcon from '../image/heartIcon.png'
import uploadIcon from '../image/upload.png'
import defaultJobImage from '../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg'

export default function Card({job}) {

    let jobImage = job.imageUrl ? job.imageUrl : defaultJobImage;
    let profileImage = job.profileImgUrl ? job.profileImgUrl : profileIcon;

    return (
        <div className="user-card">
            <img src={jobImage} className="user-card--image" alt={"profileImage"}/>
            <div className="user-card--username-container">
                <div className="user-card--title">
                    <img src={profileImage} className="user-card--profile-image" alt={"jobImage"}/>
                    <div className="user-card--bolded-font">{job.username}</div>
                </div>
            </div>
            <div className="user-card--job-title">{job.title}</div>
            <div className="user-card--content user-card--bolded-font rating-and-price">
                <div className="rating-and-price--star-icon-and-rating">
                    <img src={starIcon} alt={"starIcon"}/>
                    <div>{job.rating}</div>
                </div>
                <div>{job.price}</div>
            </div>
            <div className="user-card--buttons">
                <img src={heartIcon} className="heart-icon" alt={"heartIcon"}/>
                <button className="user-card--bolded-font">Learn More</button>
                <img src={uploadIcon} className="upload-icon" alt={"uploadIcon"}/>
            </div>
        </div>
    );
}
