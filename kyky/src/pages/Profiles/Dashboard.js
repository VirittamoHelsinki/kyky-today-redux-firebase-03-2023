import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('dashboard');
  }, []);

  return <div></div>;
};

export default Dashboard;
