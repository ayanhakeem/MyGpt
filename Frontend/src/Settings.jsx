import React, { useState, useContext } from 'react';
import { MyContext } from './MyContext';
import './Settings.css';

const Settings = ({ onClose }) => {
    const { user, setUser, token } = useContext(MyContext);
    const [username, setUsername] = useState(user || '');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/auth/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, newPassword })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Update failed');

            if (username) {
                setUser(username);
                localStorage.setItem('username', username);
            }
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setNewPassword(''); // Clear password field after success
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-modal" onClick={e => e.stopPropagation()}>
                <div className="settings-header">
                    <h2>Account Settings</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <form className="settings-form" onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Update Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="New username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Change Password</label>
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="New password (leave blank to keep current)"
                        />
                    </div>

                    {message.text && (
                        <div className={`settings-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <button type="submit" className="settings-submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
