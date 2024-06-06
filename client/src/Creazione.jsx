import { useState } from "react"
import { addUser } from "./UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Creazione() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  //usiamo useSelector per prendere tutti gli utenti e usarli per contare uno in piu per settare l'id
  const users = useSelector((state) => state.users);
  // console.log(users.length +1) <--> users[users.length -1].id + 1

  const dispatch = useDispatch();
  // useNavigate lo usiamo per navigare al percorso indicato
  const naviga = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addUser({id: users.length + 1, name: name, email: email}));

    document.querySelector("#messUserOk").classList.remove("nascosto");
    setName('');
    setEmail('');

    setTimeout(() => {
      naviga("/");
    },1500)
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Inserisci un nuovo utente</h2>  
          <p id="messUserOk" className="nascosto text-success">utente inserito</p>
          <label htmlFor="name">Nome</label>
          <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)}  placeholder="il tuo nome"/>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Indirizzo Email</label>
          <input type="email" className="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="la tua Enter"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">invia</button>
      </form>
    </div>
  )
}

export default Creazione
