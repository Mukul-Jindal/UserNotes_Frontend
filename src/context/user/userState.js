import React, { useState } from "react";
import userContext from "./userContext";


export default function UserState(props) {
    const [user, setUser] = useState({ authToken: localStorage.getItem('token') });
    const host = process.env.REACT_APP_DB_URL;
    const headers = {
        'content-type': 'application/json',
    }
    const loginUser = (credentials) => {
        const { email, password } = credentials;
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${host}/api/auth/loginUser`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ email: email, password: password })
            });
            response.json()
                .then((data) => {
                    if (response.status === 200) {
                        setUser(data);
                        localStorage.setItem("token", data.authToken);
                        resolve(data);
                    }
                    else {
                        reject(data);
                    }
                })
                .catch(() => {
                    reject({ error: "Not a valid json format" })
                })
        })

    }

    const signUp = (credentials) => {
        const { name, email, password } = credentials;
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${host}/api/auth/createUser/`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ name: name, email: email, password: password }),
            });
            response.json()
                .then((data) => {
                    if (response.status === 200) {
                        setUser(data);
                        localStorage.setItem("token", data.authToken)
                        resolve(data);
                    }
                    else {
                        reject(data);
                    }
                })
                .catch(() => {
                    reject({ error: "Not a valid json format" })
                })
        })
    }
    return (
        <userContext.Provider value={{ user, loginUser, signUp }}>
            {props.children}
        </userContext.Provider>
    )
}
