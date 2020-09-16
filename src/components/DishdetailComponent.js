import React ,{useState} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem,Button,Modal, ModalHeader, ModalBody,
   Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control,LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


    const RenderComments=({comments, postComment, dishId})=> {


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
                 <CommentForm dishId={dishId} postComment={postComment} />
               </div>
           );


   }
    const RenderDish=({dish})=> {

           return(
               <Card>
                   <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                   <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
           );

   }
    const CommentForm= props=>{
      let [isModalOpen,setIsModalOpen]=useState(false);
      const required = (val) => val && val.length;
      const maxLength = (len) => (val) => !(val) || (val.length <= len);
      const minLength = (len) => (val) => val && (val.length >= len);
      const toggleModal = () => setIsModalOpen(!isModalOpen);
      function handleSubmit(values) {
          toggleModal();
          props.postComment(props.dishId, values.rating, values.author, values.comment);
          console.log('Current State is: ' + JSON.stringify(values));
          alert('Current State is: ' + JSON.stringify(values));
      }
      return(
        <React.Fragment>
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="container">
              <LocalForm onSubmit={(values) => handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" name="rating"
                        className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>

                    </Control.select>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="author">Your Name</Label>
                    <Control.text model=".author" id="author" name="author"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                             />
                    <Errors
                             className="text-danger"
                             model=".author"
                             show="touched"
                             messages={{
                               required: 'Required',
                               minLength: 'Must be greater than 2 characters',
                               maxLength: 'Must be 15 characters or less'
                             }}
                             />
                </Row>
                <Row className="form-group">
                    <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="6"
                            className="form-control" />
                </Row>
                <Row className="form-group">
                        <Button type="submit" color="primary">
                        Submit
                        </Button>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
          <Button type="button" outline color="secondary" className="fa fa-pencil fa-sm" onClick={toggleModal}>Submit Comment</Button>
        </React.Fragment>
      );
    }
const  DishDetail = (props) => {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }

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
            <RenderComments comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
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
