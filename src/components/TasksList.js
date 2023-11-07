import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, sortTask } from '../store';
import AddTask from './AddTask';
import {Button} from 'react-bootstrap';


function TaskList(props) {

  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState();
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [displayModal, setDisplayModal] = useState(false);
  const [newId, setNewId] = useState(0);
  const [editTask, setEditTask] = useState();
  const [field, setField] = useState("");
  
  const handleSelectRow = (index) => {
    setSelectedRow(index);
  };

  const openModal = () => {
    setDisplayModal(!displayModal)
  };

  const closeModal = () => {
    setDisplayModal(!displayModal);
    setNewId(null);
    setEditTask(null);
  };

  const taskList = useSelector((state)=>{
    return state.tasks;
  });

  const handleAdd = () => {
    setNewId(taskList.data.length ? Math.max.apply(Math, taskList.data.map(function(task) { return task.id; }))  + 1 : 1);
    openModal();
  };

  const handleEdit = () => {
    var data = taskList.data.find(task => {
      return task.id === selectedTaskId
    })
    setEditTask(data);
    openModal();
  };

  const handleDelete = () => {
    dispatch(removeTask(selectedTaskId));
    setSelectedRow(null);
    setSelectedTaskId(null);
  };

  const handleSort = (e) => {
    setField(e.target.value);
    dispatch(sortTask({ field: e.target.value }));
  };

  function renderedTasks() {
    return taskList.data.map((task, index) => {
      return (
        <tr 
          key= {task.id} 
          className = { (index === selectedRow ? "border border-dark fw-bold " : "")  + (task.status === 'Completed' ? "table-success" : "table-danger")}
          onClick = {() => {
            handleSelectRow(index)
            setSelectedTaskId(task.id)
          }}
        >
          {/* <td>{task.id}</td> */}
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.status}</td>
          <td>{task.creationDate}</td>
        </tr>
      )
    })
  }

  return (
    <div className="m-5">    

      <div className="">
        <label>Sort by</label>
        <select className="m-2" value={field} onChange={handleSort}>
          <option value="">Select an Option</option>
          <option value="status">Status</option>
          <option value="created_at">Created date</option>
        </select>
      </div>  

      <table className="table">
        <thead>
          <tr className="border">
          {/* <th scope="col">ID</th> */}
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
        disabled={selectedTaskId > 0 ? false : true}
        onClick={handleEdit}>
        Edit Task
      </Button>

      <Button variant="primary" className="mr-2"
        disabled={selectedTaskId > 0 ? false : true}
        onClick={handleDelete}>
        Remove Task
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