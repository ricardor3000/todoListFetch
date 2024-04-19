import { useEffect, useState } from 'react'

//import './App.css'

function App() {

  let [textInput, updateTextInput] = useState("");
  let [todoList, updateTodoList] = useState([]);
  let [userName, updateUserName] = useState("juanito")

  useEffect(() => {
    createUser(userName);
    getUserTodoList();
  }, []);

  function handleInputOnChange(evento){
    updateTextInput(evento.target.value);
  }

  function handleCreateTaskOnClick(evento){
    createTodo();
  }

  function handleCreateTaskOnKeyDown(evento){

    if(evento.key === "Enter"){
      createTodo();
    }
  }

  function handleUpdateTaskOnClick(index, done){
    todoList[index].done = !done;
    fetch("https://playground.4geeks.com/apis/fake/todos/user/" + userName, {
      method: "PUT",
      body: JSON.stringify(todoList),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response)=> {
      return response.json();
    })
    .then((data)=> {
      console.log(data) //  {"msg": "2 tasks were updated successfully"}
      getUserTodoList();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function createUser(name){
    fetch("https://playground.4geeks.com/apis/fake/todos/user/" + name, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
        }
      })
      .then((response)=> {
        return response.json();
      })
      .then((data)=> {
        console.log(data) // { "msg": "The user usuario1 has been created successfully"}
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUserTodoList(){
    fetch("https://playground.4geeks.com/apis/fake/todos/user/" + userName)
      .then((response)=> {
        return response.json()
      })
      .then((data)=> {
        console.log(data); 
        updateTodoList(data);
        /**
         * {
            "done": false,
            "id": "ff17716612c64e7b97a6ebd5591a324f",
            "label": "example task"
          }
         */
      })
      .catch((error)=> {
        console.log(error);
      });
  }

  function createTodo(){
    let nuevoArray = Array.from(todoList);
    nuevoArray.push(
      {
        done: false,
        label: textInput
      }
    );
    fetch("https://playground.4geeks.com/apis/fake/todos/user/" + userName, {
      method: "PUT",
      body: JSON.stringify(nuevoArray),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response)=> {
      return response.json();
    })
    .then((data)=> {
      console.log(data) //  {"msg": "2 tasks were updated successfully"}
      getUserTodoList();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <h1>Todo list</h1>
      <input type="text" onChange={handleInputOnChange} onKeyDown={handleCreateTaskOnKeyDown}/>
      <button onClick={handleCreateTaskOnClick}>Agregar tarea</button>
      <ul>
          { 
            todoList.map((item, index)=> {
              let style = {}
              
              if(item.done === true){
                style = {textDecoration:"line-through" }
              }

              return <li style={style} key={index}>{item.label} <button onClick={()=> handleUpdateTaskOnClick(index, item.done)}>Marcar</button></li>
            })
          }
      </ul>
    </>
  )
}

export default App