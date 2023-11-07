import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, modifyTask } from '../store';
import {Button, Modal, Form, Check} from 'react-bootstrap';


function AddTask(props) {
  const displayModal = props.displayModal;
  const closeModal = props.closeModal;
  const newTaskId = props.newTaskId;
  const editTask = props.editTask;

  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: editTask ? editTask.title : "", 
    description: editTask ? editTask.description : "",
    status: editTask && editTask.status === 'Completed' ? true : false,
  });

  useEffect(() => {
    //console.log("editTask", editTask)
  }, []);

  const onChangeHandler = event => {
    const newField = {name: event.target.name, value: event.target.value};
    setNewTask((prevState) => ({
      ...prevState,
      [newField.name]: event.target.value,
    }));
 };

  const handleTaskAdd = () => {
    const task = {
      "id": newTaskId,
      "title": newTask.title, 
      "description": newTask.description,
      "status": "Pending",
      "creationDate": new Date().toISOString().slice(0, 10)
    }
    dispatch(addTask(task));
    closeModal();
  };

  const handleTaskEdit = () => {
    const task = {
      "id": editTask.id,
      "title": newTask.title, 
      "description": newTask.description,
      "status": newTask.status ? 'Completed' : 'Pending',
      "creationDate": new Date().toISOString().slice(0, 10)
    }
    dispatch(modifyTask(task));
    closeModal();
  };


  return (
    <Modal show={displayModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{newTaskId > 0 ? 'Add task' : 'Edit task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="form-group">
            <label htmlFor="inputTitle">Title</label>
            <input 
              type="text" 
              id="inputTitle" 
              name= "title"
              placeholder="Enter title" 
              className="form-control" 
              onChange={onChangeHandler} 
              value={newTask.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputDescription">Description</label>
            <input 
              type="text" 
              id="inputDescription"
              name= "description"
              placeholder="Enter description"
              className="form-control"  
              onChange={onChangeHandler}
              value={newTask.description}
            />
          </div>
          <Form.Check
            className="m-2"
            type="switch"
            id="completed-switch"
            label= {newTask.status ? "Completed" : "Pending"}
            name="status"
            disabled={newTaskId ? true : false}
            checked={newTask.status}
            onChange={()=>{
              setNewTask((prevState) => ({
                ...prevState,
                status: !newTask.status,
              }));
            }}
          />
        </Form> 
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>{
          newTaskId  ? handleTaskAdd() : handleTaskEdit();
        }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );    
}

export default AddTask;