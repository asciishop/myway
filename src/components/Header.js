import React, {Component, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import UserInfo from "./UserInfo";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import LogoMyWay from "../asset/image/myway-logo-small.png";
import Nav from "react-bootstrap/Nav";
import {FiFeather, FiLogIn, FiLogOut, FiPlusSquare, FiUser} from "react-icons/fi";
import LogoMyWaySmall from "../asset/image/myway-logo-very-small.png";


export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {}
        }

        /*
        var urlParams = new URLSearchParams(props.location.search);

        if(urlParams.has('token')) {
            console.log("QUERY :" + props.location.search)
            let token = urlParams.get('token')
            localStorage.setItem("token", token)
            this.setUser(token)
        }*/
    }

    setUser(token) {

        axios.get(URL_BACKEND +'users/me', {headers: { Authorization: 'Bearer '+ token }})
            .then( async (response) => {

                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data))

                } else {
                    this.state.error("Error getting user.")
                }

            }).catch((error) => {
            console.log(error)
        })


    }

     logoutHandler() {
        localStorage.removeItem("token")
         window.location.href = "https://myways.cl/"
     }

    render() {

        return (

            <header className="App-header">


                <Navbar style={{backgroundColor: "white"}} className="fixed-top" collapseOnSelect expand="lg">
                    <Navbar.Brand href="#home">

                        <Link to={'/'} className="nav-link">
                            <img src={LogoMyWay} alt="MyWay :: colaborative storytelling" width="85%" height="85%" />

                        </Link>

                    </Navbar.Brand>
                    <Nav.Link className="pl-1" style={{"margin-left": "-78px","color":"darkseagreen"}} href="/create-book/"><b>Escribir</b>&nbsp;<FiFeather color={"green"} size={30}/>&nbsp;</Nav.Link>

                    &nbsp;&nbsp;
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    {!localStorage.getItem("user") &&
                        <Navbar.Collapse style={{backgroundColor: "white"}} className="justify-content-end" id="responsive-navbar-nav">
                            <Nav className="justify-content-end">
                                <Nav.Link className="border-left pl-2" style={{"margin-left": "auto"}} href="/login/">Ingresar&nbsp;<FiLogIn color={"green"} size={30}/></Nav.Link>
                                <Nav.Link className="border-left pl-2" style={{"margin-left": "auto"}} href="/register">Registro&nbsp;<FiPlusSquare color={"green"} size={30}/></Nav.Link>
                                <Nav.Link className="border-left pl-2" style={{"margin-left": "auto"}} href="/acerca">Acerca de&nbsp;<img src={LogoMyWaySmall} /></Nav.Link>
                                <hr
                                    style={{
                                        background: 'lime',
                                        color: 'lime',
                                        borderColor: 'lime',
                                        height: '3px',
                                    }}
                                />
                            </Nav>


                        </Navbar.Collapse>

                    }

                    {localStorage.getItem("user") &&
                        <Navbar.Collapse style={{backgroundColor: "white"}} className="justify-content-end" id="responsive-navbar-nav">
                            <Nav className="justify-content-end">
                                <Nav.Link className="border-left pl-2" style={{"margin-left": "auto"}} href="#"><b>Hola {JSON.parse(localStorage.getItem("user")).username}</b> </Nav.Link>

                                <Nav.Link className="border-left pl-2" style={{"margin-left": "auto"}} href="/profile/">Perfil&nbsp; <FiUser color={"green"} size={30}/></Nav.Link>
                                <Nav.Link className="border-left pl-2" style={{"margin-left": "auto"}} onClick={this.logoutHandler} href="#">Salir&nbsp;<FiLogOut color={"green"} size={30}/></Nav.Link>
                                <Nav.Link className="border-left pl-2" style={{"margin-left": "auto"}} href="/acerca">Acerca de&nbsp;<img src={LogoMyWaySmall} /></Nav.Link>

                                <hr
                                    style={{
                                        background: 'green',
                                        color: 'green',
                                        borderColor: 'green',
                                        height: '3px',
                                    }}
                                />
                            </Nav>



                        </Navbar.Collapse>



                    }





                </Navbar>

            </header>
        );
    }
}


