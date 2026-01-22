import { useState } from 'react';
import './App.css';

function App() {
  // ======================
  // ESTADOS PRINCIPALES
  // ======================
  const [items, setItems] = useState([]); // Array de tareas
  const [item, setNewItem] = useState(''); // Texto de la nueva tarea
  const [description, setNewDescription] = useState(''); // Descripción de la nueva tarea

  // ======================
  // MODAL PARA EDITAR SOLO TEXTO
  // ======================
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState('');

  // ======================
  // MODAL PARA VER/EDITAR TAREA COMPLETA (texto + descripción)
  // ======================
  const [modalItemAbierto, setModalItemAbierto] = useState(false);
  const [tareaAabrir, setTareaAabrir] = useState(null);
  const [nuevoTexto2, setNuevoTexto2] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');

  // ======================
  // FUNCIONES DEL MODAL DE EDITAR TEXTO
  // ======================
  const abrirModal = (index) => {
    setModalAbierto(true);
    setTareaAEditar(index);
    setNuevoTexto(items[index].text); // Cargamos el texto actual de la tarea
  };

  const guardarCambios = () => {
    // Recorremos todas las tareas y cambiamos solo la que estamos editando
    const nuevasTareas = items.map((item, i) => {
      if (tareaAEditar === i) {
        return { ...item, text: nuevoTexto };
      }
      return item;
    });
    setItems(nuevasTareas);
    setModalAbierto(false);
    setTareaAEditar(null);
    setNuevoTexto('');
  };

  // ======================
  // FUNCIONES DEL MODAL DE VER/EDITAR COMPLETO
  // ======================
  const abrirModalItem = (index) => {
    setModalItemAbierto(true);
    setTareaAabrir(index);
    setNuevoTexto2(items[index].text);
    setNuevaDesc(items[index].description);
  };

  const guardarCambios2 = () => {
    const nuevasTareas = items.map((item, i) => {
      if (i === tareaAabrir) {
        return { ...item, text: nuevoTexto2, description: nuevaDesc };
      }
      return item;
    });
    setItems(nuevasTareas); // ← esto actualiza la lista
    setModalItemAbierto(false);
    setTareaAabrir(null);
    setNuevoTexto2('');
    setNuevaDesc('');
  };

  // ======================
  // FUNCIONES CRUD
  // ======================
  const agregarItem = () => {
    if (item.trim() === '') return;

    const nuevaTarea = {
      text: item,
      description: description,
      completed: false,
    };

    setItems([...items, nuevaTarea]); // Añadimos la nueva tarea al array
    setNewItem('');
    setNewDescription('');
  };

  const toggleCompleted = (index) => {
    const nuevasTareas = items.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed }; // Marcamos o desmarcamos completada
      }
      return item;
    });
    setItems(nuevasTareas);
  };

  const borrarItem = (index) => {
    const nuevasTareas = items.filter((_, i) => i !== index); // Filtramos todo menos la tarea seleccionada
    setItems(nuevasTareas);
  };

  // ======================
  // RENDERIZADO
  // ======================
  return (
    <div>
      {/* Input y textarea para agregar nueva tarea */}
      <input
        type="text"
        value={item}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Escribe la tarea"
      />
      <textarea
        value={description}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Descripción de la tarea"
      />
      <button onClick={agregarItem}>Agregar</button>

      {/* Lista de tareas */}
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => abrirModalItem(index)} // Abrir modal completo al click en el li
            style={{
              textDecoration: item.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              marginBottom: '8px',
            }}
          >
            {item.text}
            {/* Botones dentro del li */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita que se abra el modal del li
                toggleCompleted(index);
              }}
            >
              ✔
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                borrarItem(index);
              }}
            >
              ❌
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                abrirModal(index);
              }}
            >
              ✏️
            </button>
          </li>
        ))}
      </ul>

      {/* MODAL EDITAR TEXTO */}
      {modalAbierto && (
        <div className="modal">
          <h3>Editar tarea</h3>
          <input
            type="text"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
          />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setModalAbierto(false)}>Cancelar</button>
        </div>
      )}

      {/* MODAL VER/EDITAR COMPLETO */}
      {modalItemAbierto && (
        <div
          className="modal"
          style={{
            border: '2px solid black',
            borderRadius: '20px',
            padding: '10px',
          }}
        >
          <h3>Task</h3>
          <input
            type="text"
            value={nuevoTexto2}
            onChange={(e) => setNuevoTexto2(e.target.value)}
          />
          <textarea
            value={nuevaDesc}
            onChange={(e) => setNuevaDesc(e.target.value)}
          />
          <button onClick={guardarCambios2}>Guardar</button>
          <button onClick={() => setModalItemAbierto(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default App;
