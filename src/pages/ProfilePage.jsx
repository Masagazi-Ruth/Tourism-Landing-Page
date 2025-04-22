import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import IMAGES from '../assets/images/image';
import { FaUserCircle, FaHome, FaSignOutAlt, FaEdit, FaCheck, FaTimes, FaCamera } from 'react-icons/fa';
import Header from '../components/shared/Header';

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });
  const [activeTab, setActiveTab] = useState('personal');

  // Moved useEffect to the top level of the component
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // This won't render since ProtectedRoute will redirect
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        ...user,
        ...formData,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
    });
    setIsEditing(false);
  };
  
  return (
    <>
      <Header />
      <div
        className="min-h-screen flex py-10 bg-cover bg-center relative pt-16"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(245, 166, 35, 0.2)), url(${IMAGES.Heros})`,
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4">
          <div className="w-full md:w-72 bg-white rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6">
            <div className="p-6 border-b border-orange-200">
              <div className="flex items-center justify-center flex-col">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4 border-2 border-orange-500 relative group">
                  <FaUserCircle className="w-16 h-16 text-orange-700" />
                  <div className="absolute inset-0 rounded-full bg-brown-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FaCamera className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-orange-700">{user.name}</h2>
                <p className="text-brown-600 mt-1">{user.username}</p>
                <span className="mt-2 px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-brown-700 mb-4 pl-2">Profile Menu</h3>
              <nav className="space-y-1">
                <NavLink
                  to="/profile"
                  end
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group ${
                      isActive
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-brown-700 hover:bg-orange-50 hover:text-orange-700'
                    }`
                  }
                >
                  <FaHome
                    className={({ isActive }) =>
                      `mr-3 ${isActive ? 'text-orange-700' : 'text-brown-500 group-hover:text-orange-700'}`
                    }
                  />
                  <span>Profile Home</span>
                </NavLink>

                <div className="pt-4 mt-4 border-t border-brown-200">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="flex items-center w-full px-4 py-3 text-brown-700 hover:bg-brown-50 hover:text-brown-900 rounded-lg transition-colors duration-200 group"
                  >
                    <FaSignOutAlt className="mr-3 text-brown-500 group-hover:text-brown-900" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <div>
                <div className="flex justify-between items-center border-b border-orange-200 pb-4 mb-6">
                  <h1 className="text-3xl font-bold text-brown-800">Profile Dashboard</h1>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center transition-colors duration-300 transform hover:scale-105"
                    >
                      <FaEdit className="mr-2" /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center transition-colors duration-300 transform hover:scale-105"
                      >
                        <FaCheck className="mr-2" /> Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-brown-500 hover:bg-brown-600 text-white rounded-md flex items-center transition-colors duration-300 transform hover:scale-105"
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-6 border-b border-brown-200">
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 font-medium transition-colors duration-300 ${
                        activeTab === 'personal'
                          ? 'border-b-2 border-orange-500 text-orange-700'
                          : 'text-brown-500 hover:text-orange-500'
                      }`}
                      onClick={() => setActiveTab('personal')}
                    >
                      Personal Information
                    </button>
                    <button
                      className={`px-4 py-2 font-medium transition-colors duration-300 ${
                        activeTab === 'security'
                          ? 'border-b-2 border-orange-500 text-orange-700'
                          : 'text-brown-500 hover:text-orange-500'
                      }`}
                      onClick={() => setActiveTab('security')}
                    >
                      Security Settings
                    </button>
                    <button
                      className={`px-4 py-2 font-medium transition-colors duration-300 ${
                        activeTab === 'notifications'
                          ? 'border-b-2 border-orange-500 text-orange-700'
                          : 'text-brown-500 hover:text-orange-500'
                      }`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      Notifications
                    </button>
                  </div>
                </div>

                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    {isEditing ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-brown-700">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-brown-700">
                              Username
                            </label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-brown-700">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-brown-700">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label htmlFor="bio" className="block text-sm font-medium text-brown-700">
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              name="bio"
                              rows="4"
                              value={formData.bio}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-white rounded-lg p-6 border border-orange-200">
                        <h2 className="text-xl font-semibold text-orange-800 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p className="text-sm text-brown-500">Full Name</p>
                            <p className="text-lg font-medium text-brown-800">{user.name}</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p className="text-sm text-brown-500">Username</p>
                            <p className="text-lg font-medium text-brown-800">{user.username}</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p className="text-sm text-brown-500">Email Address</p>
                            <p className="text-lg font-medium text-brown-800">{user.email || 'Not provided'}</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p className="text-sm text-brown-500">Phone Number</p>
                            <p className="text-lg font-medium text-brown-800">{user.phone || 'Not provided'}</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2">
                            <p className="text-sm text-brown-500">Bio</p>
                            <p className="text-base text-brown-800">{user.bio || 'No bio information provided yet.'}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-white rounded-lg p-6 border border-brown-200">
                      <h2 className="text-xl font-semibold text-brown-700 mb-4">Account Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <p className="text-sm text-brown-500">Role</p>
                          <p className="text-lg font-medium text-brown-800">
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                              {user.role}
                            </span>
                          </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <p className="text-sm text-brown-500">Account Status</p>
                          <p className="text-lg font-medium text-brown-800">
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                              Active
                            </span>
                          </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <p className="text-sm text-brown-500">Member Since</p>
                          <p className="text-lg font-medium text-brown-800">
                            {user.joinDate }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-orange-200">
                      <h2 className="text-xl font-semibold text-orange-800 mb-4">Password Management</h2>
                      <div className="space-y-4">
                        <div className="bg-orange-50 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <h3 className="font-medium text-brown-800 mb-4">Change Password</h3>
                          <form className="space-y-4">
                            <div>
                              <label htmlFor="currentPassword" className="block text-sm font-medium text-brown-700 mb-1">
                                Current Password
                              </label>
                              <input
                                type="password"
                                id="currentPassword"
                                className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                                placeholder="Enter your current password"
                              />
                            </div>
                            <div>
                              <label htmlFor="newPassword" className="block text-sm font-medium text-brown-700 mb-1">
                                New Password
                              </label>
                              <input
                                type="password"
                                id="newPassword"
                                className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                                placeholder="Enter new password"
                              />
                            </div>
                            <div>
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-brown-700 mb-1">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                id="confirmPassword"
                                className="w-full p-2 border border-brown-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                                placeholder="Confirm new password"
                              />
                            </div>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105"
                            >
                              Update Password
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-brown-200">
                      <h2 className="text-xl font-semibold text-brown-700 mb-4">Two-Factor Authentication</h2>
                      <div className="bg-orange-50 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-brown-800">Enable Two-Factor Authentication</h3>
                            <p className="text-brown-500 text-sm mt-1">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-brown-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-brown-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-brown-200">
                      <h2 className="text-xl font-semibold text-brown-700 mb-4">Account Verification</h2>
                      <div className="bg-orange-50 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <FaCheck className="text-orange-500" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-brown-800">Email Verification</h3>
                            <p className="text-brown-500 text-sm mt-1">Your email has been verified</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-orange-200">
                      <h2 className="text-xl font-semibold text-orange-800 mb-4">Notification Preferences</h2>
                      <div className="space-y-4">
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-brown-800">Email Notifications</h3>
                              <p className="text-brown-500 text-sm mt-1">Receive updates about events and activities</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-brown-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-brown-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-brown-800">SMS Notifications</h3>
                              <p className="text-brown-500 text-sm mt-1">Receive text messages for important updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 bg-brown-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-brown-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-brown-800">Marketing Communications</h3>
                              <p className="text-brown-500 text-sm mt-1">Receive promotional offers and updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-brown-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-brown-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-brown-200">
                      <h2 className="text-xl font-semibold text-brown-700 mb-4">Event Notifications</h2>
                      <div className="space-y-4">
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-brown-800">New Events</h3>
                              <p className="text-brown-500 text-sm mt-1">Be notified when new events are added</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-brown-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-brown-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-brown-800">Event Reminders</h3>
                              <p className="text-brown-500 text-sm mt-1">Receive reminders before your upcoming events</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-brown-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-brown-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-brown-800">Team Updates</h3>
                              <p className="text-brown-500 text-sm mt-1">Be notified about team news and changes</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 bg-brown-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-brown-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;