import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Card, Tab, Row, Col, Nav, Tabs} from "react-bootstrap";

import {Link} from "react-router-dom";
import {BsFileEarmarkText, BsFillCameraFill, BsFillVolumeUpFill} from "react-icons/bs";



export default class Createbook extends Component {

  constructor(props) {
    super(props)


    // Setting up functions
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAudio = this.handleAudio.bind(this)
    this.handlePicture = this.handlePicture.bind(this)
    this.cancel = this.cancel.bind(this)


    // Setting up state
    this.state = {
      title : '',
      content : '',
      file : '',
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    }
  }

  getUser() {

    axios.get(URL_BACKEND +"users/me",{headers: { Authorization: 'Bearer '+ localStorage.getItem("token") }})
        .then(res => {
          return res.data

        })
        .catch((error) => {
          console.log(error);
        })
  }

  async handleClick() {

    if (this.state.title === '') {
      alert("Debe ingresar el título del libro")
      return
    }

    if (this.state.file === '' && this.state.content === '') {
      alert("Debe ingresar el contenido del libro")
      return
    }

    let user = {username :"Anonymous"}
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }


    let book = {
      title: this.state.title,
      content: this.state.content,
      file: this.state.file,
      user : user
    };

    axios.post(URL_BACKEND + 'books/add-book', book)
        .then((res) => {
          console.log(res.data)
          console.log('book successfully created')
          this.props.history.push('/book-list')
        }).catch((error) => {
      console.log(error)
    })


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
  componentDidMount() {
    this.setState({ isBlocked: false })
  }

  blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  handlePicture(){
    if (this.state.title === "")
      alert("Debes ingresar el título")
    else
      this.props.history.push('/take-picture-book/book/'+this.state.title)



  }


  handleAudio(){
    if (this.state.title === "")
      alert("Debes ingresar el título")
    else
      this.props.history.push('/take-audio-book/book/'+this.state.title)



  }

  cancel(){
    this.props.history.push('/book-list')

  }

  render() {
    return (

        <div className="container-fluid">
          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <h2>Escribir un libro</h2>          </div></div>

          <br/>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
                type="text"
                className="form-control"
                id="title"
                required
                name="title"
                onChange={this.handleOnChangeTitle}
                maxlength="80"
            /><br/>
          </div>


          <Tabs
              defaultActiveKey="texto"
              id="uncontrolled-tab-example"
              className="mb-3"
          >
            <Tab eventKey="texto" title={<BsFileEarmarkText size={40} />}>


              <textarea
                  className="form-control"
                  id="content"
                  required
                  name="content"
                  onChange={this.handleOnChangeContent}
                  rows="4" cols="25"
                  maxlength="125"
              />
            </Tab>
            <Tab eventKey="camera" title={<BsFillCameraFill size={40} onClick={this.handlePicture} />}  />

            <Tab eventKey="audio" title={<BsFillVolumeUpFill size={40} onClick={this.handleAudio} />}  />


           {/* <Tab eventKey="archivo" title="Archivo" disabled>
              <input type="file"
                     className="form-control"
                     id="image"
                     onChange={this.handleInputFileChange}
                     accept="image/*" capture="environment"/>
            </Tab>*/}
          </Tabs>

<br/>
          <br/>
          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><Button variant="danger" onClick={this.cancel}>Cancelar</Button>&nbsp;&nbsp; <Button variant="success" onClick={this.handleClick}>Enviar</Button>

          </div></div>


        </div>
    );
  }
}
