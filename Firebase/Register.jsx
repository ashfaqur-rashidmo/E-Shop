import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config'; 

const Register = ({ openLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up:", userCredential.user);
            // You can redirect or switch to login
        } catch (err) {
            console.error("Signup Error:", err.message);
            setError(err.message);
        }
    };

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
            <form onSubmit={handleSignup}>
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
                        placeholder='Create password'
                        className='w-full px-3 py-2 border'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Confirm Password</label>
                    <input
                        type="password"
                        placeholder='Confirm password'
                        className='w-full px-3 py-2 border'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
                <div className='mb-4'>
                    <button type='submit' className='w-full bg-green-600 text-white py-2'>Sign Up</button>
                </div>
            </form>
            <div className='text-center'>
                <span className='text-gray-700'>Already have an account?</span>
                <button className='text-green-800 ml-2' onClick={openLogin}>Login</button>
            </div>
        </div>
    );
};

export default Register;
