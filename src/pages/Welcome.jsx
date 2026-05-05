import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // 1. Cambiar el Título
        document.title = "TAZK - Gestión sencilla de tareas";

        // 2. Cambiar la Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            // Si no existe, la creamos
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }

        metaDescription.content = "Una lista sencilla de tareas para gestionarlo todo de forma eficiente y rápida.";

    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[linear-gradient(180deg,_#ffffff_49%,_#999999_94%)] px-6 md:px-10 overflow-hidden">

            {/* Logo - En móvil lo centramos un poco más si quieres, o lo dejamos fijo */}
            <img
                src="/icons/TAZK.png"
                alt="tazk"
                className="fixed top-6 left-6 md:top-8 md:left-8 h-8 md:h-10 w-auto cursor-pointer z-50"
                onClick={() => navigate("/welcome")}
            />

            {/* Header - En móvil reducimos el padding y el tamaño de los botones */}
            <header className="fixed top-6 right-4 md:top-8 md:right-8 flex items-center gap-2 md:gap-4">
                <button
                    onClick={() => navigate("/registro")}
                    className="text-sm md:text-base font-semibold text-[#007011] hover:scale-105 transition-all active:scale-95 cursor-pointer">
                    Registrarse
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-[#007011] border border-[#007011] px-3 py-2 md:px-5 md:py-3 rounded-full text-sm md:text-base font-bold hover:scale-105 active:scale-95 cursor-pointer transition-transform shadow-sm">
                    Iniciar Sesión
                </button>
            </header>

            {/* Main - Ajuste crítico del tamaño de fuente y anchos */}
            <main className="flex flex-col items-center text-center gap-6 md:gap-8 md:mt-0">
                <h1 className="text-[45px] leading-[1.1] md:text-[96px] text-[#007011] font-bold max-w-[90%] md:max-w-none">
                    Una lista sencilla de tareas para gestionarlo todo
                </h1>

                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#007011] text-white text-lg md:text-xl font-bold px-16 py-4 md:px-28 md:py-6 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer mt-4"
                >
                    Empezar
                </button>
            </main>

        </div>
    );
};

export default Welcome;