import React, {useState} from 'react';
import './MainPage.css';

function MainPage() {

	const [messageBody, setMessageBody]= useState('');

	function handleMessageSend(){
		const requestOptions = {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json' },
		  credentials: 'include',
		  body: JSON.stringify({recieverId: 0, messageBody: messageBody, Guid: JSON.parse(localStorage.getItem('X-CSRF-TOKEN'))})
		};
		fetch('https://localhost:7094/api/Message', requestOptions);
	  }	

		return (
			<header className="App-header">
				<div className='Message-Box'>
					<input
					type="text"
					htmlFor="messageBody"
					name="messageBody"
					className="message-input"
					placeholder="Message..."
					value={messageBody}
					onChange={(text)=> setMessageBody(text.target.value)} />

					<button onClick={handleMessageSend} className="btn" ><img src={require("../MainPage/SendImage.png")} style= {{width:"200%" }}/> </button>
				</div>
		  </header>
		);
}

export default MainPage;
