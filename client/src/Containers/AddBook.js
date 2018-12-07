import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook, clearNewBook} from '../Actions/index';

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.validateInput = this.validateInput.bind(this);

    this.state = {
      formData: {
        name: '',
        author: '',
        review: '',
        pages: '',
        rating: 1,
        price: ''
      },
      formErr: '',
      nameErr: '',
      authorErr: '',
      displayForm: true
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if ((!prevProps.books.newBook) && this.props.books.newBook) {
      this.setState(() => {
        return {
          displayForm: false
        }
      })
    }

    if (this.state.formData.name && this.state.formData.author && (
        prevState.formErr !== '')) {
      this.setState(() => {
        return {
          formErr: ''
        }
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearNewBook())
  }

  validateInput(e) {
    let fieldName = e.target.name;
    let value = e.target.value;

    switch (fieldName) {
      case 'name':
        if (this.state.formData[fieldName]) {
          this.setState(() => {
            return {
              nameErr: ''
            }
          })
        } else {
          this.setState(() => {
            return {
              nameErr: 'please provide name( title ) for the book'
            }
          })
        }
        break;

      case 'author':
        if (this.state.formData[fieldName]) {
          this.setState(() => {
            return {
              authorErr: ''
            }
          })
        } else {
          this.setState(() => {
            return {
              authorErr: "please provide author's name for the book"
            }
          })
        }
        break;
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
    });
    this.validateInput(e)
  }

  submitForm(e) {
    e.preventDefault();

    if (this.state.formData.name && this.state.formData.author) {
      this.props.dispatch(addBook({
        ...this.state.formData,
        ownerID: this.props.user.authLogin.id
      }));
    } else {
      this.setState(() => {
        return {formErr: 'please fill in the form'}
      })
    }
  }

  showNewBook = (book) => {
    return (
        book.post ?
            <div className="conf_link">
              <Link to={`/books/${book.bookId}`}>
                Click the link to see new book
              </Link>
            </div>
            : null
    )
  };


  render() {
    console.log(`class AddBook extends Component this.state`, this.state)
    console.log(`class AddBook extends Component this.props`, this.props)
    return (
        <div className="rl_container article">
          {this.state.displayForm && (
              <form onSubmit={this.submitForm}>

                <h2>Add a Book</h2>
                <div className="form_element">
                  <input
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      value={this.state.formData.name}
                      onChange={(event) => this.handleInput(event, 'name')}
                      onBlur={this.validateInput}
                  />
                </div>
                {
                  this.state.nameErr ? (
                      <div className="error">{this.state.nameErr}</div>
                  ) : null
                }
                <div className="form_element">
                  <input
                      name="author"
                      type="text"
                      placeholder="Enter author"
                      value={this.state.formData.author}
                      onChange={(event) => this.handleInput(event, 'author')}
                      onBlur={this.validateInput}
                  />
                </div>
                {
                  this.state.authorErr ? (
                      <div className="error">{this.state.authorErr}</div>
                  ) : null
                }
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
                      name="rating"
                      value={this.state.formData.rating}
                      onChange={(event) => this.handleInput(event, 'rating')}
                      onBlur={this.validateInput}
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
                {
                  this.state.formErr ? (
                      <div className="error">{this.state.formErr}</div>
                  ) : null
                }
                <button type="submit">Add review</button>
              </form>
          )}

          {
            this.props.books.newBook ?
                this.showNewBook(this.props.books.newBook)
                : null
          }
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    user: state.user
  }
}

export default connect(mapStateToProps)(AddBook)



