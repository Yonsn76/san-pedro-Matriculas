import { useCallback } from "react";
import { Link } from "react-router-dom";
const Hero = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <section className="relative h-[90vh] w-full text-white">
            {/* Fondo de imagen con overlay oscuro */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                    alt="Estudiantes en el aula"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/1950x1080?text=Colegio+San+Pedro";
                    }}
                />
                <div className="absolute inset-0 bg-black opacity-60" />
            </div>

        
            {/* Contenido principal */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 w-full">
                {/* Texto principal */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow">
                        Bienvenido al Colegio San Pedro
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow">
                        Explora, aprende y crece con nosotros en un entorno moderno e interactivo
                    </p>
                    <Link
                        to="/matricula"
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                    >
                        ¡Matricúlate Ahora!
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
