import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import MyEditForm from "./MyEditForm";
export class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
        };
      }
    
      handleClose = () => {
        this.setState({
          show: false,
        });
      };
    
      handleShow = () => {
        this.setState({
          show: true,
        });
      };
  render() {
    return (
        <>
        <MyEditForm  editBook={this.props.editBook}    handleShow={this.handleShow}
          handleClose={this.handleClose}
          show={this.state.show}
          book={this.props.ele}
          updateBooks={this.props.updateBooks}
          index={this.props.index}/>
      <Card style={{ width: "18rem", margin: "20px" , display :'inline-block' }}>
        <Card.Img
          style={{ width: "18rem" }}
          variant="top"
          src={this.props.ele.img}
        />
        <Card.Body style={{ height: "12rem", overflowY: "auto" }}>
          <Card.Title>{this.props.ele.name}</Card.Title>
          <Card.Text>{this.props.ele.description}</Card.Text>
        </Card.Body>
        <Button
          onClick={() => this.props.removeBooks(this.props.index)}
          variant="danger"
        >
          Remove
        </Button>  <Button
          onClick={this.handleShow}
          variant="info"
        >
          Update
        </Button>
      </Card>
      </>
    );
  }
}

export default Books;