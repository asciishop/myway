import React from 'react';
import Arrow from "../asset/image/flecha.png";
import Webcam from "react-webcam";

export default () => {
    let videoConstraints ={
        width: 640,
        height: 360,
        facingMode : "user"
    };
    return (
        <div>
            <Webcam audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        ...videoConstraints
                    }} />

            <br/>
        </div>
    );
};
