import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserContext from "./Context/UserContext";
import Register from "./pages/Register";
import Message from "./pages/Message";
// Layouts
import HomeLayout from "./Layouts/HomeLayout";
import Me from "./pages/Me";
import MessageId from "./pages/MessageId";
import MailId from "./pages/MailId";
import MailDetailId from "./pages/MailDetailId";
const App = () => {
    const withLayout = (LayoutComponent, ChildComponent) => {
        return (props) => (
            <LayoutComponent>
                <ChildComponent {...props}></ChildComponent>
            </LayoutComponent>
        );
    };

    const HomeLayouts = withLayout(HomeLayout, Home);
    return (
        <>
            <UserContext>
                <Routes>
                    <Route path="/" element={<HomeLayouts />}>
                        <Route index element={<Home />} />
                        <Route path="me" element={<Me />} />
                    </Route>

                    <Route path="message" element={<Message />}>
                        <Route path=":id" element={<MessageId />} />
                    </Route>
                    <Route path="mail" element={<HomeLayout />}>
                        <Route index element={<MailId />} />
                        <Route path=":messageId" element={<MailDetailId />} />
                    </Route>

                    <Route path=":messageId" element={<MailDetailId />} />
                    {/*Authentication */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </UserContext>
        </>
    );
};

export default App;
