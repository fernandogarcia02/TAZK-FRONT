import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useUsersContext from '../hooks/useUsersContext';
import useListsContext from '../hooks/useListsContext';
import useTasksContext from '../hooks/useTasksContext';
import { API_URL } from '../config/urls';

//página que se entra si pulsas en confirmar cuenta en el email enviado
const ConfirmarCuenta = () => {
    const [confirmado, setConfirmado] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState('');

    const params = useParams();
    const { token } = params;
    const {obtenerPerfil} = useUsersContext();
    const {imprimirListas} = useListsContext();
    const {refrescarTareas} = useTasksContext();

    useEffect(() => {
            document.title = "Confirmar Cuenta - TAZK";
        }, []);

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `${API_URL}/usuarios/confirmar/${token}`;
                const respuesta = await fetch(url);
                const data = await respuesta.json();

                if (respuesta.ok) {
                    localStorage.setItem('token_usuario', data.token);
                    await obtenerPerfil();
                    await imprimirListas();
                    await refrescarTareas();
                    setConfirmado(true);
                    setAlerta(data.mensaje);
                } else {
                    setAlerta(data.mensaje || "Hubo un error");
                }
            } catch (error) {
                setAlerta("Error de conexión con el servidor");
            }
            setCargando(false);
        };
        confirmarCuenta();
    }, [token]); // Se ejecuta una vez cuando el token esté disponible

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 bg-[#007011] shadow-lg rounded-xl max-w-[380px] md:max-w-lg w-full text-center flex flex-col items-center">
                <h1 className="text-3xl font-bold text-white mb-5">Confirmar Cuenta</h1>

                {cargando ? (
                    <p className="text-gray-500">Validando tu token...</p>
                ) : (
                    <>
                        <p className={`p-3 rounded-lg mb-5 ${confirmado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {alerta}
                        </p>

                        {confirmado && (
                            <Link 
                                to="/home" 
                                className="block font-inter  text-white border border-white bg-[#7B9F7D] rounded-full p-3 md:p-3 w-[100px] hover:scale-110 transition-transform cursor-pointer active:scale-95"
                            >
                                Entrar
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmarCuenta;