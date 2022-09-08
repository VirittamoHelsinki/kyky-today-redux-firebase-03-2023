/* This is the main page itself, all sub routes are rendered as the outlet */
import { Outlet } from 'react-router-dom';

export default function Creation() {
  return (
    <div className="profile-creation">
      <Outlet />
    </div>
  );
}
