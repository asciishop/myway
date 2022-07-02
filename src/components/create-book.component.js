import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Card,Tab,Row,Col,Nav} from "react-bootstrap";
import VideoNode from "./VideoNode";




export default class Createbook extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.handleClick = this.handleClick.bind(this);



    // Setting up state
    this.state = {
      title : '',
      content : '',
      file : '',
    }
  }


  handleClick() {

    let book = {title:this.state.title,
      content:this.state.content,
      file : this.state.file};

    axios.post(URL_BACKEND +'books/add-book', book)
        .then((res) => {
          console.log(res.data)
          console.log('book successfully created')
        }).catch((error) => {
      console.log(error)
    })


    // Redirect to book List
    this.props.history.push('/book-list')
  }


  handleOnChangeTitle (e)  {
    const { target: { value, title } } = e;
    this.setState({ title: value })


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
          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <h2>Ingrese un libro</h2>          </div></div>
          <br/>
          <div className="form-group">
            <label htmlFor="title">Titulo</label>
            <input
                type="text"
                className="form-control"
                id="title"
                required
                name="title"
                onChange={this.handleOnChangeTitle}
            /><br/>
          </div>


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
