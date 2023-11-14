import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, resetTask, sortTask } from '../store';
import AddTask from './AddTask';
import {Button} from 'react-bootstrap';
import { Task } from '../types/Task';
import axios from "axios";

function TaskList(props: any) {

  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState();
  const [selectedTaskId, setSelectedTaskId] = useState(-1);
  const [displayModal, setDisplayModal] = useState(false);
  const [newId, setNewId] = useState(0);
  const [editTask, setEditTask] = useState();
  const [field, setField] = useState("");

  const [rowNumber, setRowNumber] = useState(0);
  
  const handleSelectRow = (index: any) => {
    setSelectedRow(index);
  };

  const openModal = () => {
    setDisplayModal(!displayModal)
  };

  const handlePostRequest = () => {

    let data = taskList.data.slice(0, rowNumber);

    axios.post("http://localhost:3000/", data).then((response) => {
      console.log(response.status, response.data);
    });
  }

  const closeModal = () => {
    setDisplayModal(!displayModal);
    setNewId(0);
    setEditTask(undefined);
  };

  const taskList: any = useSelector((state: any)=>{
    return state.tasks;
  });

  const handleAdd = () => {
    setNewId(taskList.data.length ? Math.max.apply(Math, taskList.data.map(function(task: any) { return task.id; }))  + 1 : 1);
    openModal();
  };

  const handleRowChange = (e: any) => {
    console.log(e.target);
    setRowNumber(parseInt(e.target.value));
  }

  const handleEdit:any = (taskId: number) => {
    const id = taskId >  0 ? taskId : selectedTaskId;
    var data = taskList.data.find((task:Task) => {
      return task.id === id
    })
    setEditTask(data);
    openModal();
  };

  const handleDelete: any = (taskId: number) => {
    const id = taskId > 0 ? taskId : selectedTaskId;
    dispatch(removeTask(id));
    setSelectedRow(undefined);
    setSelectedTaskId(-1);
  };

  const handleReset = () => {
    dispatch(resetTask(null));
    setSelectedRow(undefined);
    setSelectedTaskId(-1);
  };

  const handleSort = (e: any) => {
    setField(e.target.value);
    dispatch(sortTask({ field: e.target.value }));
  };

  function renderedTasks() {
    return taskList.data.map((task: Task, index: number) => {
      return (
        <tr 
          key= {task.id} 
          className = { (index === selectedRow ? "border border-dark fw-bold " : "")  + (task.status === 'Completed' ? "table-success" : "table-danger")}
          onClick = {(e: any) => {
            handleSelectRow(index)
            if(e.target.name !== "btnDelete") {
              setSelectedTaskId(task.id);
            }
          }}
        >
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.status}</td>
          <td>{task.creationDate}</td>
          <td>
            <button
              type="button"
              className="btn btn-warning mx-1"
              onClick={() => handleEdit(task.id)}
            >
              Edit
            </button>
            <button
              type="button"
              name="btnDelete"
              className="btn btn-danger"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="m-5 flex justify-content-center align-self-center">    

      <div className="">
        <label>Sort by</label>
        <select className="m-2" value={field} onChange={handleSort}>
          <option hidden value="">Select an Option</option>
          <option value="status">Status</option>
          <option value="created_at">Created date</option>
        </select>
      </div>  

      <table className="table">
        <thead>
          <tr className="border">
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {renderedTasks()}
        </tbody>
      </table>

      <Button variant="primary" className="mr-2"
        onClick={handleAdd}>
        Add New Task
      </Button>

      <Button variant="primary" className="m-2"
        disabled={selectedTaskId > -1 ? false : true}
        onClick={handleEdit}>
        Edit Task
      </Button>

      <Button variant="primary" className="mr-2"
        disabled={selectedTaskId > -1 ? false : true}
        onClick={handleDelete}>
        Remove Task
      </Button>

      <Button variant="primary" className="m-2"
        onClick={handleReset}>
        Reset Tasks
      </Button>

      <hr></hr>
      <label htmlFor="inputDescription">Rows number</label>
      <input 
        type="number" 
        id="inputDescription"
        name= "description"
        placeholder="Enter description"
        className="form-control"  
        maxLength= {50}
        onChange={handleRowChange}
        value={rowNumber}
      />
      
      <Button variant="primary" className="mr-2"
        onClick={handlePostRequest}>
        Post
      </Button>

      {displayModal && (
        <AddTask
          displayModal={displayModal}
          closeModal={closeModal}
          newTaskId={newId}
          editTask={editTask}
        />
      )}
    </div>
  );    
}

export default TaskList;