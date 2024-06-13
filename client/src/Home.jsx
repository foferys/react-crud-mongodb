
// questo useSelector ci da l'accesso al reducer in main jsx
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { delUser } from './UserReducer';
import { useEffect, useState } from 'react';
import { UilUserPlus,UilEdit, UilFileTimesAlt } from '@iconscout/react-unicons'; //->import icona iconscout usata al pulsante di creazione
import axios from 'axios'
import { fetchUsers } from './UserReducer2';
import { resetStatus } from './UserReducer2';

function Home() {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  // console.log(users);

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

  
  // MONGO DB senza usare reducer
  // const [usersi, setUsersi] = useState([])

  // useEffect(() => { //usiamo la libreria axios installandola e importandola con require
  //   axios.get('http://127.0.0.1:3001/')
  //   .then(users => setUsersi(users.data))
  //   .catch(err => console.log("erroreeee: ", err))
  // }, []);

  // MONGO DB usando useSelector col reducer2
    const mongousers = useSelector((state) => state.mongousers.usersi);
    const error = useSelector((state) => state.mongousers.error); 
    
    const status = useSelector((state) => state.mongousers.status);
    /* L'azione fetchUsers viene dispatciata quando il componente viene montato (ovvero, quando viene caricato per la prima volta). 
    1): 
    Quando il componente Home.jsx viene montato, la funzione useEffect viene eseguita.
    Verifica se lo stato status è 'idle'. Se lo è, dispatcia l'azione fetchUsers.
    2)
    :L'azione fetchUsers viene eseguita con una richiesta HTTP per recuperare i dati dal server e viene dispatciata automaticamente 
    l'azione fetchUsers.pending, che aggiorna lo stato status a 'loading'. 
    3):
    Se la richiesta ha successo, viene dispatciata l'azione fetchUsers.fulfilled con i dati recuperati.
    Il reducer per fetchUsers.fulfilled viene eseguito, aggiornando state.status a 'succeeded' e state.usersi con action.payload 
    (i dati recuperati). Se la richiesta fallisce, viene dispatciata l'azione fetchUsers.rejected, aggiornando state.status a 
    'failed' e state.error con il messaggio di errore.
    */
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchUsers());  // Dispatcia l'azione fetchUsers
      }
    }, [status, dispatch]);/*L'array di dipendenze passato come secondo argomento a useEffect determina quando l'effetto viene rieseguito. 
    Se uno degli elementi dell'array di dipendenze cambia, l'effetto viene rieseguito.
    Quando fetchUsers viene dispatciata, lo stato status cambia da 'idle' a 'loading'. Poiché status è cambiato, useEffect non viene 
    rieseguito automaticamente dopo questo aggiornamento (a meno che status cambi nuovamente).*/

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (status === 'failed') {
      // return <div>Error: {error}</div>;
      // se c'è un errore lo mostro nella console, se faccio return come sopra lo ritorna come pagina 
      console.log("Errore: ", error)
    }
    //reimposta lo status a idle per aggiornare la richiesta server (prova)
    const handleRetry = () => {
      dispatch(resetStatus())
    }
  // -------



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
        <h2 className='text-center mt-5'>Crud app with MongoDB server (UserReducer2)</h2>
        <p>Numero elementi: {mongousers.length}</p>

          <button onClick={handleRetry} className='btn btn-primary'>Reset status</button>

        {mongousers.length == 0 ? (
          <p>Caricamento utenti in corso...</p> // Messaggio di caricamento mentre i dati vengono recuperati
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">ID</th> */}
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {
                  mongousers.map(u => (/* Quando si utilizza una funzione a corpo pieno con parentesi graffe {}, è necessario utilizzare 
                    return per restituire il valore, mentre con le tonde  si può omettere il return e le parentesi graffe, 
                    restituendo implicitamente l'elemento*/
                    <tr key={u._id}>
                      {/* <td>{u._id}</td> */}
                      <td>{u.nome}</td>
                      <td>{u.email}</td>
                    </tr>
                    )
                  )
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
