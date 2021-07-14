import React from "react";
import Header from "./Header";
// import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./User";
import Profile from "./Profile";
import axios from "axios";
import { Card } from "react-bootstrap";
// import Books from './Books'
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       Books:[],
      //  showBookscomponent:false,
       server: process.env.REACT_APP_SERVER_URL

    }
  }
  // getBooks = async (event)=>{
  //   // event.preventDefault();
  //   try{
  //     //  const ownerName = event.target.BookOwner.value;
  //      const Books = await axios.get(`${this.state.server}/books?inputEmail=${this.props.auth0.user.email}`);
       
  //      this.state({
  //        Books: Books.data,
  //       //  showBookscomponent:true
  //      });

  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // }
  
  render() {
    console.log("app", this.props);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              <User />
            </Route>
            <Route exact path="/Profile">
              {" "}
              <Profile />{" "}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
          <Card getBooks={this.getBooks}/>
          {/* </IsLoadingAndError> */}
        </Router>
        {/* books={this.state.books}
        showBookscomponent={this.state.showBookscomponent} */}
      </>
    );
  }
}

export default withAuth0(App);
