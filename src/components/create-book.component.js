import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Card,Tab,Row,Col,Nav} from "react-bootstrap";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import MicRecorder from 'mic-recorder-to-mp3';


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Createbook extends Component {

  constructor(props) {
    super(props)


    // Setting up functions
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.handleTakePhoto = this.handleTakePhoto.bind(this);
    this.handleClick = this.handleClick.bind(this);



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

  handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
    console.log(dataUri);
    this.setState({ file: dataUri })

  }

  handleClick() {

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
    navigator.getUserMedia({ audio: true },
        () => {
          console.log('Permission Granted');
          this.setState({ isBlocked: false });
        },
        () => {
          console.log('Permission Denied');
          this.setState({ isBlocked: true })
        },
    );
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
          .start()
          .then(() => {
            this.setState({ isRecording: true });
          }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
        .stop()
        .getMp3()
        .then(async ([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob)
          this.setState({blobURL, isRecording: false});
          const audioBase64 = await this.blobToBase64(blob);
          this.setState({file: audioBase64})

        }).catch((e) => console.log(e));
  };

  blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
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
                      <Nav.Link eventKey="second">Imagen</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Audio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Archivo</Nav.Link>
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

                      <Camera
                          onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">

                      <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
                      <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
                      <audio src={this.state.blobURL} controls="controls" />

                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">

                      <input type="file"
                             className="form-control"
                             id="image"
                             onChange={this.handleInputFileChange}
                             accept="image/*" capture="environment"/>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>





          <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <Button variant="success" onClick={this.handleClick}>Enviar</Button>
          </div></div>


        </div>
    );
  }
}
