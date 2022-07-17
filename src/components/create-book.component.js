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

  handleClick() {

    if (this.state.title === ''){
      alert("Debe ingresar el título del libro")
      return
    }

    if (this.state.file === '' && this.state.content === ''){
      alert("Debe ingresar el contenido del libro")
      return
    }



    let book = {title:this.state.title,
      content:this.state.content,
      file : this.state.file};

    axios.post(URL_BACKEND +'books/add-book', book)
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

  render() {
    return (

        <div className="container-fluid">
          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <h2>Ingrese un libro</h2>          </div></div>

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
            /><br/>
          </div>


          <Tabs
              defaultActiveKey="texto"
              id="uncontrolled-tab-example"
              className="mb-3"
          >
            <Tab eventKey="texto" title={<BsFileEarmarkText />}>
              <input
                  type="text"
                  className="form-control"
                  id="content"
                  required
                  name="content"
                  onChange={this.handleOnChangeContent}
              />
            </Tab>
            <Tab eventKey="camera" title={<BsFillCameraFill />}>
              <div className="row "><div className="col d-flex  pt-1" onClick={this.handlePicture} >
                <i className="material-icons btn btn-primary btn-xs ml-auto"><h1>Tomar Foto</h1></i>
              </div></div>
            </Tab>
            <Tab eventKey="audio" title={<BsFillVolumeUpFill />} >

              <div className="row"><div className="col d-flex  pt-1" onClick={this.handleAudio}>
                <i className="material-icons btn btn-primary btn-xs ml-auto"><h1>Grabar Audio</h1></i>
              </div></div>

            </Tab>
           {/* <Tab eventKey="archivo" title="Archivo" disabled>
              <input type="file"
                     className="form-control"
                     id="image"
                     onChange={this.handleInputFileChange}
                     accept="image/*" capture="environment"/>
            </Tab>*/}
          </Tabs>

<br/>
          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <Button variant="success" onClick={this.handleClick}>Enviar</Button>
          </div></div>


        </div>
    );
  }
}
