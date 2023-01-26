import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const defaultJob = {
  id: '',
  categories: [],
  cities: [],
  jobTitle: ''
};

export default function ChooseJob({ properties, setField }) {
  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState([defaultJob]);

  const _jobs = useSelector((state) => state.jobs.cards);

  useEffect(() => {
    if (_jobs) {
      const job_list = [];
      _jobs.forEach((job) => {
        if (!job_list.some(({ id }) => id === job.title)) {
          job_list.push({
            id: job.title,
            categories: [job.title],
            cities: [job.title],
            jobTitle: job.title
          });
        }
      });
      setJobs(job_list);
      if (job === '' && jobs.length > 0) {
        setJob(job_list[0].id);
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
