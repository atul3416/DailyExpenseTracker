import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, []);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }
        try {
            const response = await fetch(`http://dailyexpense-django.onrender.com/api/change_password/${userId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({oldPassword : formData.oldPassword, newPassword: formData.newPassword})
            });
            const data = await response.json();
            if (response.status === 200) {
                toast.success(data.message);
                setFormData({oldPassword: '', newPassword: '', confirmPassword: '' })
                localStorage.removeItem('userId');
                navigate('/login');
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Try again.')
        }
    };
    return (
        <div className='container mt-5'>
            <div className='text-center mb-3'>
                <h2><i className='fas fa-key '></i> Change Password</h2>
                <p className='text-muted'>Secure your account with a new password </p>

            </div>
            <form className='p-4  rounded shadow mx-auto' style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Old Password</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-lock'></i>
                        </span>
                        <input type='password' className='form-control' placeholder='Enter your old password' value={formData.oldPassword} onChange={handleChange} required name='oldPassword' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>New Password</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-lock-open'></i>
                        </span>
                        <input type='password' className='form-control' placeholder='Enter new password' value={formData.newPassword} onChange={handleChange} required name='newPassword' />
                    </div>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Confirm New Password</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-lock-open'></i>
                        </span>
                        <input type='password' className='form-control' placeholder='Confirm new password' value={formData.confirmPassword} onChange={handleChange} required name='confirmPassword' />
                    </div>
                </div>

                <button type='submit' className='btn btn-primary w-100 mt-3'><i className='fas fa-key me-2'></i> Save</button>
            </form>

            <ToastContainer />
        </div>
    )
}

export default ChangePassword
