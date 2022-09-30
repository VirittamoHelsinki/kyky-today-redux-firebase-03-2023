import { useEffect, useState } from 'react';
import Jobs from '../../jobs.json';

export default function ChooseJob({ properties, setField }) {
  const [job, setJob] = useState(properties.jobId || Jobs[0].id);
  useEffect(() => {
    if (properties.jobId) {
      setField('jobId', properties.jobId);
    } else setField('jobId', Jobs[0].id);
  }, []);
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
        {Jobs.map((job) => {
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
