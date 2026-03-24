import { useNavigate } from "react-router-dom";
import useListsContext from "../hooks/useListsContext";
import useTasksContext from "../hooks/useTasksContext";
import useUsersContext from "../hooks/useUsersContext";
import Error from "../components/Error";

const Registro = () => {
    const {
        email,
        setEmail,
        nombre,
        setNombre,
        password,
        setPassword,
        password2,
        setPassword2,
        error,
        setError,
        Registrar,
        foto,
        preview,
        manejarCambioFoto,
        obtenerPerfil
    } = useUsersContext();

    const { refrescarTareas } = useTasksContext();
    const { imprimirListas } = useListsContext();
    const navigate = useNavigate();

    return (
        <div className="min-h-[100vh] w-full flex items-center justify-center p-4">
            {/* Logo TAZK */}
            <img
                src="/icons/TAZK.png"
                alt="tazk"
                className="fixed top-6 left-6 md:top-8 md:left-8 h-8 md:h-10 w-auto cursor-pointer z-50"
                onClick={() => navigate("/welcome")}
            />

            {error &&
                <Error/>
            }

            <form
                className="relative bg-[#007011] w-full max-w-[450px] md:max-w-[700px] h-auto md:h-[850px] rounded-[30px] md:rounded-[50px] flex flex-col items-center mt-10 md:mt-0 pt-24 pb-12 md:pt-40 shadow-2xl"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await Registrar();
                    refrescarTareas();
                    imprimirListas();
                    obtenerPerfil();
                }}>
                
                <h2 className='absolute top-8 md:top-10 font-poppins font-bold text-white text-[24px] md:text-[30px]'>
                    Registrarse
                </h2>

                <div className="flex flex-col gap-6 md:gap-8 w-full px-6 md:px-0 items-center">
                    
                    {/* Nombre */}
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-[550px] gap-2">
                        <label className='font-inter text-[16px] md:text-[20px] text-white font-bold md:w-40 text-left md:text-right md:pr-4' htmlFor="nombre">Nombre</label>
                        <input
                            className='bg-white rounded-full w-full md:w-[350px] p-2 md:p-5 font-inter focus:outline-none focus:ring-4 focus:ring-[#004d0b] transition-all text-sm md:text-base'
                            type="text"
                            id="nombre"
                            value={nombre}
                            required
                            placeholder="Nombre"
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-[550px] gap-2">
                        <label className='font-inter text-[16px] md:text-[20px] text-white font-bold md:w-40 text-left md:text-right md:pr-4' htmlFor="email">Email</label>
                        <input
                            className='bg-white rounded-full w-full md:w-[350px] p-2 md:p-5 font-inter focus:outline-none focus:ring-4 focus:ring-[#004d0b] transition-all text-sm md:text-base'
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-[550px] gap-2">
                        <label className='font-inter text-[16px] md:text-[20px] text-white font-bold md:w-40 text-left md:text-right md:pr-4' htmlFor="password">Contraseña</label>
                        <input
                            className='bg-white rounded-full w-full md:w-[350px] p-2 md:p-5 font-inter focus:outline-none focus:ring-4 focus:ring-[#004d0b] transition-all text-sm md:text-base'
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Contraseña"
                            required
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    {/* Password 2 */}
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-[550px] gap-2">
                        <label className='font-inter text-[16px] md:text-[20px] text-white font-bold md:w-40 text-left md:text-right md:pr-4' htmlFor="password2">Confirmar</label>
                        <input
                            className='bg-white rounded-full w-full md:w-[350px] p-2 md:p-5 font-inter focus:outline-none focus:ring-4 focus:ring-[#004d0b] transition-all text-sm md:text-base'
                            type="password"
                            id="password2"
                            value={password2}
                            placeholder="Confirmar contraseña"
                            required
                            onChange={(e) => setPassword2(e.target.value)} 
                        />
                    </div>

                    {/* Foto de Perfil */}
                    <div className="flex items-center w-full md:w-[550px] gap-4 md:gap-6 mt-2">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shrink-0">
                            <img
                                src={preview ? preview : '/icons/account.png'}
                                alt="foto de perfil"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-2">
                            <label
                                htmlFor="foto-upload"
                                className="bg-white text-[#007011] font-bold py-2 px-6 rounded-full cursor-pointer hover:bg-[#7B9F7D] hover:text-white transition-all text-center border border-white text-sm"
                            >
                                Elegir Foto
                            </label>
                            <input
                                id="foto-upload"
                                type="file"
                                accept="image/*"
                                onChange={manejarCambioFoto}
                                className="hidden"
                            />
                            <span className="text-white text-[10px] md:text-xs font-inter text-center md:text-left">
                                {foto ? foto.name : "Sin archivo"}
                            </span>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="mt-10 md:absolute md:bottom-10 text-white border border-white bg-[#7B9F7D] rounded-full p-3 w-[200px] hover:scale-110 transition-transform cursor-pointer active:scale-95 font-inter font-bold"
                >
                    Crear cuenta
                </button>
            </form>
        </div>
    );
};

export default Registro;