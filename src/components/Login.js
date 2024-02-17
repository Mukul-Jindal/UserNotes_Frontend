import React, { useContext, useState } from 'react'
import userContext from '../context/user/userContext'
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  props.setStatus("Login");
  localStorage.removeItem('token');
  const { loginUser } = useContext(userContext);
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credential).then((response) => {
      props.setStatus("Logout");
      navigate("/");
    }).catch((err) => {
      alert(err.error)
    });
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
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" onChange={handleChange} id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
