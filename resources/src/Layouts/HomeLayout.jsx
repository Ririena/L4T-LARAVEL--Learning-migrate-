import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    Link,
    Button,
    NavbarMenuItem,
} from "@nextui-org/react";
import { Outlet } from "react-router-dom";
export default function HomeLayout() {
    return (
        <>
            <main>
                <NavbarPage />
                <Outlet />
                <Footer />
            </main>
        </>
    );
}

const NavbarPage = () => {
    return (
        <>
            <Navbar position="static">
                <NavbarBrand>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent
                    className="hidden sm:flex gap-4"
                    justify="center"
                >
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Homes
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            My Mail
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Public Message
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="primary"
                            href="/register"
                            variant="flat"
                        >
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
};

const Footer = () => {
    return (
        <>
            <main>
                <section>
                    <h1 className="text-2xl">Example Footer</h1>
                </section>
            </main>
        </>
    );
};
