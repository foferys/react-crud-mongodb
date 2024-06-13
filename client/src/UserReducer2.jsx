import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Recupera i dati prima di inizializzare il slice nel tuo componente o all'interno di un'azione thunk utilizzando 
createAsyncThunk di Redux Toolkit. -> crea un thunk asincrono per recuperare i dati:*/
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    //usiamo la libreria axios installandola e importandola
    const response = await axios.get('http://127.0.0.1:3001/');
    return response.data;
});

// gestione dello stato di fulfilled del thunk asincrono:
const mongoUserSlice = createSlice({
    name: 'mongousers',
    initialState: { /* L'array vuoto usersi viene utilizzato per inizializzare lo stato del reducer nello slice. 
        In altre parole, è il valore predefinito per usersi prima che i dati vengano recuperati dal server.  */
        usersi: [], // Stato iniziale come array vuoto
        status: 'idle', // Stato iniziale per il caricamento
        error: null, // Stato iniziale per gli errori
    },
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.error = null;
        }
      // definire altri reducers qui se necessario
    },
    //Includiamo fetchUsers nella proprietà extraReducers per gestire i diversi stati dell'azione asincrona(pending, fulfilled, rejected).
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            // nel caso sia fetchUsers.fulfilled, imposto lo state a succeeded
          state.status = 'succeeded';
          state.usersi = action.payload;/* Aggiorna l'array con i dati recuperati -> contiene i dati recuperati dalla 
          richiesta HTTP, che sono passati automaticamente dall'azione thunk quando viene risolta con successo.
          Lo stato usersi viene aggiornato con questi dati, e usersi diventa un array contenente gli utenti recuperati dal server.*/
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
})

// export const {addUser, updateUser, delUser} = mongoUserSlice.actions;
export const {resetStatus} = mongoUserSlice.actions;
export default mongoUserSlice.reducer;