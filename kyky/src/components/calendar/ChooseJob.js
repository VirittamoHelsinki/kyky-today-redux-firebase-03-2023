import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const defaultJob = {
  id: '',
  categories: [],
  cities: [],
  jobTitle: ''
};

export default function ChooseJob({ properties, setField }) {
  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState([defaultJob]);

  const _titles = useSelector((state) => state.jobs.titles);

  useEffect(() => {
    if (_titles) {
      setJobs(_titles);
      if (job === '' && _titles.length > 0) {
        setJob(_titles[0].id);
      }
    }
  }, []);

  useEffect(() => {
    if (properties.jobId) {
      setField('jobId', properties.jobId);
    } else setField('jobId', jobs[0].id);
  }, [jobs]);

  return (
    <div className="choose-job container">
      <p>Choose a Job</p>
      <select
        className="select-basic"
        value={job}
        onChange={(e) => {
          setField('jobId', e.target.value);
          setJob(e.target.value);
        }}>
        {jobs.map((job, index) => {
          return (
            <option key={index} value={job.id}>
              {job.id}
            </option>
          );
        })}
      </select>
    </div>
  );
}

ChooseJob.propTypes = {
  properties: PropTypes.shape({
    jobId: PropTypes.string.isRequired
  }).isRequired,
  setField: PropTypes.func.isRequired
};
