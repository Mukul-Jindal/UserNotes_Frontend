import React, { useState, useContext } from 'react'
import noteContext from './notesContext'
import userContext from '../user/userContext';

const NoteState = (props) => {
    const { user } = useContext(userContext);
    const host = "http://localhost:5000";
    const headers = {
        "Content-type": "application/json",
        "auth-token": user.authToken,
    }
    const [notes, setNotes] = useState([]);

    //Fetch Notes
    const fetchNotes = () => {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
                method: "GET",
                headers: headers,
            });
            response.json()
                .then((data) => {
                    if (response.status === 200) {
                        setNotes(data.note);
                        resolve({ message: "Fetched Successfully" });
                    }
                    else {
                        reject(data);
                    }
                })
                .catch(err => reject({ error: err }));
        })
    }

    //Add a Note
    const addNote = (title, description, tag) => {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${host}/api/notes/addNote/`, {
                method: "POST",
                body: JSON.stringify({ title, description, tag }),
                headers: headers
            });
            response.json()
                .then((data) => {
                    if (response.status === 200) {
                        let tempNotes = notes;
                        tempNotes = tempNotes.concat(data);
                        setNotes(tempNotes);
                        resolve(data);
                    }
                    else {
                        reject(data);
                    }
                })
                .catch((err) => {
                    reject({ error: err });
                })
        })

    }

    //Delete a Note
    const deleteNote = (id) => {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
                method: "DELETE",
                headers: headers
            });
            response.json()
                .then((data) => {
                    if (response.status === 200) {
                        const newNote = notes.filter((note) => note._id !== id);
                        setNotes(newNote);
                        resolve();
                    }
                    else {
                        reject(data);
                    }
                })
                .catch(err => reject({ error: err }));
        })
    }
    //Edit a Note
    const editNote = (note) => {
        let { _id, title, description, tag } = note;
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${host}/api/notes/updateNote/${_id}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ title, description, tag })
            });
            response.json()
                .then((data) => {
                    if (response.status === 200) {
                        let tempNotes = [];
                        for (let index = 0; index < notes.length; index++) {
                            if (notes[index]._id === _id) {
                                notes[index].title = title;
                                notes[index].description = description;
                                notes[index].tag = tag;
                            }
                            tempNotes.push(notes[index]);
                        }
                        setNotes(tempNotes);
                        resolve();
                    }
                    else {
                        reject(data);
                    }
                })
                .catch((err) => {
                    reject({ error: err });
                })
        })
    }
    return (
        <noteContext.Provider value={{ notes, fetchNotes, setNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;