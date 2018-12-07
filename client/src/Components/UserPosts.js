import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {getUserPosts} from '.././Actions/index';

class UserPosts extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getUserPosts(this.props.user.id))
  }

  showUserPosts(user) {
    return user ?
        user.map(item => {
          return (
              <tr key={item._id}>
                <td><Link to={
                  `/user/edit-post/${item._id}`
                }>
                  {item.name}
                </Link></td>
                <td>{item.author}</td>
                <td>
                  {moment(item.createAt).format("MM/DD/YY")}
                </td>
              </tr>
          )
        }) : null
  }


  render() {
    let user = this.props.userPosts;
    return (
        <div className="user_posts">
          <h4>Your Posts:</h4>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {this.showUserPosts(user)}
            </tbody>
          </table>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {userPosts: state.user.userPosts};
}

export default connect(mapStateToProps)(UserPosts);
