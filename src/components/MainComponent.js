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
import { postComment,postFeedback,fetchDishes, fetchComments, fetchPromos,fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders:()=> dispatch(fetchLeaders()),
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
});
const Main =(props)=>{
  let [setselectedDish]=useState(null);
  useEffect(()=>{
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();

  },[]);
  const HomePage = () => {
     return(
       <Home
           dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
           dishesLoading={props.dishes.isLoading}
           dishesErrMess={props.dishes.errMess}
           promotion={props.promotions.promotions.filter((promo) => promo.featured)[0]}
           promoLoading={props.promotions.isLoading}
           promoErrMess={props.promotions.errMess}
           leader={props.leaders.leaders.filter((leader) => leader.featured)[0]}
           leaderLoading={props.leaders.isLoading}
           leaderErrMess={props.leaders.errMess}
       />

     );
   }
   const DishWithId = ({match}) => {
     return(

                 <DishDetail dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                   isLoading={props.dishes.isLoading}
                   errMess={props.dishes.errMess}
                   comments={props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                   commentsErrMess={props.comments.errMess}
                   postComment={props.postComment}
                 />
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
            <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={props.resetFeedbackForm} postFeedback={props.postFeedback}/>} />
            <Route exact path='/aboutus' component={()=><About leaders={props.leaders} />}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
