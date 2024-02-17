import React, { useContext } from 'react';
import noteContext from '../context/notes/notesContext';


export default function NoteItem(props) {
    const { deleteNote } = useContext(noteContext);
    const { note, edit, showAlert } = props;

    const handleDelete = () => {
        deleteNote(note._id)
            .then(() => showAlert("Deleted Successfully", "success"))
            .catch(err => showAlert(err.error, "danger"));
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">
                        {note.title}
                    </h5>
                    <p className="card-text">
                        {note.description}
                    </p>
                    <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                    <i className="fa-solid fa-pen mx-2" onClick={() => edit(note)}></i>
                </div>
            </div>
        </div>
    )
}
