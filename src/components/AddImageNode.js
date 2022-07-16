import React, {Component, useRef} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Card,Tab,Row,Col,Nav} from "react-bootstrap";
//import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {Link} from "react-router-dom";
import {BsFillCameraFill} from "react-icons/bs";
import Webcam from "react-webcam";
import Camera from "./Camera";
import BackCamera from "./BackCamera";


const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const components = {
    "Camera": <Camera />,
    "BackCamera": <BackCamera />,

}


export default class AddImageNode extends Component {



    constructor(props) {
        super(props)


        this.handleTakePhoto = this.handleTakePhoto.bind(this);
        this.WebcamCapture = this.WebcamCapture.bind(this);


        // Setting up state
        this.state = {
            file : '',
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            id: this.props.match.params.id,
            title: this.props.match.params.title


        }
    }



    handleTakePhoto (dataUri) {

        this.setState({ file: dataUri })

    }



    componentDidMount() {
        this.setState({ isBlocked: false })
    }

    WebcamCapture(){

        const imageSrc = this.refs.webcam.getScreenshot();

        this.state.file= imageSrc

        if (this.state.id === "book"){

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
        } else { //Chapter
            let chapter = {
                id:this.state.id,
                content:this.state.content,
                file : this.state.file};

            axios.post(URL_BACKEND +'books/add-chapter', chapter)
                .then((res) => {
                    console.log(res.data)
                    console.log('book successfully created')
                    this.props.history.push('/show-book/'+ this.state.id)
                }).catch((error) => {
                console.log(error)
            })
        }


    }



    render() {


        const videoConstraints = {
            width: 640,
            height: 360,
            facingMode : FACING_MODE_ENVIRONMENT
        };



        return (

            <div className="container-fluid">
                <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <h2>Ingrese un libro</h2>          </div></div>

                <br/>

                    <Webcam
                        audio={false}
                        ref='webcam'

                        screenshotFormat="image/jpeg"

                        videoConstraints={videoConstraints}
                    />

                    <br/>

                <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <Button variant="success" onClick={this.WebcamCapture}>Enviar</Button>
                </div></div>


            </div>
        );
    }
}
