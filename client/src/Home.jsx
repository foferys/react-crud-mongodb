
// questo useSelector ci da l'accesso al reducer in main jsx
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { delUser } from './UserReducer';
import { useState } from 'react';
import { UilUserPlus,UilEdit, UilFileTimesAlt } from '@iconscout/react-unicons'; //->import icona iconscout usata al pulsante di creazione

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


  return (
    <div className='container'>

      <h2 className='text-center mt-5'>Crud app with json server</h2>

      <Link to={"/create"} className='btn btn-succes my-3 bg-success text-white'>Aggiungi <UilUserPlus /></Link>
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
                <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>Modifica<UilEdit /></Link>

                {/* Button trigger modal ----
                quando il bottone viene cliccato, setSelectedUser(user) viene chiamato con l'oggetto user corrente. */}
                <button type="button" className="btn btn-sm btn-danger ms-3" onClick={() => setSelectedUser(user)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Elimina<UilFileTimesAlt />
                </button>
              </td>
            </tr>
          ))}
            
        </tbody>
      </table>

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
