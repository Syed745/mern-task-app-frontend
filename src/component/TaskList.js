import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Task from './Task'
import TaskForm from './TaskForm'
import axios from 'axios'
import loadingImg from '../assets/loader.gif'
import { isEditable } from '@testing-library/user-event/dist/utils'
import { get } from 'mongoose'

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [taskId, setTaskId] = useState('')

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  })
  const { name } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getTasks = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get("http://localhost:5000/api/task")
      setTasks(data)
      console.log(tasks)
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTasks()
  }, []);

  const createTask = async (e) => {
    e.preventDefault()
    if (name === "") {
      return toast.error("Invalid Input Field")
    }
    try {
      await axios.post('http://localhost:5000/api/task', formData)
      toast.success("Task added successfully")
      setFormData({ ...formData, name: "" })
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/${id}`)
      getTasks()
    } catch (error) {

    }
  }

  const getSingletask = async (task) => {
    setFormData({ name: task.name, completed: false })
    setTaskId(task._id)
    setIsEditing(true)
  }

  const updateTask = async (e) => {
e.preventDefault()
if(name === "") {
  return toast.error("Input Field cannot be empty")
}
try {
  await axios.put(`http://localhost:5000/api/task/${taskId}` , formData)
  setFormData({ ...formData, name:""})
  setIsEditing(false)
  getTasks()
} catch (error) {
  toast.error(error.message);
}
  }

  const setCompleteTask = async (task) => {
    const newFormData={
name : task.name,
completed: true
}
try {
  await axios.put(`http://localhost:5000/api/task/${task._id}`,
   newFormData)
  getTasks()
} catch (error) {
  toast.error(error.message);
}
  }

  return (
    <div>
      <h2> Task Manager </h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b> 0
        </p>
      </div>
      <hr />
      {
        isLoading && (
          <div className="--flex-center">
            <img src={loadingImg} alt="Loading..." />
          </div>
        )}
      {
        !isLoading && tasks.length === 0 ? (
          <p className='--py'>
            No Task Added please Added task
          </p>
        ) : (
          <>
            {
              tasks.map((task, index) => {
                return <Task
                  key={task._id}
                  task={task}
                  index={index}
                  deleteTask={deleteTask}
                  getSingletask={getSingletask} 
                  setCompleteTask={setCompleteTask}
                  />
              })}
          </>
        )}
    </div>
  )
}
