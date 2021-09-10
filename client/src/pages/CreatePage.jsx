import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
    const auth = useContext(AuthContext);

    const [link, setLink] = useState('');
    const {request} = useHttp()

    const pressHandler = async event => {
        if (event.key === 'Enter'); {
            try {
                const data = await request('/api/link/generate', 'Post', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                console.log(data);
            } catch (e) {}
        }
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '8rem'}}>
                <div className="input-field">
                    <input
                    className="yellow-input"
                    placeholder="Make shorten your Url..." 
                    id="link" 
                    type="text"
                    name="link"
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                    value={link}
                    />
                    <label htmlFor="email">URL</label>
                </div>
            </div>
        </div>
    );
}