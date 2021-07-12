import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {

constructor(props){
  super(props)

  this.state = {
    book:null,
     
  };
};

componentDidMount(){
  axios
    .get(`http://localhost:3002/books?email=${this.props.auth0.user.email}`)
    .then((results) => {
      console.log(results.length);
      this.setState({
        book: results.data.map((element) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                style={{ width: "18rem" }}
                variant="top"
                src={element.img}
              />
              <Card.Body>
                <Card.Title>{element.name}</Card.Title>
                <Card.Text>{element.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        }),
      });
    });
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books

        
        </p>
        <>{this.state.books}</>
        
      </Jumbotron>
    );
  }
}

export default MyFavoriteBooks;
