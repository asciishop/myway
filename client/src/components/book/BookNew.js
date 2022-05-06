import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BookForm from './BookForm';
import BookFormReview from './BookFormReview';


class BookNew extends Component {
  state = { showFormReview: false };

  render() {
    return (
      <div>
          La Vida
      </div>
    );
  }
}

export default reduxForm({
  form: 'bookForm'
})(BookNew);
