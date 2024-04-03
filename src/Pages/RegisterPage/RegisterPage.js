import React, {useState} from "react";
import './RegisterPage.css';
import { Navigate, useNavigate } from "react-router-dom";


function RegisterPage(){

  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');

  const navigate = useNavigate();

  function handleClick(){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({Username: username, Password: password})
    };
    fetch('https://localhost:7094/api/User/Register', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
    navigate("/LogIn");
  }

	return(
	<div className="App">
		<header className="App-header">
			<div className="box">
			<p className="Name">Register</p>
      <form>
          <div className="input-group">
            <label className="FormName" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(text)=> setUsername(text.target.value)} />
          </div>

          <div className="input-group">
            <label className="FormName" htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email"/>
          </div>

          <div className="input-group">
            <label className="FormName" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(text)=> setPassword(text.target.value)} />
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={handleClick}
            >Register</button>
            </form>
        </div>	
      
		</header>
	</div>
  );
}

export default RegisterPage;
