// import React, { useState, useRef, useEffect } from 'react';
// import { useLoginMutation, useVerifyOtpMutation } from '../redux/authApi';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const OTP_LENGTH = 6;
// const RESEND_OTP_TIME = 30; // seconds

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
//   const [timer, setTimer] = useState(RESEND_OTP_TIME);

//   const [login, { isLoading: sendingOtp, error }] = useLoginMutation();
//   const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
//   const navigate = useNavigate();

//   const otpInputs = useRef([]);

//   // Handle resend OTP timer
//   useEffect(() => {
//     let interval;
//     if (otpSent && timer > 0) {
//       interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpSent, timer]);

//   const handleSendOtp = async () => {
//     try {
//       await login(email).unwrap();
//       setOtpSent(true);
//       setTimer(RESEND_OTP_TIME);
//       setOtp(Array(OTP_LENGTH).fill(''));
//       toast.success('OTP Sent');
//     } catch (err) {
//       toast.error('Failed to send OTP');
//     }
//   };

//   const handleResendOtp = async () => {
//     if (timer > 0) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const otpValue = otp.join('');
//       const res = await verifyOtp({ email, otp: otpValue }).unwrap();
//       localStorage.setItem('token', res.token);
//       toast.success('Logged in successfully!');
//       navigate('/');
//     } catch (err) {
//       toast.error('Invalid OTP. Try again.');
//     }
//   };

//   const handleOtpChange = (e, idx) => {
//     const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
//     let newOtp = [...otp];
//     newOtp[idx] = value;
//     setOtp(newOtp);

//     // Move focus
//     if (value && idx < OTP_LENGTH - 1) {
//       otpInputs.current[idx + 1]?.focus();
//     }
//     if (!value && idx > 0) {
//       otpInputs.current[idx - 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (e, idx) => {
//     if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
//       otpInputs.current[idx - 1]?.focus();
//     }
//   };

//   return (
//     <div className=" flex items-center justify-center bg-[#f7f8fa] h-[100vh] p-8">
//       <div className="flex  bg-white rounded-2xl shadow-lg overflow-hidden w-10/12 max-w-full">
//         {/* Left Image */}
//         <div className="w-1/2 bg-[#222] flex items-center justify-center p-0">
//           <img
//             className=" w-full rounded-l-2xl"
//             src="./loginImage.png"
//             alt="Login Visual"
//           />
//         </div>

//         {/* Right Form */}
//         <div className="w-1/2 p-6 flex flex-col justify-left">
//           <div className='flex justify-left mb-4 w-[100%]'><img className='h-[150px] w-[150px]  rounded-lg' src="./luxivo.png"/></div>
//           <h2 className="text-3xl font-bold text-[#222] mb-2">Admin Login</h2>
//           <p className="text-gray-500 mb-8">Welcome back! Please enter your details.</p>

//           {/* Email Input */}
//           <div className="mb-5">
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                 <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//                   <path
//                     d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm1.75-.25 8.25 6.25 8.25-6.25"
//                     stroke="#888"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </span>
//               <input
//                 className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#6c47ff] text-gray-800"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 placeholder="Enter your email"
//                 disabled={otpSent}
//                 autoFocus
//               />
//             </div>
//           </div>

//           {/* Send OTP Button */}
//           {!otpSent && (
//             <button
//               className="w-full py-3 rounded-md bg-[#6c47ff] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#4b2fd6] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={handleSendOtp}
//               disabled={!email || sendingOtp}
//             >
//               {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
//             </button>
//           )}

//           {/* OTP Section */}
//           {otpSent && (
//             <>
//               <div className="mb-5 mt-6">
//                 <label className="block text-sm font-medium mb-2">Enter OTP</label>
//                 <div className="flex gap-3">
//                   {otp.map((digit, idx) => (
//                     <input
//                       key={idx}
//                       ref={(el) => (otpInputs.current[idx] = el)}
//                       type="text"
//                       value={digit}
//                       onChange={(e) => handleOtpChange(e, idx)}
//                       onKeyDown={(e) => handleOtpKeyDown(e, idx)}
//                       className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#6c47ff]"
//                       maxLength={1}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Verify OTP Button */}
//               <button
//                 className="w-full py-3 rounded-md bg-[#6c47ff] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#4b2fd6] disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleVerifyOtp}
//                 disabled={otp.join('').length < OTP_LENGTH || verifying}
//               >
//                 {verifying ? 'Verifying...' : 'Login'}
//               </button>

