import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoToLogin() {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/login');
    };

    const handleClickHome = () => {
        navigate('/home/:email');
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-5">Oops! You're Not Logged In</h3>
                            <div className="d-grid gap-2">
                                <p className='text-center'>
                                <button className="btn btn-primary w-50 mb-3" onClick={handleClickLogin} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>Login</button><br></br>
                                <button className="btn btn-secondary w-50" onClick={handleClickHome} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>Home</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoToLogin;
