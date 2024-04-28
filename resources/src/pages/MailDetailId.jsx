import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Input,
    Button,
    Image,
    Spacer,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { UserStore } from "../Context/UserContext";
export default function MailDetailId() {
    const [user, setUser] = useContext(UserStore);
    const [mailData, setMailData] = useState(null);
    const [loading, setLoading] = useState(true);
    let { messageId } = useParams();

    useEffect(() => {
        async function getOneData() {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/messages/${messageId}?receiver_id=${user.user.id}`
                );
                setLoading(false);
                console.log(res);
                setMailData(res.data.data);
            } catch (error) {
                setLoading(false);
                console.error(error.message);
            }
        }
        getOneData();
    }, [user]);
    return (
        <>
            <main className="flex justify-center items-center mt-4">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                ></motion.div>
                <motion.div
                    className="shadow-md overflow-hidden relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="max-w-2xl mx-auto p-8 rounded-lg bg-opacity-75">
                        <div className="flex justify-between gap-12 items-center mb-4">
                            <h1 className="text-3xl font-bold font-serif text-violet-900">
                                Selamat Malam
                            </h1>
                            <p className="text-sm text-gray-500">
                                From: Violet Evergarden
                            </p>
                        </div>
                        <Divider className="border-violet-400 mb-4" />
                        <div className="py-4">
                            <p className="text-lg leading-relaxed text-gray-800">
                                {mailData && mailData.message}
                            </p>
                        </div>
                        <Divider className="border-violet-400 mt-4" />
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Violet Evergarden
                                </p>
                                <p className="text-xs text-gray-400 "></p>
                            </div>
                            <Image
                                src="/PFP.jpg"
                                alt="Stamp"
                                className="size-12"
                            />
                        </div>
                    </Card>
                </motion.div>
            </main>
        </>
    );
}
