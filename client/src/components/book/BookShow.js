import React, { Component, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchBook } from '../../actions';



class BookShow extends Component {
  componentDidMount() {


  }

  render() {
    if (!this.props.book) {
      return '';
    }

    this.props.fetchBook(this.props.match.params._id);

    const { title, bookStory } = this.props.book;
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      }
    };

    var data = {
      nodes: bookStory.nodes,
      edges: bookStory.edges
    };

    var events = { }

    return (
      <div>
        <h3>Libro</h3>

      </div>
    );
  }
}

function mapStateToProps({ books }, ownProps) {
  return { book: books[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBook: fetchBook })(BookShow);
