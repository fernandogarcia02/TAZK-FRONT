import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import useTasksContext from '../hooks/useTasksContext';
import useListsContext from "../hooks/useListsContext";
import Sidebar from "../components/Sidebar";
import TaskModal from "../components/TaskModal";
import CrearLista from "../components/CrearLista";
import TaskForm from '../components/TaskForm';
import Error from "../components/Error";
import Cargando from "../components/Cargando";
import '../assets/styles/calendario.css'
import { API_URL } from '../config/urls';


function Calendario() {
    const calendarRef = useRef(null);
    const { items, modalAbierto, abrirCrearTarea, setFechaVencimiento, modalCrearTarea, abrirModal, refrescarTareas, errorTarea, setErrorTarea, cargandoTarea } = useTasksContext();
    const { modalCrearLista, cargandoLista } = useListsContext();

    useEffect(() => {
        document.title = "Calendario - TAZK";
    }, []);

    const handleChangeView = (e) => {
        const viewName = e.target.value;
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(viewName);
    };

    const handleDateClick = (arg) => {
        setFechaVencimiento(arg.dateStr);
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

        try {
            const respuesta = await fetch(`${API_URL}/tareas/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ fechaVencimiento: nuevaFecha })
            });
            if (!respuesta.ok) throw new Error("error al mover la tarea");
            refrescarTareas();
        } catch (error) {
            arg.revert();
            console.error(error);
        }
    }

    const eventos = items.flatMap(task => {
        const hoy = new Date().toISOString().split('T')[0];
        const fechaTarea = task.fechaVencimiento ? task.fechaVencimiento.split('T')[0] : null;
        let clases = "tarea-base";
        if (task.completed) clases += " tarea-completada";
        if (task.priority && !task.completed) clases += " tarea-importante";
        if (fechaTarea && fechaTarea < hoy && !task.completed) clases += " tarea-vencida";

        if (!task.repeticion || task.repeticion === 'ninguna') {
            return {
                id: task._id,
                title: task.text,
                start: task.fechaVencimiento ? task.fechaVencimiento.split('T')[0] : null,
                className: clases,
                extendedProps: { ...task }
            }
        }

        // Si ES periódica, usamos 'daysOfWeek' para que FullCalendar la repita
        let diasRepeticion = [];
        if (task.repeticion === 'diaria') diasRepeticion = [0, 1, 2, 3, 4, 5, 6]; // Todos los días
        if (task.repeticion === 'entre-semana') diasRepeticion = [1, 2, 3, 4, 5]; // Lunes a Viernes
        if (task.repeticion === 'fin-de-semana') diasRepeticion = [0, 6];        // Sábado y Domingo

        return {
            id: task._id,
            title: `${task.text}`, // Icono para diferenciar que es recurrente
            daysOfWeek: diasRepeticion,
            startRecur: task.fechaCreacion || '2024-01-01', // Fecha desde la que empieza a aparecer
            className: clases + " tarea-recurrente",
            extendedProps: { ...task }
        };

    });

    return (
        <div className='bg-white min-h-[100dvh] w-full flex flex-col md:flex-row overflow-x-hidden'>
            <Sidebar />

            {/* Cambiamos h-screen por min-h-0 para que flex-1 funcione correctamente */}
            <div className="flex-1 flex flex-col p-2 md:p-6 min-h-0 overflow-hidden">

                {/* Espaciador superior para móvil */}
                <div className="h-16 md:h-8 shrink-0"></div>

                <div className="flex justify-between items-center mb-4 shrink-0 px-2">
                    <div className="custom-select-wrapper w-full md:w-auto">
                        <select
                            onChange={handleChangeView}
                            className="w-full md:w-auto font-inter text-sm text-[#007011] bg-white border border-[#007011] rounded-lg px-2 py-2 outline-none cursor-pointer"
                        >
                            <option value="dayGridMonth">Vista Mes</option>
                            <option value="dayGridWeek">Vista Semana</option>
                            <option value="dayGridDay">Vista Día</option>
                        </select>
                    </div>
                </div>

                {/* Este contenedor es el que fallaba: le damos un min-h en móvil */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 md:p-2 min-h-[500px] md:min-h-0">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView={window.innerWidth < 768 ? "dayGridDay" : "dayGridMonth"}
                        height="100%"
                        locale="es"
                        /* Ajustamos el ratio para que en móvil sea más vertical */
                        aspectRatio={window.innerWidth < 768 ? 0.5 : 1.5}
                        handleWindowResize={true}
                        expandRows={true}
                        stickyHeaderDates={true}
                        firstDay={1}
                        events={eventos}
                        editable={true}
                        eventDrop={handleEventDrop}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: ''
                        }}
                        buttonText={{ today: 'Hoy' }}
                    />
                </div>
            </div>

            {abrirCrearTarea && <TaskForm />}
            {modalCrearLista && <CrearLista />}
            {modalAbierto && <TaskModal />}
            {errorTarea && <Error
                mensaje={errorTarea}
                cerrar={() => setErrorTarea('')} />}
            {cargandoTarea && (
                <Cargando />
            )}

            {cargandoLista && (
                <Cargando />
            )}
        </div>
    );
}

export default Calendario;