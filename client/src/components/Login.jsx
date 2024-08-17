import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      history.push("/");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://www.eduscation.com/assets/images/online-courses.jpg"
                    alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem',marginTop: '120px',marginLeft:'30px' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form method="POST" onSubmit={loginUser}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Login</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input 
                          type="email" 
                          id="form2Example17" 
                          className="form-control form-control-lg" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email ID here" 
                        />
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input 
                          type="password" 
                          id="form2Example27" 
                          className="form-control form-control-lg" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password" 
                        />
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button 
                          data-mdb-button-init 
                          data-mdb-ripple-init 
                          className="btn btn-dark btn-lg btn-block" 
                          type="submit">
                          Login
                        </button>
                      </div>

                      <div className="d-flex justify-content-between">
                        <NavLink to="/signup" className="login-image-link">CREATE NEW ACCOUNT</NavLink>
                        <NavLink to="/AdminLogin" className="login-image-link">LOGIN AS ADMIN</NavLink>
                      </div>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
