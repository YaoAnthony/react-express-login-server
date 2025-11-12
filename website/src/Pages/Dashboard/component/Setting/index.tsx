import { motion } from "framer-motion";

const Setting: React.FC = () => {
    return (
        <div className="w-full relative flex flex-col items-start ">
            <motion.h1
                className="text-4xl font-bold mb-6 text-center font-mono"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Setting
            </motion.h1>
        </div>
    );
}

export default Setting;