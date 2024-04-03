import React, {useState} from "react";
import './LogInPage.css';
import { Navigate, useNavigate } from "react-router-dom";

function LogInPage(){

    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');

    const navigate = useNavigate();
  
    async function handleClick(){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({Username: username, Password: password})
      };
      await fetch('https://localhost:7094/api/User/Login', requestOptions)
      .then(response => {const guid = response.headers.get('X-CSRF-TOKEN');
        localStorage.setItem('X-CSRF-TOKEN', JSON.stringify(guid));
      });
      navigate("/MainPage");
    }
  
      return(
      <div className="App">
          <header className="App-header">
            <div className="box">
                <p className="Name">Log in</p>
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
                    >Log In</button>
                </form>
            </div>	
          </header>
      </div>
    );
  }
  
  export default LogInPage;