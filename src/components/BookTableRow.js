import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {Card} from "react-bootstrap";

export default class bookTableRow extends Component {
  constructor(props) {
    super(props)
    this.deletebook = this.deletebook.bind(this)
  }

  deletebook() {
    axios
      .delete(
        'http://localhost:4000/books/delete-book/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('book successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>

          <Card>
            <Card.Body>
              <Link
                className="edit-link" path={"product/:id"}
                to={'/show-book/' + this.props.obj._id}
            >
              {this.props.obj.title}
            </Link></Card.Body>
          </Card>

          </td>

      </tr>
    )
  }
}
