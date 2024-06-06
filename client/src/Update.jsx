import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from './UserReducer';



function Update() {
    //il nome della variabile deve essere uguale al nome del parametro indicato in App.jsx nella route
    const { userId } = useParams(); 
    // console.log(userId)
    const users = useSelector((state) => state.users);
    const utenteEsistente = users.filter(u => u.id == userId);
    const {name, email} = utenteEsistente[0];

    const [uname, setName] = useState(name);
    const [uemail, setEmail] = useState(email);

    const dispatch = useDispatch();
    const naviga = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateUser({
            id: userId,
            name: uname,
            email: uemail
        }));

        naviga('/');
    }

  
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <h2>Modifica l'utente {name}</h2>  
                    <p id="messUserOk" className="nascosto text-success">utente inserito</p>
                    <label htmlFor="name">Nome</label>
                    <input type="text" className="form-control" name="name" value={uname} onChange={e => setName(e.target.value)} placeholder="insersci il nuovo nome"/>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="email">Indirizzo Email</label>
                    <input type="email" className="form-control" name="email" value={uemail} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="inserisci o conferma l'email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">invia</button>
            </form>
        </div>
    );
  }

export default Update;
