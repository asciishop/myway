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
    switch(node.type) {
      case "image":

        return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><ImageNode node={node} /></div></div>

        break;
      case "text":


        return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><TextNode node={node} /></div></div>


        break;
      case "video":

        return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><VideoNode node={node} /></div></div>


        break;
      case "audio":

        return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><AudioNode node={node} /></div></div>


        break;
    }
  }

  render() {
    return (
      <tr>
        <td>
          <div className="container-fluid">
          <Card>
            <Card.Body>
              <Link
                className="" path={"product/:id"}
                to={'/show-book/' + this.props.obj._id}
            >

                {this.props.obj.title}

                  {this.renderSwitch(this.props.obj.chapters[0])}
            </Link></Card.Body>
          </Card>
          </div>

          </td>

      </tr>
    )
  }
}
