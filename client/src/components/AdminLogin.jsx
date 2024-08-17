import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const getAccess = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin") {
      window.alert("Login Successful");
      history.push("/aAbBcC");
    } else if (email === "admin.edu@gmail.com" && password === "education") {
      window.alert("Login Successful");
      history.push("/education");
    } else if (email === "admin.health@gmail.com" && password === "health") {
      window.alert("Login Successful");
      history.push("/health");
    } else if (email === "admin.service@gmail.com" && password === "service") {
      window.alert("Login Successful");
      history.push("/service");
    } else {
      window.alert("You don't have this access");
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
                  <img
                    src="https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg"
                    alt="admin login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem', marginTop: '50px', marginLeft: '30px' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={getAccess}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cogs fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Admin Login</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign in to your admin account</h5>

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
                          type="submit"
                        >
                          Login
                        </button>
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

export default AdminLogin;
