import React from 'react';
import { Card, CardImg,CardText, CardBody,
    CardTitle } from 'reactstrap';
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

      <div className="row">
        <div  className="col-12 col-md-5 m-1" >
          <RenderDish dish={props.dish} />
        </div>
        <div  className="col-12 col-md-5 m-1" >
          <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    );
  else
        return(
            <div></div>
        );

}

export default DishDetail;
