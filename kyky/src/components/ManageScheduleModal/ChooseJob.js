import Jobs from '../../jobs.json';

export default function ChooseJob() {
  return (
    <div className="choose-job">
      <p>Choose a Job</p>
      <select className="select-basic">
        {Jobs.map((job) => {
          return <option value={job.id}>{job.id}</option>;
        })}
      </select>
    </div>
  );
}
