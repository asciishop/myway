import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Col, Nav, Row, Tab} from "react-bootstrap";


export default class Createchapter extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.handleClick = this.handleClick.bind(this);



    // Setting up state
    this.state = {
      id: this.props.match.params.id,
      content : '',
      file : '',
    }
  }


  handleClick() {

    let book = {
      id:this.state.id,
      content:this.state.content,
      file : this.state.file};

    axios.post(URL_BACKEND +'books/add-chapter', book)
        .then((res) => {
          console.log(res.data)
          console.log('chapter successfully created')
        }).catch((error) => {
      console.log(error)
    })


    // Redirect to book List
    this.props.history.push('/show-book/'+ this.state.id)
  }



  handleOnChangeContent (e)  {
    const { target: { value, title } } = e;
    this.setState({ content: value })

  }

  handleInputFileChange(event) {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({ file: e.target.result })

    }
  }


  render() {
    return (

        <div className="container-fluid">
          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <h2>Ingrese un capítulo</h2>          </div></div>


          <br/>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Texto</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Imagen, Audio o Video</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        required
                        name="content"
                        onChange={this.handleOnChangeContent}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">

                    <input type="file"
                           className="form-control"
                           id="image"
                           onChange={this.handleInputFileChange} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>


          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <Button variant="primary" onClick={this.handleClick}>Enviar</Button>
          </div></div>

        </div>
    );
  }
}
