import React,{useState} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

const Main =(props)=>{


  let [dishes]=useState(DISHES);
  let [selectedDish,setselectedDish]=useState(null);


  function onDishSelect(dishId){
    setselectedDish(dishId);
  }

    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={dishes} onClick={(dishId) => onDishSelect(dishId)} />
        <DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)[0]}/>
      </div>
    );

}

export default Main;
