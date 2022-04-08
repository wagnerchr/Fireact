import { useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
 


function App() {
 
  const [newName, setNewName] = useState("") // Nome do usuário
  const [newAge, setNewAge] = useState(0) // Idade do usuário

  const [users, setUsers] = useState([])    // Coleção usuários
  const usersRef = collection(db, 'users');  // Referência à coleção usuários

  const createUser = async () => {
    await addDoc(usersRef, {name: newName, age: Number(newAge)})
  }
  const updateUser = async (id, age) => {
    
    const userDoc = doc(db, 'users', id)
    const newFields = {age: age += 1}
    await updateDoc(userDoc, newFields)
  }
  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc);
  };

  useEffect(() => { // Hook chamado quando a página renderiza

    const getUsers = async () => {
      const data = await getDocs(usersRef);
       setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App"> 

<input 
  placeholder='Name...'
  onChange={((e) => {setNewName(e.target.value)}) }
/>
<input 
  type="number" 
  placeholder='Age...'
  onChange={((e) => {setNewAge(e.target.value)}) }
/>

  <button onClick={createUser}> Create user</button>
    {users.map((user) => {
      return <div> 
        <h1>Name: {user.name} </h1>
        <h3>Age: {user.age} </h3>
        <button onClick={() => { updateUser(user.id, user.age)}}>+ Age</button>
        <button onClick={() => { deleteUser(user.id)}}> Delete User</button>
      </div>
    })}
    </div>
  );
}

export default App;
