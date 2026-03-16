import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[linear-gradient(180deg,_#ffffff_49%,_#999999_94%)] px-10">
            
            
            <header className="absolute top-0 left-0 w-full flex justify-between items-center p-8">
                <img src="/icons/TAZK.png" alt="tazk" className="h-10 w-auto" />
                
                <div className="flex gap-4">
                    <button
                    onClick={()=> navigate("/registro")}
                    className="font-semibold text-[#007011] hover:scale-105 transition-all active:scale-95 cursor-pointer">
                        Registrarse
                    </button>
                    <button
                    onClick={()=> navigate("/login")}
                    className="bg-white text-[#007011] border-1 border-[#007011] px-5 py-3 rounded-full font-bold hover:scale-105 active:scale-95 cursor-pointer transition-transform">
                        Iniciar Sesión
                    </button>
                </div>
            </header>

            
            <main className="flex flex-col items-center text-center gap-8">
                <h1 className="text-[96px] text-[#007011] font-bold">
                    Una lista sencilla de tareas para gestionarlo todo
                </h1>
                
                <button 
                    onClick={() => navigate('/login')}
                    className="bg-[#007011] text-white text-xl font-bold px-28 py-6 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                    Empezar
                </button>
            </main>

        </div>
    );
};

export default Welcome;