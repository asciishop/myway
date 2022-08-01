import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Col, Nav, Row, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BsFileEarmarkText, BsFillCameraFill, BsFillVolumeUpFill} from "react-icons/bs";


export default class Createchapter extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAudio = this.handleAudio.bind(this)
    this.handlePicture = this.handlePicture.bind(this)


    // Setting up state
    this.state = {
      id: this.props.match.params.id,
      content : '',
      file : '',
    }
  }


  handleClick() {

    if (this.state.file === '' && this.state.content === ''){
      alert("Debe ingresar el contenido del capítulo")
      return
    }

      let user = {nickName :"Anonymous"}
      if (localStorage.getItem("user")) {
          user = JSON.parse(localStorage.getItem("user"));
      }

    let book = {
      id:this.state.id,
      content:this.state.content,
      file : this.state.file,
      user : user};

    axios.post(URL_BACKEND +'books/add-chapter', book)
        .then((res) => {
          console.log(res.data)
          console.log('chapter successfully created')
          this.props.history.push('/show-book/'+ this.state.id)
          //window.location.reload();
        }).catch((error) => {
      console.log(error)
    })


    // Redirect to book List
    //this.props.history.push('/show-book/'+ this.state.id)
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

  handlePicture(){

      this.props.history.push('/take-picture-book/'+ this.state.id +'/chapter')



  }


  handleAudio(){

      this.props.history.push('/take-audio-book/'+ this.state.id +'/chapter')



  }

  render() {
    return (

        <div className="container-fluid">
          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <h2>Ingrese un capítulo</h2>          </div></div>


          <br/>



          <Tabs
              defaultActiveKey="texto"
              id="uncontrolled-tab-example"
              className="mb-3"
          >
            <Tab eventKey="texto" title={<BsFileEarmarkText />} >
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
