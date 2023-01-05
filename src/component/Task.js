import React from 'react';
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa"

const Task = ({ task, index, deleteTask, getSingletask, setCompleteTask }) => {
    return (
        <div className={task.completed?"task completed":"task"}>

            <p>
                <b>{index + 1}.</b> {task.name}
            </p>
            <div className="task-icons">
                <FaCheckDouble color='green' onClick={() => setCompleteTask(task)} />
                <FaEdit color='purple' onClick={() => getSingletask(task)} />
                <FaRegTrashAlt color='red' onClick={() => deleteTask(task._id)} />
            </div>
        </div>
    )
}

export default Task
