import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import MessageToast from "./MessageToast";
import { TODO_REDUCERES } from "../redux/constant";
import { useSelector, useDispatch } from "react-redux";
import routes, { backed_urls } from "../routes";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosclient";

function Confimation({ show, setShow, id }) {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch()

  const handleClose = () => setShow(false);

  const handleSave = () => {
    setDisable(true);

    const user = localStorage.getItem('@user')

    axiosClient
      .delete(backed_urls.deleteTodo + id)
      .then((data) => {
        axiosClient
          .post(backed_urls.getToods, {
            user_id: user,
          })
          .then((data) => {
            dispatch({ type: TODO_REDUCERES.TODOS, payload: data.data.todos });
            setDisable(false);
    setShow(false);
        
        })
          .catch((err) => {
            console.log("err ===>", err);
    setShow(false);
          
        });
      })
      .catch((err) => {
        alert("err in deleteing todo");
        console.log("err in deleteing todo");
        setDisable(false);
        setShow(false);  
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Are you Sure?</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={disable}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSave} disabled={disable}>
          Delete Todo
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confimation;
