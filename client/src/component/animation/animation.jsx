import React, { useEffect, useRef } from 'react'
import Lottie from "lottie-web";
import animationData from "./typingAnimation.json";

const Animation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        return () => {
            anim.destroy(); // Cleanup animation when the component unmounts
        };
    }, []);

    return <div style={{
        width: "100px",
        height: "100px"
    }}
        ref={containerRef} />;
};

export default Animation