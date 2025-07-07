import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your dashboard preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Theme</h3>
                <p className="text-gray-600">Choose your preferred theme</p>
              </div>
              <button
                onClick={toggleTheme}
                aria-pressed={theme === 'dark'}
                aria-label="Toggle theme"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Notifications
                  </h3>
                  <p className="text-gray-600">
                    Receive alerts about your utility usage
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  aria-pressed={notifications}
                  aria-label="Toggle notifications"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
