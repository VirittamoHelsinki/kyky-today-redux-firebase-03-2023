import Jobs from '../../jobs.json';

export default function ChooseJob({ setField }) {
  return (
    <div className="choose-job container">
      <p>Choose a Job</p>
      <select className="select-basic" onChange={(e) => setField('jobId', e.target.value)}>
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
