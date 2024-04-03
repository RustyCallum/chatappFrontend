import './WelcomePage.css';
import React from "react";
import {Navigate, useNavigate} from "react-router-dom";

function WelcomePage(){
	const navigate = useNavigate();
	const [goToRegister, setGoToRegister] = React.useState(false);

	if (goToRegister){
		return <Navigate to="/Register" />;
	}

	function goToLogin()
	{
		navigate("/LogIn");
	}

	return (
	<div className="App">
      <header className="App-header">
	  	<div className='TitleContainer'>
	  		<p className='Title'>ChatSphere</p>
	  	</div>
        <div className='ButtonContainer'>
	  		<button onClick={() => {setGoToRegister(true)}} className='WelcomeScreenButton'>Register</button>
	  		<button onClick={goToLogin} className='WelcomeScreenButton'>Log In</button>
		</div>
      </header>
    </div>
  );
}

export default WelcomePage;
