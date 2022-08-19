import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";

import "./styles.scss";
import axios from "axios";
import {URL_BACKEND} from "../const";

const particleList = Array.from(Array(10));

const LikeButton = (props) => {
  const [liked, setLiked] = useState(prop.like);
  const [clicked, setClicked] = useState(prop.like);

  return (
    <button
      onClick={() => {

          let likeObj = {
              idBook: props.idBook,
              idUser: JSON.parse(localStorage.getItem("user"))._id,
              userName: JSON.parse(localStorage.getItem("user")).username,
              bookTitle : props.title
          };

        let apiSufix = "like"
        if(!liked) {
            apiSufix = "unlike"
        }

          axios.post(URL_BACKEND +'books/'+ apiSufix, likeObj)
              .then((res) => {
                  console.log(res.data)
                  console.log('Like successfully created')

              }).catch((error) => {
              console.log(error)
          })


        setLiked(!liked);
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      {liked && (
        <div className="particles">
          {particleList.map((_, index) => (
            <div
              className="particle-rotate"
              style={{
                transform: `rotate(${
                  (360 / particleList.length) * index + 1
                }deg)`,
              }}
            >
              <div className="particle-tick" />
            </div>
          ))}
        </div>
      )}
      <div className="like-button">
        <Hand />
        <span className={cn("suffix", { liked })}></span>
      </div>
        {props.count}
    </button>
  );
};

export default LikeButton;
