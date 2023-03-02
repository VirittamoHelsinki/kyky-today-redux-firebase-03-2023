import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { deleteJobById } from '../../redux/jobs/jobSlice';
import CreateJobModal from '../../components/Profiles/CreateJobModal';
import starFilled from '../../image/star-filled.svg';
import starBlank from '../../image/star-white.svg';
import '../../styles/Profiles.scss';

const OwnJobs = () => {
  const setSelectedWindow = useOutletContext();
  const [jobs, setJobs] = useState([]);
  const [profileRating, setProfileRating] = useState(4);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [editjob, setEditjob] = useState(null);

  const _jobs = useSelector((state) => state.jobs.cards);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedWindow('own-jobs');
  }, []);

  useEffect(() => {
    if (Array.isArray(_jobs)) {
      setJobs(_jobs);
    }
  }, [_jobs]);

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

  function deleteJobclick(id) {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (confirm) {
      dispatch(deleteJobById(id));
    }
  }

  return (
    <div className="own-jobs-main">
      <div className="job-main-title-and-add-job-button">
        <div className="job-main-title">
          <p>Active jobs</p>
        </div>
        <button className="add-job-button" onClick={() => setShowCreateJobModal(true)}>
          Create a job
        </button>
      </div>
      {showCreateJobModal && (
        <div className="create-job-modal transparent-background">
          <div className="create-job-modal">
            <CreateJobModal
              setShowCreateJobModal={setShowCreateJobModal}
              editjob={editjob}
              setEditjob={setEditjob}
            />
          </div>
        </div>
      )}
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
                      {'seconds' in job.created ? (
                        <p>{new Date(job.created.seconds * 1000).toLocaleDateString('fi-FI')}</p>
                      ) : (
                        <p>{new Date().toLocaleDateString('fi-FI')}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="job-container-rightside">
              <div className="job-rating-and-buttons">
                <div className="job-rating">{loopStars().map((star) => star)}</div>
                <div className="job-buttons">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditjob(job);
                      setShowCreateJobModal(true);
                    }}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteJobclick(job.id)}>
                    Delete
                  </button>
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
