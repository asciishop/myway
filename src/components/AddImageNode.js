import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Card,Tab,Row,Col,Nav} from "react-bootstrap";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {Link} from "react-router-dom";
import {BsFillCameraFill} from "react-icons/bs";

export default class AddImageNode extends Component {

    constructor(props) {
        super(props)


        this.handleTakePhoto = this.handleTakePhoto.bind(this);



        // Setting up state
        this.state = {
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


    componentDidMount() {
        this.setState({ isBlocked: false })
    }


    render() {
        return (

            <div className="container-fluid">
                <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <h2>Ingrese un libro</h2>          </div></div>

                <br/>
                <div className="form-group">


                    <Camera
                        onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                    />

                    <br/>
                </div>


                <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <Button variant="success" onClick={this.handleClick}>Enviar</Button>
                </div></div>


            </div>
        );
    }
}
