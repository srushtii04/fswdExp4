import React,{useState,useEffect} from'react';
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

export default function Todo() {
    const[isCompleteScreen,setIscompleteScreen] = useState(false);
    const[allTodos,setallTodos]=useState([]);
    const[newTitle,setnewTitle]=useState("");
    const[newDescription,setnewDescription]=useState("");
    const[completedTodos,setcompletedTodos]=useState([]);

    const handleAddTodo = ()=>{
        let newTodoItem ={
            title:newTitle,
            description:newDescription
        }

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setallTodos(updatedTodoArr);
        localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
    };
    
    const handleDeleteTodo = (index) =>{
        let reducedTodo=[...allTodos];
        reducedTodo.splice(index,1);
        setallTodos(reducedTodo);
        localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    }

    const handleComplete = (index) =>{
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();

        let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

        let filteredItem  = {
            ...allTodos[index],
            completedOn:completedOn   
        }

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setcompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);
        localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
    }

    const handleDeleteCompletedTodo = (index) =>{
        let reducedTodo=[...completedTodos];
        reducedTodo.splice(index,1);
        setcompletedTodos(reducedTodo);
        localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    }

    useEffect(()=>{
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
        if(savedTodo){
            setallTodos(savedTodo);
        }
        if(savedCompletedTodo){
            setcompletedTodos(savedCompletedTodo);
        }
    },[]);

    return(
        <div className="todo-wrapper">
            <div className="todo-input">
                <div className="todo-input-item">
                    <label>Title</label>
                    <input type="text" value={newTitle} onChange={(e)=>setnewTitle(e.target.value)} placeholder="What's the task title"></input>
                </div>
                <div className="todo-input-item">
                    <label>Description</label>
                    <input type="text" value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="What's the task description"></input>
                </div>
                <div className="todo-input-item">
                    <button type="button" onClick={handleAddTodo} className="primaryBtn">ADD</button>
                </div>
            </div>

            <div className="btn-area">
                <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
                                onClick={()=>setIscompleteScreen(false)}>
                                To Do
                </button>
                <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} 
                                onClick={()=>setIscompleteScreen(true)}>
                                Completed
                </button>
            </div>

            <div className="todo-list">
                {isCompleteScreen===true && completedTodos.map((items,index)=>{
                    return(
                        <div className="todo-list-item" key={index}>
                            <div>
                                <h3>{items.title}</h3>
                                <p>{items.description}</p>
                                <p><small>Completed On: {items.completedOn}</small></p>
                            </div>    

                            <div className="icons">
                                <AiOutlineDelete className="delete-icon" onClick={()=>{handleDeleteCompletedTodo(index)}}/>
                            </div>
                        </div>

                    );
                })}

                {isCompleteScreen===false && allTodos.map((items,index)=>{
                    return(
                        <div className="todo-list-item" key={index}>
                            <div>
                                <h3>{items.title}</h3>
                                <p>{items.description}</p>
                            </div>    

                            <div className="icons">
                                <AiOutlineDelete className="delete-icon" onClick={()=>{handleDeleteTodo(index)}}/>
                                <FaCheck className="check-icon" onClick={()=>{handleComplete(index)}}/>
                            </div>
                        </div>
                    );
                })}  
            </div>
        </div>
    );
}
