import React, { useState } from 'react';
import signpic from '../images/signup.gif';
import { NavLink, useHistory } from 'react-router-dom';
import phone from '../images/telephone.png';
import mail from '../images/email.png';
import address from '../images/address.png';

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: "", phone: "", address: ""
  });
  let name, value;
  const handleInputs = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  }

  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, password, cpassword, phone, address } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({ name, email, password, cpassword, phone, address })
    });
    const data = await res.json();

    if (data.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history.push("/login");
    }
  }

  return (
    <>
    
    
      <section className="vh-100 gradient-custom" style={{ backgroundColor: '#9A616D' }}>
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7" style={{ marginTop: '-40px',paddingBottom: '20px'}}>
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: "50px" }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Sign up</h3>
                  <form method="POST" id="register-form" onSubmit={PostData}>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="firstName" name="name" className="form-control form-control-lg"
                            value={user.name} onChange={handleInputs} placeholder="Your name here" />
                          <label className="form-label" htmlFor="firstName">First Name</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="lastName" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="lastName">Last Name</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="email" id="emailAddress" name="email" className="form-control form-control-lg"
                            value={user.email} onChange={handleInputs} placeholder="Your email ID here" />
                          <label className="form-label" htmlFor="emailAddress">Email</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="tel" id="phoneNumber" name="phone" className="form-control form-control-lg"
                            value={user.phone} onChange={handleInputs} placeholder="Your phone number here" />
                          <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="password" id="password" name="password" className="form-control form-control-lg"
                            value={user.password} onChange={handleInputs} placeholder="Enter your password" />
                          <label className="form-label" htmlFor="password">Password</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="password" id="cpassword" name="cpassword" className="form-control form-control-lg"
                            value={user.cpassword} onChange={handleInputs} placeholder="Re-enter your password" />
                          <label className="form-label" htmlFor="cpassword">Confirm Password</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="text" id="address" name="address" className="form-control form-control-lg"
                        value={user.address} onChange={handleInputs} placeholder="Your address" />
                      <label className="form-label" htmlFor="address">Address</label>
                    </div>

                    <div className="mt-4 pt-2">
                      <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup;
