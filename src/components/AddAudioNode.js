import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import {Card,Tab,Row,Col,Nav} from "react-bootstrap";
import MicRecorder from 'mic-recorder-to-mp3';
import {Link} from "react-router-dom";
import {BsFillCameraFill} from "react-icons/bs";


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class AddAudioNode extends Component {

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);

        // Setting up state
        this.state = {
            file : '',
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            id: this.props.match.params.id,

        }

    }

    handleClick() {



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

        } else {  //Chapter

            let chapter = {
                id:this.state.id,
                content:this.state.content,
                file : this.state.file};

            axios.post(URL_BACKEND +'books/add-chapter', chapter)
                .then((res) => {
                    console.log(res.data)
                    console.log('book successfully created')
                    this.props.history.push('/book-list')
                }).catch((error) => {
                console.log(error)
            })
        }




    }

    componentDidMount() {
        this.setState({ isBlocked: false })
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

                <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
                <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
                <audio src={this.state.blobURL} controls="controls" />

                <br/>

                <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"> <Button variant="success" onClick={this.handleClick}>Enviar</Button>
                </div></div>


            </div>
        );
    }
}
