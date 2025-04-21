import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/team-analysis', label: 'Team Analysis' },
    { to: '/employee-deep-dive', label: 'Employee Deep Dive' },
    { to: '/bias-reports', label: 'Bias Reports' },
    { to: '/upload-reviews', label: 'Upload Reviews' },
    { to: '/employee', label: 'add new employee' },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Bias Detection</h2>
      <nav className="flex flex-col space-y-4">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-lg ${location.pathname === link.to ? 'font-bold text-blue-600' : 'text-gray-700'}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
