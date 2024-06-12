
// questo useSelector ci da l'accesso al reducer in main jsx
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { delUser } from './UserReducer';
import { useEffect, useState } from 'react';
import { UilUserPlus,UilEdit, UilFileTimesAlt } from '@iconscout/react-unicons'; //->import icona iconscout usata al pulsante di creazione
import axios from 'axios'


function Home() {

  const users = useSelector((state) => state.users);
  // console.log(users);
  const dispatch = useDispatch();

  const handleDelete = (idEl) => {
    // alert(typeof(idEl));
    dispatch(delUser(idEl))
  }

  /* Usiamo lo stato locale per mantenere traccia dell'utente selezionato per la cancellazione. Questo stato viene gestito 
  con l'hook useState di React. useState(null) inizialmente, selectedUser è impostato su null perché non c'è nessun utente 
  selezionato all'inizio.
  Quando l'utente clicca sul bottone "Elimina", dobbiamo impostare selectedUser con l'utente corrispondente. Lo facciamo 
  aggiungendo un gestore di eventi onClick ai bottoni bottone sotto nella tabella nel map.*/
    const [selectedUser, setSelectedUser] = useState("");
  /* ------- */

  
  // MONGO DB 
  const [usersi, setUsersi] = useState([])

  useEffect(() => { //usiamo la libreria axios installandola e importandola con require
    axios.get('http://127.0.0.1:3001/')
    .then(users => setUsersi(users.data))
    .catch(err => console.log("erroreeee: ", err))
  }, []);


  return (
    <div className='container'>

      <h2 className='text-center mt-5'>Crud app with json server</h2>

      <Link to={"/create"} className='btn btn-succes my-3 bg-success text-white'>Aggiungi {/* <UilUserPlus /> */}</Link>
      <table className="table" >
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>Modifica{/* <UilEdit /> */}</Link>

                {/* Button trigger modal ----
                quando il bottone viene cliccato, setSelectedUser(user) viene chiamato con l'oggetto user corrente. */}
                <button type="button" className="btn btn-sm btn-danger ms-3" onClick={() => setSelectedUser(user)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Elimina{/* <UilFileTimesAlt /> */}
                </button>
              </td>
            </tr>
          ))}
            
        </tbody>
      </table>

      {/* mongo db */}
      <div>
        <h2 className='text-center mt-5'>Crud app with MongoDB server</h2>
        <p>Numero elementi: {usersi.length}</p>
        {usersi.length == 0 ? (
          <p>Caricamento utenti in corso...</p> // Messaggio di caricamento mentre i dati vengono recuperati
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">ID</th> */}
                  <th scope="col">Nome</th>
                  <th scope="col">Cognome</th>
                  <th scope="col">eta</th>
                </tr>
              </thead>
              <tbody>
                {
                  usersi.map(u => {
                    return (
                      <tr key={u._id}>
                        {/* <td>{u._id}</td> */}
                        <td>{u.nome}</td>
                        <td>{u.cognome}</td>
                        <td>{u.eta}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        )}
      </div>

      

      {/* Modale a comparsa --- 
      Di seguito usiamo selectedUser tramite useState per mostrare il nome e l'email dell'utente selezionato nella modale.*/}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Eliminazione {selectedUser.name}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Sei sicuro di voler eliminare l'utente {selectedUser.name} con email {selectedUser.email}?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn border" data-bs-dismiss="modal">Annulla</button>
              <button className='btn btn-danger ms-3' onClick={() => handleDelete(selectedUser.id)} data-bs-dismiss="modal">
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
 
      
    </div>
  )
}

export default Home
