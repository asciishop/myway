import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BookForm from './BookForm';
import BookFormReview from './BookFormReview';

class BookNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <BookFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <BookForm
        onBlogSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'bookForm'
})(BookNew);
