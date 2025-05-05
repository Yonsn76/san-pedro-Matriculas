import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

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
                />


                <div className="absolute inset-0 bg-black opacity-60" />
            </div>

            {/* Partículas tipo burbuja */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                className="absolute inset-0 z-0"
                options={{
                    fullScreen: false,
                    background: { color: "transparent" },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "bubble", // activa efecto burbuja
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 200,
                                size: 8,
                                duration: 2,
                                opacity: 0.8,
                            },
                        },
                    },
                    particles: {
                        color: { value: "#ffffff" },
                        links: {
                            enable: false, // sin líneas
                        },
                        move: {
                            enable: true,
                            speed: 0.8,
                            direction: "none",
                            outModes: { default: "out" },
                        },
                        number: {
                            value: 50,
                            density: { enable: true, area: 800 },
                        },
                        opacity: {
                            value: 0.2,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 4, max: 10 },
                        },
                    },
                    detectRetina: true,
                }}
            />

            {/* Contenido principal */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow">
                        Bienvenido al Colegio San Pedro
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow">
                        Explora, aprende y crece con nosotros en un entorno moderno e interactivo
                    </p>
                    <a
                        href="#matricula"
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                    >
                        ¡Matricúlate Ahora!
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
