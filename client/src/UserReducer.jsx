import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";
import { act } from "react";


const userSlice = createSlice({
    name: "users",
    initialState: userList, // -> stato iniziale con gli utenti importati da Data.jsx
    reducers: {
        addUser: (state, action) => {
            /* console.log(action); */
            // pushiamo nello state atttuale il payload della variabile action
            state.push(action.payload);
        },
        updateUser: (state, action) => {
            const {id, name, email} = action.payload;
            // update dello stato
            const updUser = state.find(user => user.id == id);
            if(updUser) {
                updUser.name = name;
                updUser.email = email;
            }
        },
        delUser: (state, action) => {
            const idDaEl = action.payload;
            const indice = state.findIndex(item => item.id === idDaEl); // Trova l'indice dell'elemento

            console.log("da eliminare:" + idDaEl);

            if (indice !== -1) { // Verifica se l'elemento esiste
                state.splice(indice, 1); // Rimuovi l'elemento all'indice trovato
            }
        }
    }
})

export const {addUser, updateUser, delUser} = userSlice.actions;
export default userSlice.reducer;