import React, { useState, useContext } from 'react';
import { MyContext } from './MyContext';
import TubesBackground from './TubesBackground';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setToken, setUser } = useContext(MyContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            setToken(data.token);
            setUser(data.username);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <TubesBackground>
                <div className="auth-container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <div className="auth-logo">M</div>
                            <h1>{isLogin ? 'Welcome Back' : 'Join MyGPT'}</h1>
                            <p>{isLogin ? 'Sign in to continue your journey' : 'Start your next-gen experience today'}</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="form-group">
                                    <label>Username</label>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        placeholder="Enter your username" 
                                        required 
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your email" 
                                    required 
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    required 
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {error && <div className="auth-error">{error}</div>}

                            <button type="submit" className="auth-submit" disabled={loading}>
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <span onClick={() => setIsLogin(!isLogin)}>
                                    {isLogin ? 'Sign up' : 'Log in'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </TubesBackground>
        </div>
    );
};

export default Auth;
