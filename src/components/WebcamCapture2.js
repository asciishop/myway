import React, { useState } from "react";
import Webcam from "react-webcam";
import {BsArrowRepeat, BsFillCameraFill, BsFillHandThumbsDownFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {URL_BACKEND} from "./const";
import Spinner from "./Spinner";
import { useHistory } from "react-router";



const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

export default function WebcamCapture2(props) {
    const history = useHistory();
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState("");
    const [shot, setShot] = useState(true);
    const [showCamera, setShowCamera] = useState(true);
    const [showShot, setShowShot] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [idBook, setIdBook] = useState(props.idBook);
    const [loading, setLoading] = useState(true);



    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    let videoConstraints;
    videoConstraints = {
        facingMode: facingMode,
        width: 270,
        height: 480
    };

    const redirect = (url) => {
        history.push(url);
    }


    const handleClick = React.useCallback(() => {
        setFacingMode((prevState) =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        );
    }, []);

    function captureShot () {

        const imageSrc = webcamRef.current.getScreenshot();
        setShowCamera(false);
        setShowShot(true);
        setShot(imageSrc);

    }

    function notLike () {

        setShowCamera(true);
        setShowShot(false);


    }

    function enviar(){


        if (idBook === "book"){


            let user = {username :"Anonymous"}
            if (localStorage.getItem("user")) {
                user = JSON.parse(localStorage.getItem("user"));
            }


            let book = {
                title: title,
                content: '',
                file: shot,
                user : user
            };


            axios.post(URL_BACKEND +'books/add-book', book)
                .then((res) => {
                    console.log(res.data)
                    console.log('book successfully created')
                    redirect('/book-list')

                }).catch((error) => {
                console.log(error)
            })
        } else { //Chapter
            let chapter = {
                id:idBook,
                content:'',
                file : shot};

            axios.post(URL_BACKEND +'books/add-chapter', chapter)
                .then((res) => {
                    console.log(res.data)
                    console.log('book successfully created')
                    redirect('/show-book/'+ idBook)

                }).catch((error) => {
                console.log(error)
            })
        }


    }

    function cancel(){

        if (idBook === "book") {

            props.history.push('/create-book')
        } else {

            props.history.push('/show-book/'+ idBook)

        }

    }

    function handleUserMedia() {
        setLoading(false)

    }

    console.log(facingMode + videoConstraints);

    return (
        <>
            <div className="webcam-container">
                <div className="webcam-img">

                    {loading && <Spinner />}
                    {showCamera && (
                        <Webcam
                            className="webcam"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            screenshotQuality={1}
                            onUserMedia={handleUserMedia}

                        />
                    )}
                    {shot !== '' && (
                        <img
                            src={shot}
                        />
                    )}


                </div>

                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-3">

                        <BsFillCameraFill size={50} onClick={captureShot}/>&nbsp;&nbsp;
                        <BsFillHandThumbsDownFill size={50} onClick={notLike}/>
                        <BsArrowRepeat size={50} onClick={handleClick}/>


                    </div>

                </div>
                <br/>


                <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><Button variant="danger" onClick={cancel}>Cancelar</Button>&nbsp;&nbsp; <Button variant="success" onClick={enviar}>Enviar</Button>

                </div></div>
            </div>
        </>
    );
}
