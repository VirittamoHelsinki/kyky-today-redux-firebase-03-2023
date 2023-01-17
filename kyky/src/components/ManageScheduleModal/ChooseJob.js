import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const defaultJob = {
  id: '',
  categories: [],
  cities: [],
  jobTitle: ''
};

export default function ChooseJob({ setField }) {
  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState([defaultJob]);

  const user = useSelector((state) => state.user.user);
  const _jobs = useSelector((state) => state.jobs.cards);

  useEffect(() => {
    if (_jobs) {
      const job_list = [];
      _jobs.forEach((job) => {
        if (!job_list.some(({ id }) => id === job.subCategory)) {
          job_list.push({
            id: job.subCategory,
            categories: [job.subCategory],
            cities: [job.place],
            jobTitle: job.subCategory
          });
        }
      });
      setJobs(job_list);
      if (job === '' && jobs.length > 0) {
        setJob(jobs[0]);
      }
      console.log(job_list);
    }
  }, [_jobs]);

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
        {jobs.map((job) => {
          return (
            <option key={job.id} value={job.id}>
              {job.id}
            </option>
          );
        })}
      </select>
    </div>
  );
}
