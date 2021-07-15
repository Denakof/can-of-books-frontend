import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import { Card } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import Books from "./Books";
import MyForm from "./MyForm";
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: null,
    };
  }
editBook =(index,bookObj)=>{
  axios
  .post(
    `${process.env.REACT_APP_SERVER_URL}/updateBook/${index}?inputEmail=${this.props.auth0.user.email}`,
    bookObj
  )
  .then((resultData) => {
    this.updateBooks(resultData);
  });
}

  updateBooks = (results)=>{


    this.setState({ 
      books: results.data.map((element,index) => {
        return <Books editBook={this.editBook} updateBooks={this.updateBooks} index={index} removeBooks={this.removeBooks} ele={element} />;
      }),
    });
  
  }

  removeBooks = (index) => {
    axios
      .delete(
        `http://localhost:3001/deleteBook/${index}?inputEmail=${this.props.auth0.user.email}`
      )
      .then((results) => {
        console.log(results.data);
        this.setState({
          books: results.data.map((element,index) => {
            return <Books editBook={this.editBook}  updateBooks={this.updateBooks}  index={index} removeBooks={this.removeBooks} ele={element} />;
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    axios
      .get(
        `http://localhost:3001/books?inputEmail=${this.props.auth0.user.email}`
      )
      .then((results) => {
        console.log(results.data);
        this.setState({
          books: results.data.map((element,index) => {
            return <Books editBook={this.editBook}  updateBooks={this.updateBooks}  index={index} removeBooks={this.removeBooks} ele={element} />;
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <MyForm updateBooks={this.updateBooks} removeBooks={this.removeBooks} />
        <br></br>
        <>{this.state.books}</>
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
