import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    Divider,
    CardBody,
    Input,
    Button,
    CardFooter,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserStore } from "../Context/UserContext";
export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [isSubmit, setIsSubmit] = useState();
    const [user, setUser] = useContext(UserStore);
    const { username, password } = form;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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

            const resProfile = await axios.get(
                "http://localhost:8000/api/profile"
            );

            setUser({
                token: localStorage.getItem("TOKEN"),
                user: resProfile.data.data,
            });

            console.log("SUCCESS" + user.token + user.user);

            navigate("/me");
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleToRegister = () => {
        navigate("/register");
    };

    useEffect(() => {
        if (user.token != null) {
            navigate("/");
        }
    });
    return (
        <>
            <main className="container mx-auto">
                <div className="flex justify-center items-center h-screen">
                    <form onSubmit={handleSubmit}>
                        <Card className="w-[450px] rounded-md">
                            <CardHeader className="flex justify-center items-center">
                                <h1 className="text-indigo-600 text-2xl">
                                    Let's Get Started
                                </h1>
                            </CardHeader>
                            <Divider />
                            <CardBody className="grid grid-cols-1 gap-4">
                                <Input
                                    color="secondary"
                                    value={username}
                                    onChange={handleChange}
                                    placeholder="Example Arienesu"
                                    label="Username"
                                    name="username"
                                />
                                <Input
                                    color="secondary"
                                    value={password}
                                    onChange={handleChange}
                                    label="Password"
                                    name="password"
                                />
                                <Button
                                    color="secondary"
                                    type="submit"
                                    variants="shadow"
                                >
                                    Log In
                                </Button>
                            </CardBody>
                            <Divider />
                            <CardFooter className="flex justify-between">
                                <h1 className="text-gray-400">
                                    {" "}
                                    Didn't have An Account?
                                </h1>
                                <Button
                                    onClick={handleToRegister}
                                    color="secondary"
                                    variant="shadow"
                                >
                                    Register
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </main>
        </>
    );
}
