import React, { Component } from "react";
import "./App.css";
import {ToastContainer} from 'react-toastify'
import http from "./services/httpService"
import config from "./config.json"
import 'react-toastify/dist/ReactToastify.css'

import _ from 'lodash';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
   
   try{ let {data:posts} = await http.get(
    config.apiEndpoint
    )
   this.setState({posts})
   }
   catch(error)
   {
     console.log("eerror",error)
   }
  }

  handleAdd = async () => {
    console.log("Add");
    const newPost = {title: 'foo', body: 'bar',userId: 1};
    let {data:post} = await http.post(config.apiEndpoint,newPost)
    const posts = [post, ...this.state.posts]
    this.setState({posts})
  
  };

  handleUpdate = async post => {
    const originalState = this.state.posts
    const posts = this.state.posts

    const index = _.findIndex(posts, item => 
      item.id === post.id)
    posts[index] = post
    this.setState({posts})
    post.title = "nkckjkscsx"
    try{
    await http.put(`${config.apiEndpoint}/${post.id}`, post);    
    }
    catch(ex)
    {
      
      if(ex.response && ex.response.status === 404 )
      {
        alert("This post does not exist")
      }
      
      this.setState({posts: originalState})
    }

  };

  handleDelete = async post => {
    console.log("Delete", post);

    await http.delete(`${config.apiEndpoint}/${post.id}`)
    const posts = this.state.posts;
    const index = _.findIndex(posts, item => 
      item.id === post.id
    )
    alert(index)
    _.pullAt(posts, index);
    this.setState({posts})
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
