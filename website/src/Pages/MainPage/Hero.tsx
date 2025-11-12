import { styles } from "../../style";

import { motion } from "motion/react";


//react
import { useEffect, useState } from "react";

import Typewriter from "../../Component/Typewriter";

//import AnimatedBackgroundText from "./Background";

//antd
import { DownOutlined } from "@ant-design/icons";

const customerStyles = {
    ScrollArrowColor: "text-white-text-primary dark:text-dark-text-primary hover:text-white-text-primary dark:hover:text-dark-text-primary",
    textColor: "text-white-text-primary dark:text-dark-text-primary",
    secondaryTextColor: "text-white-text-secondary dark:text-gray-500",
    background: "hero-gradient",
};
const ScrollArrow = ({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) => {
    const handleClick = () => {
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
        });
      }
    };
  
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 24, 0] }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity, // Loop forever
            }}
            className={`${customerStyles.ScrollArrowColor} z-50 absolute bottom-6 transform -translate-x-1/2 text-2xl cursor-pointer opacity-80`}
            onClick={handleClick}
        >
            <DownOutlined className="text-4xl" />
        </motion.div>
      
    );
};

const Main = () => {

    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setReady(true);
        }, 100); // 微妙延迟，等待字体、样式等稳定
        return () => clearTimeout(timeout);
    }, []);

    return (
        <main
            key="search-ui"
            className="flex min-h-screen flex-col items-center justify-center gap-5 px-4"
        >
            {ready && (
                <>
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col gap-2 md:gap-12 items-center justify-center my-2 md:my-5 z-10"
                        >
                        <p className={`${customerStyles.textColor} text-3xl md:text-[4rem] xl:text-[5rem] text-center font-bold font-grotesk`}>
                            On-Demand Neuro-Symbolic
                        </p>
                        <p className={`${customerStyles.textColor} text-3xl md:text-[2.5rem] xl:text-[3rem] 2xl:text-[4rem] text-center font-bold font-grotesk`}>
                            Test Synthesis
                        </p>
                    </motion.div>
                    <div className={`${customerStyles.secondaryTextColor} text-md text-center `}>
                        <Typewriter text="Defusing risks before they explode." delay={500} />
                    </div>
                </>
            )}
        </main>
    );
};
  

interface Herov3Props {
    scrollTargetRef: React.RefObject<HTMLDivElement>;
}


const Hero = ({ scrollTargetRef }: Herov3Props) => {

    return (
        <div className={`relative w-full min-h-screen ${styles.paddingX} ${customerStyles.background}`}>
            <div className={`relative flex justify-center items-center h-screen mx-auto z-10`}>
                {/* <div className="md:block hidden">
                    <AnimatedBackgroundText x1={50} y1={100} x2={800} y2={600} />
                </div> */}

                <Main />
                <ScrollArrow targetRef={scrollTargetRef} />
            </div>
        </div>
    );
};

export default Hero;
