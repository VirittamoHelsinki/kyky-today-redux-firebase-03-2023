import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext, Link } from 'react-router-dom';
import starFilled from '../../image/star-filled.svg';
import starBlank from '../../image/star-white.svg';

const OwnJobs = () => {
  const setSelectedWindow = useOutletContext();
  const [jobs, setJobs] = useState([]);
  const [profileRating, setProfileRating] = useState(1);

  const _jobs = useSelector((state) => state.jobs.cards);

  useEffect(() => {
    setSelectedWindow('own-jobs');
  }, []);

  useEffect(() => {
    if (Array.isArray(_jobs)) {
      setJobs(_jobs);
    }
  }, []);

  function loopStars() {
    let star_img_list = [];
    for (let i = 0; i < profileRating; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starFilled} alt="" />);
    }
    for (let i = profileRating; i < 5; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starBlank} alt="" />);
    }
    return star_img_list;
  }

  return (
    <div className="own-jobs-main">
      <div className="job-main-title-and-add-job-button">
        <div className="job-main-title">
          <p>Active jobs</p>
        </div>
        <Link to="/calendar/job-creation">
          <button className="add-job-button">Create a job</button>
        </Link>
      </div>
      <div className="own-job-items">
        {jobs.map((job, index) => (
          <div className="job-container" key={index}>
            <div className="job-container-leftside">
              <div className="job-image">
                <img src={job.urls[0]} className="image" alt="" />
              </div>
              <div className="job-title-and-details">
                <div className="job-title">
                  <p>{job.headline}</p>
                </div>
                <div className="job-details">
                  <div className="detail">
                    <div className="detail-title">
                      <p>Price</p>
                    </div>
                    <div className="detail-value">
                      <p>
                        {job.price} {job.unit}
                      </p>
                    </div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">
                      <p>Page views</p>
                    </div>
                    <div className="detail-value">
                      <p>{job.pageviews}</p>
                    </div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">
                      <p>Active</p>
                    </div>
                    <div className="detail-value">
                      <p>6</p>
                    </div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">
                      <p>Created</p>
                    </div>
                    <div className="detail-value">
                      <p>{new Date(job.created.seconds * 1000).toLocaleDateString('fi-FI')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="job-container-rightside">
              <div className="job-rating-and-buttons">
                <div className="job-rating">{loopStars().map((star) => star)}</div>
                <div className="job-buttons">
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnJobs;
