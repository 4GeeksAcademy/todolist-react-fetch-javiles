import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import Swal from "sweetalert2";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);


useEffect (() => {
    createUser();
    takeList();
},[])

useEffect(()=> {
    sendList();

},[todos])

const createUser = async () =>{
    try {
        const response = await fetch ("https://playground.4geeks.com/todo/users/fulano",{
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(!response.ok){
            throw console.error(response.statusText);
        }

        const transform = await response.json();
        console.log(transform.msg)
        return transform;
     }
     catch(e){console.log("error", e)}
}

const takeList = async () =>{
    try{
        const previewResponse = await fetch ("https://playground.4geeks.com/todo/users/fulano");

        if(!previewResponse.ok){
            throw error(previewResponse.statusText);
        }

        const transform = await previewResponse.json();
        setTodos(transform.todos);
    }

    catch(e){console.log("error", e)}
}



const sendList = async (payLoad) =>{
    try {
        const response = await fetch ("https://playground.4geeks.com/todo/todos/fulano",{
            method: "POST",
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(!response.ok){
            throw console.error(response.statusText);
        }

        const transform = await response.json();
        console.log(transform.msg)
        return transform;
     }
     catch(e){console.log("error", e)}
}

const pressEnter = async (e) => {
    try{
        if (e.key==="Enter" & inputValue !== ""){
            let newTask = {
                label:inputValue,
                done:false,
            };
            setInputValue("");
            const final = await sendList(newTask);
            takeList();
            console.log("informacion enviada", final)
        }
    }
    catch(e){console.log("error", e)}
} 

const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Completaste la tarea?",
      showDenyButton: true,
      confirmButtonText: `Si, Listo`,
      denyButtonText: `No, aun no`,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter((item) => item.id !== id);
        setTodos(updatedTodos);
      }
    });
  };

  async function deleteAndRecreateUser() {
    try {
   
      const deleteResponse = await fetch('https://playground.4geeks.com/todo/users/fulano', {
        method: 'DELETE',
      });
  
      if (!deleteResponse.ok) {
        throw new Error('Error al borrar el usuario');
      }
  
      console.log('Usuario borrado con éxito');
  

      const createResponse = await fetch('https://playground.4geeks.com/todo/users/fulano', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: 'Nuevo Usuario',
          email: 'nuevo@usuario.com',
        }),
      });
  
      if (!createResponse.ok) {
        throw new Error('Error al crear el usuario');
      }
  
      console.log('Usuario creado con éxito');
      window.location.reload();
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  }

  

    return (

<div className="container">
<div className="cont">
      <h1 className="title">To do List</h1>
      <div className="bac-list">
        <ul className="list-group list-group-flush">
          <input
            className="custom-input"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => pressEnter(e)}
            placeholder="+Nueva Tarea"
          />
          {todos.map((item) => (
            <div className="li-cont" key={item.id}>
              <li className="list-group-item li-c">
                {item.label}
  
              </li>
            </div>
          ))}
        </ul>
      </div>
      <p className="items">Tienes {todos.length} tareas pendientes</p>
      <div className="d-flex justify-content-center">
      <button type="button" className="btn btn-danger" onClick={deleteAndRecreateUser}>Borrar Tareas</button>
      </div>
    </div>
    </div>
    );
};

export default Home;
