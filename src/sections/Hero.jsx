import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import gsap from "gsap";

const Hero = () => {
    const wordRefs = useRef([]);
    const [showTypeAnimation, setShowTypeAnimation] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const setWordRef = (el, index) => {
        if (el) wordRefs.current[index] = el;
    };

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "elastic.out(1.5, 0.3)" } });

        wordRefs.current.forEach((el, i) => {
            tl.fromTo(
                el,
                { opacity: 0, y: -50, scale: 0.5 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "elastic.out(1.5, 0.3)"
                },
                i * 0.5
            );
        });

        tl.call(() => {
            setShowTypeAnimation(true);

            setTimeout(() => {
                setShowButton(true);
            }, 2000);
        });
    }, []);

    const titleWords = "Bienvenido a la escuela San Pedro".split(" ");
    const colors = ["#ff5733", "#33ff57", "#5733ff", "#ff33a1", "#33a1ff", "#a1ff33"];

    const handleHover = (el, index, enter) => {
        gsap.to(el, {
            scale: enter ? 1.1 : 1,
            y: enter ? -10 : 0,
            duration: 0.3,
            color: enter ? colors[index % colors.length] : "#ffffff",
        });
    };

    return (
        <section className="relative h-[90vh] w-full text-white">
            <div className="absolute inset-0">
                <img
                    src="foto.jpg"
                    alt="Estudiantes en el aula"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60" />
            </div>

            <div className="relative z-10 flex items-center justify-center h-full px-4 w-full">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow flex flex-wrap justify-center gap-4">
                        {titleWords.map((word, index) => (
                            <span
                                key={index}
                                ref={(el) => setWordRef(el, index)}
                                onMouseEnter={() => handleHover(wordRefs.current[index], index, true)}
                                onMouseLeave={() => handleHover(wordRefs.current[index], index, false)}
                                className="inline-block cursor-pointer"
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