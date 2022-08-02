import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LogoMyWay from "./asset/image/myway-logo.png";


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Createbook from './components/create-book.component'
import Editbook from './components/edit-book.component'
import BookList from './components/book-list.component'
import Showbook from './components/show-book.component'
import Createchapter from './components/create-chapter.component'
import {TbBookUpload} from "react-icons/tb";
import Login from "./components/Login";
import Register from "./components/Register";
import {  NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "./logo.svg";
import axios from "axios";
import {URL_BACKEND} from "./components/const";
import UserInfo from "./components/UserInfo";
import AddImageNode from "./components/AddImageNode";
import AddAudioNode from "./components/AddAudioNode";


function getToken () {
  const user = parseJwt(localStorage.getItem("token"));
  console.log(JSON.stringify(user))
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};




function App() {




  return (
      <div className="App">
        <Router>
          <header className="App-header">


            <Navbar collapseOnSelect expand="lg" >
              <Navbar.Brand href="#home">


                <Nav className="justify-content-end">
                  <Nav>

                    <Link to={'/'} className="nav-link">
                      <img src={LogoMyWay} alt="MyWay :: colaborative storytelling" width="90%" height="90%" />

                    </Link>


                  </Nav>



                </Nav>


              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/create-book/">Escribir</Nav.Link>
                  <Nav.Link href="/login/">Login</Nav.Link>
                  <Nav.Link href="/register">Registro</Nav.Link>


                </Nav>

              </Navbar.Collapse>
            </Navbar>


            {localStorage.getItem("token") &&
                <UserInfo/>

            }

          </header>

          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Switch>
                    <Route
                        exact
                        path="/"
                        component={(props) => <BookList {...props} />}
                    />
                    <Route
                        exact
                        path="/create-book"
                        component={(props) => <Createbook {...props} />}
                    />
                    <Route
                        exact
                        path="/edit-book/:id"
                        component={(props) => <Editbook {...props} />}
                    />
                    <Route
                        exact
                        path="/book-list"
                        component={(props) => <BookList {...props} />}
                    />
                    <Route
                        exact
                        path="/show-book/:id"
                        component={(props) => <Showbook {...props} />}
                    />
                    <Route
                        exact
                        path="/create-chapter/:id"
                        component={(props) => <Createchapter {...props} />}
                    />
                    <Route
                        exact
                        path="/login"
                        component={(props) => <Login {...props}  />}
                    />

                    <Route
                        exact
                        path="/register"
                        component={(props) => <Register {...props} />}
                    />

                    <Route
                        exact
                        path="/take-picture-book/:id"
                        path="/take-picture-book/:id/:title"
                        component={(props) => <AddImageNode {...props} />}
                    />

                    <Route
                        exact
                        path="/take-audio-book/:id"
                        path="/take-audio-book/:id/:title"
                        component={(props) => <AddAudioNode {...props} />}
                    />


                  </Switch>
                </div>
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
  )
}

export default App
