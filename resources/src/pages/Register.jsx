import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Divider,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        username: "",
        bio: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.password_confirmation) {
            alert("Password Tidak Sama");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/api/register", form);
            console.log(res.data);
            navigate("/login");
        } catch (error) {
           console.log(error.message)
        }
    };

    return (
        <main className="mx-auto container">
            <section className="flex justify-center items-center h-screen">
                <Card>
                    <form onSubmit={handleSubmit} className="w-[450px]">
                        <CardHeader className="flex justify-center items-center">
                            <h1 className="text-2xl text-indigo-600">Register To Get Access</h1>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <section className="grid grid-cols-1 gap-4">
                                <Input
                                    color="secondary"
                                    label="Fullname"
                                    name="full_name"
                                    onChange={handleChange}
                                    value={form.full_name}
                                />
                                <Input
                                    color="secondary"
                                    label="Username"
                                    name="username"
                                    onChange={handleChange}
                                    value={form.username}
                                />
                                <Input
                                    color="secondary"
                                    label="Bio"
                                    name="bio"
                                    onChange={handleChange}
                                    value={form.bio}
                                />
                                <Input
                                    color="secondary"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={form.password}
                                />
                                <Input
                                    color="secondary"
                                    label="Confirm Password"
                                    type="password"
                                    name="password_confirmation"
                                    onChange={handleChange}
                                    value={form.password_confirmation}
                                />
                                <Button type="submit" color="secondary">
                                    Register
                                </Button>
                            </section>
                        </CardBody>
                    </form>
                </Card>
            </section>
        </main>
    );
}