//               {/* Resend OTP */}
//               <div className="mt-4 text-center">
//                 {timer > 0 ? (
//                   <p className="text-gray-500 text-sm">
//                     Resend OTP in <span className="font-semibold">{timer}s</span>
//                   </p>
//                 ) : (
//                   <button
//                     onClick={handleResendOtp}
//                     className="text-[#6c47ff] text-sm font-medium hover:underline"
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </div>
//             </>
//           )}

//           {/* Error */}
//           {error && (
//             <p className="text-red-500 text-center mt-4">
//               Failed to send OTP. Please try again.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState, useRef, useEffect } from 'react';
import { useLoginMutation, useVerifyOtpMutation } from '../redux/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OTP_LENGTH = 6;
const RESEND_OTP_TIME = 30; // seconds

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_OTP_TIME);

  const [login, { isLoading: sendingOtp, error }] = useLoginMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
  const navigate = useNavigate();

  const otpInputs = useRef([]);

  // Handle resend OTP timer
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    try {
      await login(email).unwrap();
      setOtpSent(true);
      setTimer(RESEND_OTP_TIME);
      setOtp(Array(OTP_LENGTH).fill(''));
      toast.success('OTP Sent');
    } catch (err) {
      toast.error('Failed to send OTP');
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    await handleSendOtp();
  };

  const handleVerifyOtp = async () => {
    try {
      const otpValue = otp.join('');
      const res = await verifyOtp({ email, otp: otpValue }).unwrap();
      localStorage.setItem('token', res.token);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Invalid OTP. Try again.');
    }
  };

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    let newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Move focus
    if (value && idx < OTP_LENGTH - 1) {
      otpInputs.current[idx + 1]?.focus();
    }
    if (!value && idx > 0) {
      otpInputs.current[idx - 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpInputs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl min-h-[600px]">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-0 min-h-[300px] lg:min-h-auto">
          <img
            className="w-full h-full object-cover lg:rounded-l-2xl"
            src="./loginImage.png"
            alt="Login Visual"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-8">
            <img 
              className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 rounded-lg object-contain" 
              src="./luxivo.png"
              alt="Luxivo Logo"
            />
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Admin Login
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Email Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm1.75-.25 8.25 6.25 8.25-6.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="w-full border-2 border-gray-200 rounded-xl py-3 sm:py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email address"
                  disabled={otpSent}
                  autoFocus
                />
              </div>
            </div>

            {/* Send OTP Button */}
            {!otpSent && (
              <button
                className="w-full py-3 sm:py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 shadow-lg hover:shadow-xl"
                onClick={handleSendOtp}
                disabled={!email || sendingOtp}
              >
                {sendingOtp ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
            )}

            {/* OTP Section */}
            {otpSent && (
              <div className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Enter Verification Code
                  </label>
                  <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputs.current[idx] = el)}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center border-2 border-gray-200 rounded-xl text-lg sm:text-xl font-semibold text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        maxLength={1}
                        inputMode="numeric"
                      />
                    ))}
                  </div>
                </div>

                {/* Verify OTP Button */}
                <button
                  className="w-full py-3 sm:py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 shadow-lg hover:shadow-xl"
                  onClick={handleVerifyOtp}
                  disabled={otp.join('').length < OTP_LENGTH || verifying}
                >
                  {verifying ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Login'
                  )}
                </button>

                {/* Resend OTP */}
                <div className="text-center lg:text-left">
                  {timer > 0 ? (
                    <p className="text-gray-500 text-sm">
                      Didn't receive the code?{' '}
                      <span className="font-semibold text-indigo-600">
                        Resend in {timer}s
                      </span>
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Didn't receive the code?{' '}
                      <button
                        onClick={handleResendOtp}
                        className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors duration-200 focus:outline-none focus:underline"
                      >
                        Resend OTP
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <p className="text-red-700 text-sm font-medium">
                  Failed to send OTP. Please check your email and try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage