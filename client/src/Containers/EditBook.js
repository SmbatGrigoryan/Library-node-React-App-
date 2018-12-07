import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getBookWithId, updateBook, deleteBook, clearDeletedBook} from '../Actions/index';

class EditBook extends PureComponent {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      formData: {
        _id: this.props.match.params.id,
        name: '',
        author: '',
        review: '',
        pages: '',
        rating: '',
        price: ''
      }
    }
  }

  componentWillMount() {
    this.props.dispatch(getBookWithId(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookToEdit !== this.props.bookToEdit) {
      let {name, author, review, pages, rating, price} = nextProps.bookToEdit;
      this.setState(() => {
        return {formData: {...this.state.formData, name, author, review, pages, rating, price}};
      });
    }
    if (nextProps.updatedBook) {
    }
  }


  handleInput(e, name) {
    let inputData = e.target.value;
    const newFormData = {...this.state.formData};
    newFormData[name] = inputData;

    this.setState(() => {
      return {
        formData: newFormData
      }
    })
  }


  submitForm(e) {
    e.preventDefault();
    this.props.dispatch(updateBook(this.state.formData));
  }

  deleteBook() {
    this.props.dispatch(deleteBook(this.props.match.params.id));
  }

  redirectUser() {
    setTimeout(() => {
      this.props.history.push('/user/user-posts')
    }, 1000)
  }

  componentWillUnmount() {
    this.props.dispatch(clearDeletedBook())
  }

  render() {
    return (
        <div className="rl_container article">
          {
            this.props.updatedBook ? (
                <div className="edit_confirm">
                  <Link to={`/books/${this.props.updatedBook._id}`}>
                    Link to Updated post
                  </Link>
                </div>
            ) : null
          }
          {
            this.props.deletedBook ? (
                <div className="red_tag">
                  Post Deleted
                  {this.redirectUser()}
                  {this.props.deletedBook}
                </div>
            ) : null
          }

          <form onSubmit={this.submitForm}>

            <h2>Edit ...</h2>
            <div className="form_element">
              <input
                  type="text"
                  placeholder="Enter name"
                  value={this.state.formData.name}
                  onChange={(event) => this.handleInput(event, 'name')}
              />
            </div>
            <div className="form_element">
              <input
                  type="text"
                  placeholder="Enter author"
                  value={this.state.formData.author}
                  onChange={(event) => this.handleInput(event, 'author')}
              />
            </div>

            <textarea
                value={this.state.formData.review}
                onChange={(event) => this.handleInput(event, 'review')}
            />

            <div className="form_element">
              <input
                  type="number"
                  placeholder="Enter pages"
                  value={this.state.formData.pages}
                  onChange={(event) => this.handleInput(event, 'pages')}
              />
            </div>

            <div className="form_element">
              <select
                  value={this.state.formData.rating}
                  onChange={(event) => this.handleInput(event, 'rating')}
              >
                <option val="1">1</option>
                <option val="2">2</option>
                <option val="3">3</option>
                <option val="4">4</option>
                <option val="5">5</option>
              </select>
            </div>

            <div className="form_element">
              <input
                  type="number"
                  placeholder="Enter Price"
                  value={this.state.formData.price}
                  onChange={(event) => this.handleInput(event, 'price')}
              />
            </div>

            <button type="submit">Edit</button>
            <div className="delete_post">
              <div
                  className="button"
                  onClick={this.deleteBook}
              >Delete Book
              </div>
            </div>


          </form>

        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookToEdit: state.books.bookToEdit,
    updatedBook: state.books.updatedBook,
    deletedBook: state.books.deletedBook
  }
}

export default connect(mapStateToProps)(EditBook)



