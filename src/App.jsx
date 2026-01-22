import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [items , setitems] = useState([]);
  const [item, setNewItem] = useState('');

  const agregarItem = () =>{
    if (item.trim() === "") {
      return
    }
    setitems([...items, item]);
    setNewItem('');
  }

  return (
    <div>
      <input type="text" value={item} 
      onChange={(e) => setNewItem(e.target.value)}
      placeholder='Escribe la tarea' />
      <button onClick={agregarItem}>Agregar</button>
      <ul>
        {
          items.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
º
    </div>
  )
}

export default App
