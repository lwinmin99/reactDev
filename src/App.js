import React, { Component }  from 'react';
import Menu from './components/MenuComponent';
import {Navbar,NavbarBrand} from 'reactstrap';
import { DISHES } from './shared/dishes';
import './App.css';
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES
    };
  }
  render(){
    return(
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Restaurants</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />

      </div>
    )

  }


}

export default App;
