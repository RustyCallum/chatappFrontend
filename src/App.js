
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import LogInPage from './Pages/LogInPage/LogInPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import MainPage from './Pages/MainPage/MainPage';

function App() {
  return (
    <div className="App">
		<Router>
	  		<Routes>
	  			<Route path='/' element={<WelcomePage />}/>
	  			<Route path='/LogIn' element={<LogInPage />}/>
				<Route path='/Register' element={<RegisterPage />}/>
				<Route path='/MainPage' element={<MainPage />}/>
	  		</Routes>
	  	</Router>
    </div>
  );
}

export default App;
