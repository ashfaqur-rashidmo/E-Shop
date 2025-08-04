import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ openSignUp, setIsModelOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      setIsModelOpen(false); 
      navigate('/');
    }
  }, [user, loading, navigate, setIsModelOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };


    return (
        
        <div>
            {!loading && (
                <>
                    <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Email</label>
                            <input
                                type="email"
                                className='w-full px-3 py-2 border'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Password</label>
                            <input
                                type="password"
                                placeholder='Enter password'
                                className='w-full px-3 py-2 border'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
                        <div className='mb-4 flex items-center justify-between'>
                            <label className='inline-flex items-center'>
                                <input type="checkbox" className='form-checkbox' />
                                <span className='ml-2 text-gray-700'>Remember Me</span>
                            </label>
                            <a href="#" className='text-red-800'>Forgot Password?</a>
                        </div>
                        <div className='mb-4'>
                            <button type='submit' className='w-full bg-red-600 text-white py-2'>Login</button>
                        </div>
                    </form>
                    <div className='text-center'>
                        <span className='text-gray-700'>Don't Have an Account?</span>
                        <button className='text-red-800 ml-2' onClick={openSignUp}>Sign Up</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
