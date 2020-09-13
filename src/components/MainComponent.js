import React,{useState,useEffect} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment,fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({

  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())}
});
const Main =(props)=>{
  let [setselectedDish]=useState(null);
  useEffect(()=>{
    props.fetchDishes();
  },[]);
  const HomePage = () => {
     return(
       <Home
           dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
           dishesLoading={props.dishes.isLoading}
           dishesErrMess={props.dishes.errMess}
           promotion={props.promotions.filter((promo) => promo.featured)[0]}
           leader={props.leaders.filter((leader) => leader.featured)[0]}
       />
     );
   }
   const DishWithId = ({match}) => {
     return(
         <DishDetail dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
           dishesLoading={props.dishes.isLoading}
           dishesErrMess={props.dishes.errMess}
           comments={props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
           addComment={addComment} />
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
            <Route exact path='/menu' component={() => <Menu dishes={props.dishes} onClick={(dishId) => onDishSelect(dishId)}/>}/>
            <Route exact path='/contactus' component={Contact} />
            <Route exact path='/aboutus' component={()=><About leaders={props.leaders} />}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
