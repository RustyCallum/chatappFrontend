import React, {useState, useEffect} from 'react';
import './MainPage.css';

function MainPage() {

	const [messageBody, setMessageBody]= useState('');
	const [contacts, setContacts] = useState([]);

	function getContacts() {
		const messageRequestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json' },
			credentials: 'include',
		}
		fetch(`https://localhost:7094/api/User/ContactList/${localStorage.getItem("Id")}`, messageRequestOptions)
		.then(response => response.json())
		.then(data => setContacts(data));
	}

	function handleMessageSend(){
		const requestOptions = {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json' },
		  credentials: 'include',
		  body: JSON.stringify({recieverId: 0, messageBody: messageBody, Guid: JSON.parse(localStorage.getItem('X-CSRF-TOKEN'))})
		};
		fetch('https://localhost:7094/api/Message', requestOptions);
	}

	useEffect(() => {getContacts()}, []);

	return (
		<header className="App-header">
			<div className='Contact-List'>
				<div className='Contact-Name'>
					<p className="Name">Contacts</p>
				</div>
				{contacts.map(contact => 
					<div className='Contact-Inside'>
						<button className='Contact-Inside-Button'>
						<p className='Contact-Inside-Button-Text'>{contact.id}, {contact.name}</p>
						</button>
					</div>
				)}
			</div>

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
