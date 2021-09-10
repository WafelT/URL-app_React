import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center">Auth me</h1>
                <div className="card blue lighten-2">
                    <div className="card-content white-text center">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                className="yellow-input"
                                placeholder="Enter your email" 
                                id="email" 
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input 
                                className=""
                                placeholder="Enter your password" 
                                id="password" 
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action center">
                        <button
                        onClick={loginHandler}
                        className="btn cyan lighten-5 black-text s12 m2" 
                        style={{ marginRight: 10 }}
                        disabled={loading}
                        >Login
                        </button>

                        <button
                        onClick={registerHandler}
                        disabled={loading}
                        className="btn cyan darken-3 s12 m2
                        ">Registration
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    );
}