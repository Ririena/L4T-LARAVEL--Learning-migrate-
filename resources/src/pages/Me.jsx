import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Image,
    Input,
    Divider,
    Button,
} from "@nextui-org/react";
import axios from "axios";
import { UserStore } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Me() {
    const [title, setTitle] = useState("");
    const [user, setUser] = useContext(UserStore);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getDataTitle() {
            try {
                const res = await axios.get(
                    "http://localhost:8000/api/getTitle"
                );
                setTitle(res.data.newTitle);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching title:", error.message);
                // Handle error appropriately (e.g., set a state for error display)
            }
        }
        getDataTitle();
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAddData = async () => {
        try {
            if (!title) {
                alert("Title is Empty");
                return;
            }

            if (!user) {
                alert("You Must Login Yet");
                navigate("/login");
                return;
            }
            const data = { title: title };
            const res = await axios.put(
                "http://localhost:8000/api/title",
                data
            );
            setTitle(res.data.newTitle);
            setLoading(false);
            navigate(0);
        } catch (error) {
            console.error("Error adding new title:", error.message);
        }
    };

    return (
        <main className="mx-auto container">
            <section className="flex justify-center center">
                <Card className="w-[500px] mt-6">
                    <CardHeader>
                        <Image src="/PFP.jpg" className="object contain" />
                    </CardHeader>
                    <Divider />
                    <CardBody className="flex justify-center items-center">
                        <section className="m-6">
                            <div className="grid grid-cols-1 gap-4 ">
                                <h1 className="text-2xl text-indigo-600 font-sans text-center capitalize">
                                    {user?.user?.title ||
                                        "Enter Your Title Major"}
                                </h1>
                                <Input
                                    color="secondary"
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter Your New Title For Your Anonymous Message"
                                />
                                <Button
                                    color="secondary"
                                    onClick={handleAddData}
                                    variant="solid"
                                    className="w-[400px]"
                                >
                                    Add New Title
                                </Button>
                            </div>
                        </section>
                    </CardBody>
                </Card>
            </section>
        </main>
    );
}
