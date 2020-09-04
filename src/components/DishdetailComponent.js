import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    const RenderComments=({comments})=> {
           return(
               <div>
                 <h4>Comments</h4>

                 {
                   comments.map((comment)=>{
                       return(
                         <ul className="list-unstyled" key={comment.id}>
                           <li>{comment.comment}</li>
                           <li>--{comment.author},{comment.date}</li>
                         </ul>
                       );
                   })
                 }
               </div>
           );


   }
    const RenderDish=({dish})=> {
           return(
               <Card>
                   <CardImg top src={dish.image} alt={dish.name} />
                   <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
           );

   }
const  DishDetail = (props) => {
  if (props.dish != null)
    return(
      <div className="container">
        <div className="row">
          <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div  className="col-12 col-md-5 m-1" >
            <RenderDish dish={props.dish} />
          </div>
          <div  className="col-12 col-md-5 m-1" >
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  else
        return(
            <div></div>
        );

}

export default DishDetail;
