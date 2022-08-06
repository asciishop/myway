import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {Card} from "react-bootstrap";
import {URL_BACKEND} from "./const";
import ImageNode from "./ImageNode";
import TextNode from "./TextNode";
import VideoNode from "./VideoNode";
import AudioNode from "./AudioNode";
import {TbArrowBigRightLines} from "react-icons/tb";
import {FacebookIcon, FacebookShareButton, FacebookShareCount, WhatsappIcon, WhatsappShareButton} from "react-share";

export default class bookTableRow extends Component {

  constructor(props) {
    super(props)
    this.deletebook = this.deletebook.bind(this)
  }

  deletebook() {
    axios
      .delete(
          URL_BACKEND+'books/delete-book/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('book successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  renderSwitch(node) {
    let fecha = new Date(node.date)
      let urlShare = 'https://myways.cl/show-book/' + this.props.obj._id
      let title = this.props.obj.title
    switch(node.type) {
      case "image":

        return <div className="row d-flex justify-content-center">
                <div className="col d-flex align-items-center justify-content-center pt-3">
                  <ImageNode node={node} />
                </div>
          <br/>
              <div className="row d-flex justify-content-center">
                <div className="col d-flex pt-3">
                  <b><i>by {node.user.username}</i></b>
                </div>

                  <div className="col d-flex align-items-center justify-content-center pt-3">
                      <FacebookShareButton
                          url={urlShare}
                          quote={title}
                          hashtag={'#myways'}
                      >
                          <FacebookIcon size={40} round={true} />
                      </FacebookShareButton>
                      &nbsp;

                      <WhatsappShareButton
                          url={urlShare}
                          quote={title}
                          hashtag={'#myways'}
                      >
                          <WhatsappIcon size={40} round={true} />
                      </WhatsappShareButton>

                </div>

              </div>
            </div>

        break;
      case "text":


        return <div className="row d-flex justify-content-center">
                  <div className="row d-flex justify-content-center">
                    <TextNode node={node} />
                  </div>
          <br/>
                  <div className="row d-flex justify-content-center">
                    <div className="col d-flex pt-3">
                      <b><i>by {node.user.username}</i></b>
                    </div>

                    <div className="col d-flex align-items-center justify-content-center pt-3">
                        <FacebookShareButton
                            url={urlShare}
                            quote={title}
                            hashtag={'#myways'}
                        >
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        &nbsp;

                        <WhatsappShareButton
                            url={urlShare}
                            quote={title}
                            hashtag={'#myways'}
                        >
                            <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                    </div>

                  </div>
               </div>



        break;
      case "video":

        return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><VideoNode node={node} /></div>
                  <br/>
                  <div className="row d-flex justify-content-center">
                    <div className="col d-flex pt-3">
                      <b><i>by {node.user.username}</i></b>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center pt-3">
                        <FacebookShareButton
                            url={urlShare}
                            quote={title}
                            hashtag={'#myways'}
                        >
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        &nbsp;

                        <WhatsappShareButton
                            url={urlShare}
                            quote={title}
                            hashtag={'#myways'}
                        >
                            <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                    </div>

                  </div>
                </div>


        break;
      case "audio":

        return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><AudioNode node={node} /></div>
                <br/>
                <div className="row d-flex justify-content-center">
                  <div className="col d-flex pt-3">
                    <b><i>by {node.user.username}</i></b>
                  </div>
                  <div className="col d-flex align-items-center justify-content-center pt-3">
                      <FacebookShareButton
                          url={urlShare}
                          quote={title}
                          hashtag={'#myways'}
                      >
                          <FacebookIcon size={40} round={true} />
                      </FacebookShareButton>
                      &nbsp;

                      <WhatsappShareButton
                          url={urlShare}
                          quote={title}
                          hashtag={'#myways'}
                      >
                          <WhatsappIcon size={40} round={true} />
                      </WhatsappShareButton>
                  </div>

                </div>
              </div>


        break;
    }
  }


  render() {

    return (
      <tr>
        <td>

          <Card>
            <Card.Body>
              <h5 className="card-title">{this.props.obj.title}</h5>
              <div className="row d-flex float-end"><div className="col d-flex align-items-center justify-content-center pt-3">

                  <Link to={'/show-book/' + this.props.obj._id} className="btn-floating btn-large red">
                <i className="material-icons btn btn-lg ml-auto"><h1><TbArrowBigRightLines /></h1></i>
              </Link></div></div>

                  {this.renderSwitch(this.props.obj.chapters[0])}
            </Card.Body>
          </Card>

          </td>

      </tr>
    )
  }
}
