import React,{useState} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';
const Main =(props)=>{


  let [dishes]=useState(DISHES);
  let [comments]=useState(COMMENTS);
  let [promotions]=useState(PROMOTIONS);
  let [leaders]=useState(LEADERS);
  let [selectedDish,setselectedDish]=useState(null);

  const HomePage = () => {
     return(
       <Home
           dish={dishes.filter((dish) => dish.featured)[0]}
           promotion={promotions.filter((promo) => promo.featured)[0]}
           leader={leaders.filter((leader) => leader.featured)[0]}
       />
     );
   }
   const DishWithId = ({match}) => {
     return(
         <DishDetail dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
           comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
     );
   };
  function onDishSelect(dishId){
    setselectedDish(dishId);
  }

    return (

      <div>
        <Header/>
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={dishes} onClick={(dishId) => onDishSelect(dishId)}/>}/>
            <Route exact path='/contactus' component={Contact} />
            <Route exact path='/aboutus' component={()=><About leaders={leaders} />}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );

}

export default Main;
