import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Settings = () => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('settings');
  }, []);

  return <div></div>;
};

export default Settings;
