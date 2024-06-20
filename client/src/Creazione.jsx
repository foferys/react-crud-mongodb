import { useState } from "react"
import { addUser } from "./UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delay, motion } from "framer-motion";
import transition from "./transitions";

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
    <motion.div className='d-flex w-100 vh-100 justify-content-center align-items-center' 
    initial={{y: "100%"}}
    animate={{y:"0%"}}
    exit={{ opacity: 1 }}
    transition={{ duration: 0.55, ease:"easeOut" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <motion.h2 className="text-center mt-5 text-3xl font-medium"
            animate={{y:0, opacity:1}} 
            initial={{opacity:0, y:"100%"}} 
            transition={{ delay: 0.3, duration:0.5 }}
            >Inserisci un nuovo utente
          </motion.h2>  
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
    </motion.div>
  )
}

export default transition(Creazione)
