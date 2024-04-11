import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import MessageToast from "./MessageToast";
import { TODO_REDUCERES } from "../redux/constant";
import { useSelector, useDispatch } from "react-redux";
import routes, { backed_urls } from "../routes";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosclient";

function TodoForm() {
  const isForm = useSelector((state) => state.todo.isForm);
  const todoData = useSelector((state) => state.todo.todoData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("todoData ====>", todoData);

  const [title, setTitle] = useState("");
  const [desprition, setDesprition] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (todoData?.todo) {
      setTitle(todoData?.todo);
    }
    if (todoData?.description) {
      setDesprition(todoData?.description);
    }
  }, [todoData]);

  const handleClose = () => {
    setDisable(false);
    dispatch({ type: TODO_REDUCERES.IS_FORM });
    dispatch({ type: TODO_REDUCERES.TODO_DATA, payload: {} });
  };
  const handleShow = () => dispatch({ type: TODO_REDUCERES.IS_FORM });

  const handleSave = async () => {
    setDisable(true);

    const tit = title;
    if (tit.length == 0) {
      setShowToast(true);
      return;
    }

    const user = localStorage.getItem("@user");

    if (user) {
      if (todoData?.isNew) {
        await axiosClient
          .post(backed_urls.createTodo, {
            user_id: user,
            todo: tit,
            description: desprition,
          })
          .then((data) => {
            console.log("data ===>", data);
            // setDisable(false);
          })
          .catch((err) => {
            // setDisable(false);
            handleClose();
            console.log("err ===>", err);
          });
      } else {
        await axiosClient
          .put(backed_urls.updateTodo + todoData?.todo_id + "/", {
            // "user_id":1,
            todo: tit,
            description: desprition,
            // "status":"in-progress"
          })
          .then((data) => {
            console.log("updateed todo =====>", data);
          })
          .catch((err) => {
            console.log("err in updating todo ===>", err);
          });
      }

       await axiosClient
        .post(backed_urls.getToods, {
          user_id: user,
        })
        .then((data) => {
          console.log('data ======>', data)
          dispatch({ type: TODO_REDUCERES.TODOS, payload: data.data.todos });
          handleClose();
        })
        .catch((err) => {
          console.log("err ===>", err);
          handleClose();
        });
    } else {
      navigate(routes.login);
    }
  };

  return (
    <div>
      <Modal show={isForm} onHide={handleClose} centered>
        <MessageToast show={showToast} setShow={setShowToast} />
        <Modal.Header closeButton>
          <Modal.Title>{todoData?.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title of todo"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                autoFocus
                required
                disabled={disable}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Desprition</Form.Label>
              <Form.Control
                type="text"
                placeholder="Desprition of todo"
                value={desprition}
                onChange={(e) => setDesprition(e.target.value)}
                disabled={disable}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={disable}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={disable}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TodoForm;
