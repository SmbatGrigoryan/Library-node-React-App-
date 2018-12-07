import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks} from '.././Actions/index';

import BookItem from '.././Components/BookItemWidgetsUI';


class HomeCon extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getBooks(undefined, undefined, 'des'))
  }

  renderItems(books) {
    return books.list ? (
        books.list.map((book, i) => {
          return <BookItem {...book} key={i}/>;
        })
    ) : null
  }

  loadMore() {
    let count = this.props.books.list ? this.props.books.list.length : null;
    this.props.dispatch(getBooks(10, count, 'des', this.props.books.list));
  }

  render() {
    return (
        <div>
          <div className="home_description">
            <h2>Welcome to Library App</h2>
            <p>This app allows all visitors to tack a
              look at book reviews created by App's users.
            </p>
            <p>You can sign in (Add User) and create,
              edit or remove your own reviews.</p>
          </div>

          {this.renderItems(this.props.books)}
          <div
              className="loadmore"
              onClick={this.loadMore}
          >Load More
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

export default connect(mapStateToProps)(HomeCon);
