import React, { useState } from 'react';
import { useLoginMutation, useVerifyOtpMutation } from '../redux/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');


  const [login, { isLoading: sendingOtp, error }] = useLoginMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await login(email).unwrap();
      console.log("OTP Sent Successfully:", res);
      setOtpSent(true);
      toast.success('OTP Sent');
    } catch (err) {
      console.error("Failed to send OTP:", err);
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      console.log("OTP Verified:", res);
      localStorage.setItem('token', res.token);
      toast.success("Logged in successfully!");
      navigate('/')
    } catch (err) {
      console.error("OTP Verification failed:", err);
      toast.error("Invalid OTP. Try again.");
    }
  };

  return (
    <div className='flex justify-center gap-12 h-[100vh] items-center'>
      <div className='min-w-[30vw]'>
        <img className='rounded-xl' src='./loginImage.png' alt="Login Visual" />
      </div>

      <div className='min-w-[30vw] flex flex-col gap-6'>
        <p className='font-bold text-3xl text-center'>Admin Login</p>

        <div className='flex flex-col'>
          <label>Email</label>
          <input
            className='border p-2 rounded-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Enter your email'
          />
        </div>

        <button
          className={`border w-full py-3 bg-black text-white rounded-full transition-opacity duration-300 ${(!email || sendingOtp) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSendOtp}
          disabled={!email || sendingOtp}
        >
          {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
        </button>

        {otpSent && (
          <>
            <div className='flex flex-col'>
              <label>OTP</label>
              <input
                className='border p-2 rounded-full'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type='text'
                placeholder='Enter OTP'
              />
            </div>

            <button
              className={`border w-full py-3 bg-black text-white rounded-full transition-opacity duration-300 ${(!otp || verifying) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleVerifyOtp}
              disabled={!otp || verifying}
            >
              {verifying ? 'Verifying...' : 'Login'}
            </button>
          </>
        )}

        {error && (
          <p className="text-red-500 text-center">Failed to send OTP. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
