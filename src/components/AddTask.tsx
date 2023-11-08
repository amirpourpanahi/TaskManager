import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, modifyTask } from '../store';
import {Button, Modal, Form} from 'react-bootstrap';

function AddTask(props: any) {
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

  const onChangeHandler = (event: any) => {
    const newField = {name: event.target.name, value: event.target.value};
    setNewTask((prevState) => ({
      ...prevState,
      [newField.name]: event.target.value,
    }));
 };

  const handleTaskAdd = () => {
    const task: any = {
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
    const task: any = {
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
            <label htmlFor="inputTitle">Title
              <span className="text-danger">{newTask.title === "" ? " (Required)" : ""}</span>
            </label>           
            <input 
              type="text" 
              id="inputTitle" 
              name= "title"
              placeholder="Enter title" 
              className="form-control" 
              maxLength= {20}
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
              maxLength= {50}
              onChange={onChangeHandler}
              value={newTask.description}
            />
          </div>
          {!newTaskId && 
            <Form.Check
              className="m-2"
              type="switch"
              id="completed-switch"
              label= {newTask.status ? "Completed" : "Pending"}
              name="status"
              checked={newTask.status}
              onChange={()=>{
                setNewTask((prevState) => ({
                  ...prevState,
                  status: !newTask.status,
                }));
              }}
            />
          }
        </Form> 
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" 
          disabled={newTask.title === "" ? true : false}
          onClick={()=>{
            newTaskId  ? handleTaskAdd() : handleTaskEdit();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );    
}

export default AddTask;