import React from "react";
import {Container, Navbar} from "react-bootstrap";

function Header(){
    const title = "Flightlogger";
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header;