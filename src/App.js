import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Logo from "./asset/image/myway-logo.png";


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Createbook from './components/create-book.component'
import Editbook from './components/edit-book.component'
import BookList from './components/book-list.component'
import Showbook from './components/show-book.component'
import Createchapter from './components/create-chapter.component'
import {TbBookUpload} from "react-icons/tb";
import AddImageNode from "./components/AddImageNode";
import AddAudioNode from "./components/AddAudioNode";



function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="white" variant="white">
            <Container>
              <Navbar.Brand>
                <Link to={'/'} className="nav-link">
                  <img src={Logo} alt="MyWay :: colaborative storytelling" width="90%" height="90%" />

                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>

                  <Link to={'/create-book/'} className="btn-floating btn-large red">
                    <i className="material-icons btn btn-success btn-lg ml-auto"><h1><TbBookUpload /></h1></i>
                  </Link>

                </Nav>


              </Nav>
            </Container>
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
                      path="/take-picture-book/:id"
                      component={(props) => <AddImageNode {...props} />}
                  />


                  <Route
                      exact
                      path="/take-audio-book/:id"
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
