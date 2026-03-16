import useListsContext from "../hooks/useListsContext";
import useTasksContext from "../hooks/useTasksContext";
import useUsersContext from "../hooks/useUsersContext";
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
        setFoto,
        preview,
        manejarCambioFoto,
        obtenerPerfil
    } = useUsersContext();

    const {refrescarTareas} = useTasksContext();
    const {imprimirListas} = useListsContext();
    
        return(
            <div>
                <h1>Registrarse</h1>

                {error && 
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm">
                    <div className="bg-red-600 text-white p-4 rounded-lg shadow-2xl border-l-4 border-red-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Icono de advertencia simple */}
                            <span className="text-xl">⚠️</span>
                            <p className="font-medium">{error}</p>
                        </div>

                    {/* Botón para cerrar manualmente */}
                    <button 
                        onClick={() => setError('')} // 👈 Esto borra el error y hace que el div desaparezca
                        className="ml-4 hover:text-red-200 transition"
                    >
                        ✕
                    </button>   
                    </div>
                </div>
                }
                <form onSubmit={async(e)=>{
                    e.preventDefault();
                    await Registrar()
                    refrescarTareas()
                    imprimirListas()
                    obtenerPerfil()
                    }}>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                    className="border-2"
                    type="text" 
                    name="Nombre" 
                    id="nombre" 
                    value={nombre}
                    required 
                    onChange={(e)=>setNombre(e.target.value)} />
                    <label htmlFor="email">Email</label>
                    <input 
                    className="border-2"
                    type="email" 
                    name="email" 
                    id="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}} />
                    <label htmlFor="password">password</label>
                    <input 
                    className="border-2"
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <label htmlFor="password">Confirmar password</label>
                    <input 
                    className="border-2"
                    type="password" 
                    name="password2" 
                    id="password2" 
                    value={password2}
                    onChange={(e)=>setPassword2(e.target.value)}/>
                    <div
                    className="w-32 h-32 rounded-full overflow-hidden"
                    >
                        <img src={preview ? preview : '/icons/account.png'} alt="foto de perfil"  className="w-full h-full object-cover"/>
                    </div>
                    <input 
                    type="file"
                    accept="image/*"
                    onChange={manejarCambioFoto}  
                    />
                    <input className="border-2" type="submit" value="Crear cuenta" />
                </form>
            </div>
        )
        
    
}

export default Registro;