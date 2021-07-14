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
  updateBooks = (results)=>{


    this.setState({ 
      books: results.data.map((element,index) => {
        return <Books  index={index} removeBooks={this.removeBooks} ele={element} />;
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
            return <Books index={index} removeBooks={this.removeBooks} ele={element} />;
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
            return <Books index={index} removeBooks={this.removeBooks} ele={element} />;
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
        <>{this.state.books}</>
        <MyForm updateBooks={this.updateBooks} removeBooks={this.removeBooks} />
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
