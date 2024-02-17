import React, { useContext, useState } from 'react'
import userContext from '../context/user/userContext';
import { useNavigate } from "react-router-dom";
export default function SignUp(props) {
  const [credential, setCredential] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const { signUp } = useContext(userContext);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credential.password !== credential.confirmPassword) {
      alert("Password mismatch");
    }
    else {
      signUp(credential)
        .then((data) => {
          props.setStatus("Logout");
          navigate('/');
        })
        .catch((err) => {
          alert(err.error);
        })
    }
  }

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={handleChange} aria-describedby="emailHelp" minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name='email' id="email" onChange={handleChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={handleChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='confirmPassword' id="confirmPassword" onChange={handleChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
