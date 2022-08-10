import React, {Component, useState} from "react";
import {FiShare} from "react-icons/fi";
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

    export default class ShareButton extends Component {

        constructor(props) {
            super(props)
            this.state = {
                urlSocial: '',
                title :''

            }
            //let urlShare = 'https://myways.cl/show-book/' + this.props.obj.id;
            //this.setState({ urlSocial: urlShare });
            //this.setState({ title: this.props.obj.title });

        }
        componentDidMount(){


            }

        render() {
  return (
      <div id="editor" >
        <FacebookShareButton
            url={this.state.urlSocial}
            quote={this.state.title}
            hashtag={'#myways'}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        &nbsp;

        <WhatsappShareButton
            url={this.state.urlSocial}
            quote={this.state.title}
            hashtag={'#myways'}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        &nbsp;
        <TwitterShareButton
            url={this.state.urlSocial}
            quote={this.state.title}
            hashtag={'#myways'}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>



      </div>
  );
};

}

