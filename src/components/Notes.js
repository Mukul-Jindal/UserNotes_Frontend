import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/notesContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const { notes, fetchNotes, editNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });
    const showEditModal = useRef(null);
    const closeEditModal = useRef(null);
    const navigate = useNavigate();
    
    // Initial function call of 1st render
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes()
                .then(message => props.showAlert("Fetched successfully", "success"))
                .catch(err => props.showAlert(err.error, "danger"));
        }
        else {
            navigate('/login');
        }
    }, []);

    //Function to call noteEditModal
    const editNoteModal = (note) => {
        showEditModal.current.click();
        setNote({
            ...note,
            title: note.title,
            description: note.description,
            tag: note.tag,
        });
    }

    //Function to handle input value changes
    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    //Hit API call to update the note
    const handleSubmit = (e) => {
        e.preventDefault();
        editNote(note)
            .then(() => {
                props.showAlert("Updated successfully", "success");
            })
            .catch((err) => {
                props.showAlert(err.error, "danger");
            })
        closeEditModal.current.click();
    }
    return (
        <>
            {/* Edit modal */}
            <button type="button" ref={showEditModal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={handleChange} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeEditModal}>Close</button>
                            <button disabled={note.title.length <= 2 || note.description.length <= 4} type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display notes */}
            <div className="row my-3">
                <div className="container">
                    {notes.length === 0 && "Nothing to show"}
                </div>
                <h2>Your Notes</h2>
                {
                    Array.from(notes).map((note) => {
                        return <NoteItem key={note._id} note={note} edit={editNoteModal} showAlert={props.showAlert} />;
                    })
                }
            </div>
        </>
    )
}
