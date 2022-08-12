import React, {Component, useRef, useState} from "react";
import {FiFeather, FiShare, FiShare2} from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
import axios from "axios";
import {URL_BACKEND} from "../const";
import Table from "react-bootstrap/Table";
import Overlay from 'react-bootstrap/Overlay';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";


    export default class ShareButton extends Component {

        constructor(props) {
            super(props)
            this.state = {
                urlSocial: '',
                title :'',
                showTooltip : false

            }
            this.inputRef = React.createRef(null);

            this.setShow = this.setShow.bind(this);



        }
        componentDidMount(){
            this.inputRef.current.focus();
        }


        setShow() {

            if (this.state.showTooltip) {
                this.setState({ showTooltip: false });
            } else {
                this.setState({ showTooltip: true });
            }

        }

        render() {

            let title =  this.props.title;
            let urlShare = 'https://myways.cl/show-book/'+ this.props.id;

            return (
      <div id="editor" >



          <Button variant="success" ref={this.inputRef} onClick={() => this.setShow()}>
              <FiShare2 color={"white"} size={30}/>
          </Button>
          <Overlay target={this.inputRef.current} show={this.state.showTooltip} placement="right">
              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                      {...props}
                      style={{
                          position: 'absolute',
                          backgroundColor: 'white',
                          padding: '15px 10px',
                          color: 'white',
                          borderRadius: 3,
                          ...props.style,
                      }}
                  >

                      <FacebookShareButton
                          url={urlShare}
                          quote={title}
                          hashtag={'#myways'}
                      >
                          <FacebookIcon size={30} round={true} />
                      </FacebookShareButton>
                      &nbsp;

                      <WhatsappShareButton
                          url={urlShare}
                          quote={title}
                          hashtag={'#myways'}
                      >
                          <WhatsappIcon size={30} round={true} />
                      </WhatsappShareButton>
                      &nbsp;
                      <TwitterShareButton
                          url={urlShare}
                          quote={title}
                          hashtag={'#myways'}
                      >
                          <TwitterIcon size={30} round={true} />
                      </TwitterShareButton>


                  </div>
              )}
          </Overlay>



      </div>
  );
};

}

