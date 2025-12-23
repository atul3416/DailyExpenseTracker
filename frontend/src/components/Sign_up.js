import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Sign_up = () => {
  return (
    <div className='container mt-5'>
        <div className='text-center mb-3'>
          <h2><i className='fas fa-user-plus '></i> SignUp</h2>
          <p className='text-muted'>Create your account to start tracking expenses</p>

        </div>
        <form className='p-4  rounded shadow mx-auto' style={{maxWidth: '400px'}}>
            <div className='mb-3'>
                <label className='form-label'>Full Name</label>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-user'></i>
                    </span>
                    <input type='text' className='form-control' placeholder='Enter Your Full Name' required name='FullName'/>
                </div>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-envelope'></i>
                    </span>
                    <input type='email' className='form-control' placeholder='Enter Your mail' required name='Email'/>
                </div>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-lock'></i>
                    </span>
                    <input type='password' className='form-control' placeholder='Enter password' required name='password'/>
                </div>
            </div>

            <button type='submit' className='btn btn-primary w-100 mt-3'><i className='fas fa-user-plus me-2'></i> Signup</button>
        </form>
        
        <ToastContainer/>
    </div>
  )
}

export default Sign_up
