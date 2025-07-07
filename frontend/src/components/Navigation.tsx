import { Link, useLocation } from 'react-router-dom';
import { classNames } from '../utils';

const Navigation = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    {
      name: 'Dashboard',
      href: '/dashboard',
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Settings',
      href: '/settings',
      current: location.pathname === '/settings',
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Utility Dashboard
            </Link>
          </div>

          <div className="flex space-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
