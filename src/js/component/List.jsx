import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const List = () => {
    const [task, setTask] = useState("")
    const [listTask, setListTask] = useState([])
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {

            postTask();
            setTask("");


        }
    }
    const createProfile = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/fulano', {
                method: "POST"
            })
            if (response.status == 400) {
                console.log("User alredy exists")
                return
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    const getTasks = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/fulano')
            if (response.status == 404) {
                console.log("User not found, creating user 😎")
                await createProfile()
                getTasks()
                return
            }
            const responseBody = await response.json()
            console.log(responseBody.todos)
            setListTask(responseBody.todos)
            
        } catch (error) {
            console.log(error)
        }
    }

    

    useEffect(() => {
        getTasks();
    }, [])

    const postTask = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/fulano', {
                method: "POST",
                body: JSON.stringify({
                    "label": task,
                    "is_done": false
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseBody = await response.json()
            console.log(responseBody)
            getTasks()
        } catch (error) {
            console.log(error)
        }

    }
    const deleteTask = async (taskId) => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/' + taskId, {
                method: "DELETE"
            }

            )
            getTasks()
        } catch (error) {
            console.log(error)
        }
    }
    const deleteAllTasks = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/fulano', {
                method: "DELETE"
            })
            await createProfile();
            getTasks();

        } catch (error) {
            console.log(error)
        }

    }
    return (
    
        <div className='container d-flex flex-column align-items-center'>
            <div></div>
            <div>
                <h1> Todo List </h1>
            </div>
            <div className='containerList'>
                <input type="text" placeholder='What needs to be done?' onKeyDown={handleKeyDown} value={task} onChange={e => setTask(e.target.value)} />
                <div className='listTasks'>
                    {listTask.length ? listTask.map((value, index) => (<div className='individualTask' key={index}>  {value.label} <button className='deleteButton' onClick={() => deleteTask(value.id)}> X </button> </div>)) : <span>No tasks, add a task</span>}

                </div>
                <div>
                    {listTask.length} <span> item left </span>
                </div>
            </div>
            <div>
                <div></div>
                <div></div>
            </div>

            <div>
                <button className="deleteAll" onClick={() => deleteAllTasks()}> <FontAwesomeIcon icon={faTrash} /> &nbsp; Delete all </button>
            </div>
        </div>
   
    )
}

export default List;