import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from "../hooks/useListsContext";
import Sidebar from "../components/Sidebar";
import TaskModal from "../components/TaskModal";
import CrearLista from "../components/CrearLista";
import TaskForm from '../components/TaskForm';
import '../assets/styles/calendario.css'

function Calendario() {
    const calendarRef = useRef(null);
    const { items, modalAbierto, abrirCrearTarea, setFechaVencimiento, modalCrearTarea, abrirModal, refrescarTareas } = useTasksContext();
    const { modalCrearLista } = useListsContext();

    const handleChangeView = (e) => {
        const viewName = e.target.value;
        const calendarApi = calendarRef.current.getApi(); // Obtenemos la API
        calendarApi.changeView(viewName); // Cambiamos la vista
    };

    const handleDateClick = (arg) => {
        const fechaSeleccionada = arg.dateStr;

        setFechaVencimiento(fechaSeleccionada);
        modalCrearTarea();
    }

    const handleEventClick = (arg) => {
        const task = arg.event.extendedProps;
        abrirModal(task);
    }

    const handleEventDrop = async (arg) => {
        const task = arg.event.extendedProps;
        const nuevaFecha = arg.event.startStr;
        const token = localStorage.getItem('token_usuario');
        console.log(nuevaFecha);

        try {
            const respuesta = await fetch(`http://localhost:3000/api/tareas/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ fechaVencimiento: nuevaFecha })
            });

            if (!respuesta.ok) {
                throw new Error("error al mover la tarea");

            }

            refrescarTareas();
        } catch (error) {
            arg.revert();
            console.error(error);
        }
    }

    //Trasformamos las tareas en el formato para la libreria

    const eventos = items.map(task => {
        const hoy = new Date().toISOString().split('T')[0];
        const fechaTarea = task.fechaVencimiento ? task.fechaVencimiento.split('T')[0] : null;

        let clases = "tarea-base";

        if (task.completed) {
            clases += " tarea-completada";
        }

        if (task.priority && !task.completed) {
            clases += " tarea-importante";
        }

        if (fechaTarea && fechaTarea < hoy && !task.completed) {
            clases += " tarea-vencida";
        }


        return {
            id: task._id,
            title: task.text,
            start: task.fechaVencimiento ? task.fechaVencimiento.split('T')[0] : null,
            className: clases,
            extendedProps: { ...task } //guardamos toda la info por si la necesitamos 
        }

    });

    return (
        // Usamos h-screen para que el contenedor mida exactamente la pantalla
        <div className='bg-white h-screen w-full flex overflow-visible'>
            <Sidebar />

            {/* El contenedor ahora es flex-col para repartir el alto */}
            <div className="calendar-container w-4/5 flex flex-col p-4">

                {/* Espaciador del 10% usando clases arbitrarias de Tailwind */}
                <div className="h-[2%]"></div>



                {/* Contenedor del calendario al 90% */}
                <div className="h-[98%] relative calendar-custom-container">
                    <div className="custom-select-wrapper">
                        <select onChange={handleChangeView} className="tu-clase-tailwind">
                            <option value="dayGridMonth">Mes</option>
                            <option value="dayGridWeek">Semana</option>
                            <option value="dayGridDay">Día</option>
                        </select>
                    </div>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        height="100%" // <--- ESTO ES CLAVE para que no haga scroll
                        locale="es"
                        aspectRatio={1}
                        dragScroll={true}
                        firstDay={1}
                        events={eventos}
                        editable={true}
                        eventDrop={handleEventDrop}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'customSelect'
                        }}
                        buttonText={{
                            today: 'Hoy',
                            month: 'Mes',
                            week: 'Semana',
                            day: 'Día'
                        }}
                    />
                </div>
            </div>
            {abrirCrearTarea && (
                <TaskForm />
            )}
            {modalCrearLista && <CrearLista />}
            {modalAbierto && <TaskModal />}
        </div>
    );
}

export default Calendario;