import React from "react";
import Card from "../components/Card";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../Context/UserContext";

export default function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [user, setUser] = useContext(UserStore);
    const { username, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/api/login", {
                username,
                password,
            });

            localStorage.setItem("TOKEN", res.data.token);
            axios.defaults.headers["authorization"] =
                "bearer" + localStorage.getItem("TOKEN");

            const response = await axios.get(
                "http://localhost:8000/api/profile"
            );

            setUser({
                token: localStorage.getItem("TOKEN"),
                user: response.data.data,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>

        </>
    );
}
