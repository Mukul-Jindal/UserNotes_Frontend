import React from 'react'

export default function Alert(props) {
    const capatize = (word) => {
        word = String(word);
        if (word === 'danger') word = "error";
        word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    // return (
    //     props.alert === null
    //         ? <></>
    //         :
    //         <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    //             <strong>{capatize(props.alert.type)}:</strong> {props.alert.message}
    //             <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    //         </div>
    // )
    if (props.alert === null) return (<></>);
    else {
        return (
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong> {capatize(props.alert.type)}:</strong> {props.alert.message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )
    }
}
