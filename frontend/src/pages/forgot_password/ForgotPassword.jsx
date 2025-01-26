import React, { useState } from 'react';
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import './ForgotPassword.css';  // Import the CSS file

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();

    forgotPasswordApi({ phone }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsSent(true);
      }
    }).catch((error) => {
      if (error.response.status === 400 || 500) {
        toast.error(error.response.data.message);
      }
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    const data = {
      phone,
      otp,
      newPassword
    };

    verifyOtpApi(data).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    }).catch((error) => {
      if (error.response.status === 400 || 500) {
        toast.error(error.response.data.message);
      }
    });
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h3>Forgot Password</h3>
        <form className="forgot-password-form">
          <span className="phone-input">
            <h4>+977</h4>
            <input
              disabled={isSent}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Enter valid phone number"
            />
          </span>
          <button
            disabled={isSent}
            onClick={handleSendOtp}
            className="btn btn-dark mt-2 w-100"
          >
            Send OTP
          </button>
          {isSent && (
            <>
              <hr />
              <p>OTP has been sent to {phone} ✅</p>
              <input
                className="form-control"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter valid OTP code"
              />
              <input
                className="form-control mt-2"
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                placeholder="Set new password"
              />
              <button
                onClick={handleVerifyOtp}
                className="btn black-btn w-100 mt-2"
              >
                Verify OTP and Set Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
