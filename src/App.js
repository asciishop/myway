import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LogoMyWay from "./asset/image/myway-logo-small.png";
import LogoMyWaySmall from "./asset/image/myway-logo-very-small.png";




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
import AddImageNode from "./components/AddImageNode";
import AddAudioNode from "./components/AddAudioNode";
import {FiFeather, FiLogIn, FiPlusSquare, FiLogOut, FiUser} from "react-icons/fi";
import Profile from "./components/Profile";
import AcercaDe from "./components/AcercaDe";


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


function logoutHandler() {

  let token = localStorage.getItem("token")

  if (!token) {
    alert("No se encuentra registrado")
    return
  }


  axios.get(URL_BACKEND +'users/logout', {headers: { Authorization: 'Bearer '+ token }})
      .then( async (response) => {

        if (response.status === 200) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          window.location.href = "https://myways.cl/"

        } else {
          this.state.error("Error getting user.")
        }

      }).catch((error) => {
    console.log(error)
  })


}



function App() {




  return (
      <div className="App">
        <Router>
          <header className="App-header">


            <Navbar collapseOnSelect expand="lg">
              <Navbar.Brand href="#home">

                <Link to={'/'} className="nav-link">
                  <img src={LogoMyWay} alt="MyWay :: colaborative storytelling" width="100%" height="100%" />

                </Link>

              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" >
                  <Nav.Link  href="/create-book/"><FiFeather color={"green"} size={30}/>&nbsp; Escribir</Nav.Link>
                  <Nav.Link  href="/profile/"><FiUser color={"green"} size={30}/>&nbsp; Perfil</Nav.Link>
                  <Nav.Link href="/login/"><FiLogIn color={"green"} size={30}/>&nbsp; Ingresar</Nav.Link>
                  <Nav.Link href="/register"><FiPlusSquare color={"green"} size={30}/>&nbsp;Registro</Nav.Link>
                  <Nav.Link  onClick={logoutHandler} href="#"><FiLogOut color={"green"} size={30}/>&nbsp; Salir</Nav.Link>
                  <Nav.Link href="/acerca"><img src={LogoMyWaySmall} />Acerca de MyWays</Nav.Link>

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
            </Navbar>

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

                    <Route
                        exact
                        path="/profile"
                        component={(props) => <Profile {...props} />}
                    />

                    <Route
                        exact
                        path="/acerca"
                        component={(props) => <AcercaDe {...props} />}
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
