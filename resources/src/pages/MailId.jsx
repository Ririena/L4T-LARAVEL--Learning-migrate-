import React, { useState, useEffect, useContext } from "react";
import { UserStore } from "../Context/UserContext";
import axios from "axios";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Input,
    Divider,
    Image,
    Link,
} from "@nextui-org/react";
export default function MailId() {
    const [user, setUser] = useContext(UserStore);
    const [mail, setMail] = useState([]);

    useEffect(() => {
        const fetchMail = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/getAllMessage?receiver_id=${user.user.id}`
                );
                setMail(res.data.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchMail();
    }, [user]);

    return (
        <main>
            <div className="container">
                <div className="flex justify-center items-center">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-4">
                        {mail.map((message) => (
                            <li
                                key={message.id}
                                className="flex justify-center"
                            >
                                <section className="max-w-lg w-full">
                                    <Card className="border-2  border-primary-400">
                                        <CardHeader>
                                            <Link href={`/mail/${message.id}`}>
                                                <Image
                                                    src="/PFP.jpg"
                                                    className="object-contain"
                                                    width={300}
                                                />
                                            </Link>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <div className="flex justify-between">
                                                <h1 className="text-sm">
                                                    {message.created_at}
                                                </h1>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </section>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
