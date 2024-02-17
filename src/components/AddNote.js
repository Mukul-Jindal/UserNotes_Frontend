import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/notesContext';

export default function AddNote(props) {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
            .then((response) => {
                setNote({
                    title: "",
                    description: "",
                });
                props.showAlert("Note added", "success");
            })
            .catch((err) => {
                props.showAlert(err.error, "danger");
            })
    }
    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form name='AddNote' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={handleChange} />
                </div>
                <button disabled={note.title.length <= 2 || note.description.length <= 4} type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
