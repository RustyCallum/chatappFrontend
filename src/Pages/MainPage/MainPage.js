import React, {useState, useEffect} from 'react';
import './MainPage.css';
import { Navigate, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

function MainPage() {

	const [messageBody, setMessageBody]= useState('');
	const [contacts, setContacts] = useState([]);
	const [recipent, setRecipent] = useState(0);
	const [searchedPerson, setSearchedPerson] = useState('');
	const [returnedPeople, setReturnedPeople] = useState([]);
	
	const navigate = useNavigate();

	const getRecipent = (id) => {
		setRecipent(id);
	}

	function handleLogOut() {
		localStorage.clear();
		navigate("/");
	}

	function handleAddContact(ppl) {
		const addContactRequestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json' },
			credentials: 'include',
			body:JSON.stringify({LoggedUserId: localStorage.getItem('Id'), secondaryUserId: ppl.id, Guid: JSON.parse(localStorage.getItem('X-CSRF-TOKEN'))})
		}
		fetch(`https://localhost:7094/api/User/ContactList`, addContactRequestOptions)
		.then(response => response.json())
		.then(data => contacts.concat({ppl}))
	}

	function onEnterSearch(e){
		if(e.key === 'Enter'){
			searchForPeople();
		}
	}

	function searchForPeople(){
		const peopleSearchRequestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json' },
			credentials: 'include',
			body:JSON.stringify({Username: searchedPerson, Guid: JSON.parse(localStorage.getItem('X-CSRF-TOKEN'))}) 
		}
		fetch(`https://localhost:7094/api/User/ContactList/Name`, peopleSearchRequestOptions)
		.then(response => response.json())
		.then(data => setReturnedPeople(data));
		}

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
			<div className='Grid-Container'>
				<div className='Page-Header'> 
					<div className='Page-Header-Left-Panel'>
						<p className='Page-Header-Left-Panel-Buttons'>Hi, {localStorage.getItem('Username')}</p>
					</div>
					<div className='Page-Header-Right-Panel'>
						<Popup
							trigger={<p className='Page-Header-Right-Panel-Buttons'>Add contact</p>}
							modal
							nested
							>
								{close => (
								<div className='modal'>
									<p className='Text-Add-Contact'>Add Contact</p>
									{returnedPeople.map(returnedPeople => 
										<div className='Searched-People-Inside'>
											<button className='Contact-Inside-Button' onClick={() => handleAddContact(returnedPeople)}>
												<p className='Contact-Inside-Button-Text'>{returnedPeople.id}, {returnedPeople.name}</p>
											</button>
										</div>
									)}
									<input
									className='searchContact-Input'
									value={searchedPerson}
									onKeyUp={onEnterSearch}
									onChange={(text)=> setSearchedPerson(text.target.value)} />
								</div>
							)}
							</Popup>

						<p className='Page-Header-Right-Panel-Buttons' onClick={() => handleLogOut()}>Log out</p>
					</div>
				</div>
				<div className='Contact-List'>
					<div className='Contact-Name'>
						<p className="Name">Contacts</p>
					</div>
					{contacts.map(contact => 
						<div className='Contact-Inside'>
							<button className='Contact-Inside-Button' onClick={() => setRecipent(contact.id)}>
								<p className='Contact-Inside-Button-Text'>{contact.id}, {contact.name}</p>
							</button>
						</div>
					)}
				</div>

				<div className='Message-Box'>

					<p>{recipent}</p>

					<input
					type="text"
					htmlFor="messageBody"
					name="messageBody"
					className="Message-Input"
					placeholder="Message..."
					value={messageBody}
					onChange={(text)=> setMessageBody(text.target.value)} />

					<button onClick={handleMessageSend} className="btn" ><img src={require("../MainPage/SendImage.png")} style= {{width:"100%" }}/> </button>
				</div>
			</div>
		</header>
	);
}

export default MainPage;
