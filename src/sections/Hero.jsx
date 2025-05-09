import { useEffect, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import gsap from "gsap";

const Hero = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const wordRefs = useRef([]);
    const [showTypeAnimation, setShowTypeAnimation] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const setWordRef = (el, index) => {
        if (el) wordRefs.current[index] = el;
    };

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        wordRefs.current.forEach((el, i) => {
            tl.fromTo(
                el,
                { opacity: 0, rotate: 0, scale: 1.8 },
                {
                    opacity: 1,
                    rotate: 360,
                    scale: 1,
                    duration: 1.7,
                },
                i * 0.8
            );
        });

        // pausa después de la animación 
        tl.to({}, { duration: 0.3 }); 

        tl.call(() => {
            setShowTypeAnimation(true);

            // Mostrar el botón después del texto
            setTimeout(() => {
                setShowButton(true);
            }, 2000);
        });
    }, []);

    const handleMouseEnter = (el) => {
        gsap.to(el, {
            scale: 1.1,
            color: "#ff6347",
            rotate: 10,
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (el) => {
        gsap.to(el, {
            scale: 1,
            color: "#ffffff",
            rotate: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const titleWords = "Bienvenido a la escuela San Pedro".split(" ");

    return (
        <section className="relative h-[90vh] w-full text-white">
            {/* Fondo de imagen con overlay oscuro */}
            <div className="absolute inset-0">
                <img
                    src="foto.jpg"
                    alt="Estudiantes en el aula"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://via.placeholder.com/1950x1080?text=Colegio+San+Pedro";
                    }}
                />
                <div className="absolute inset-0 bg-black opacity-60" />
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 w-full">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow flex flex-wrap justify-center gap-4">
                        {titleWords.map((word, index) => (
                            <span
                                key={index}
                                ref={(el) => setWordRef(el, index)}
                                className="inline-block cursor-pointer transition-transform"
                                onMouseEnter={(e) => handleMouseEnter(e.target)}
                                onMouseLeave={(e) => handleMouseLeave(e.target)}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>

                    {showTypeAnimation && (
                        <TypeAnimation
                            sequence={["Explora, aprende y crece con nosotros...", 1000]}
                            wrapper="p"
                            speed={50}
                            repeat={Infinity}
                            className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow"
                        />
                    )}

                    {showButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <Link
                                    to="/matricula"
                                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                                >
                                    ¡Matricúlate Ahora!
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
