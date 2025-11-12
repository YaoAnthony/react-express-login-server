import React from "react";
import { motion } from "framer-motion";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";

// styles
// import { colors } from "../../../../style";


const Overview: React.FC = () => {

    // Get user profile from Redux store
    const { profile } = useSelector((state: RootState) => state.profile);
    
    if (!profile) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <main className="flex-1 p-10">
                    Please log in first.
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-start gap-16  mt-8 md:mt-0">
            <motion.h1
                className="text-3xl font-bold mb-6 text-center font-mono"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Overview 
            </motion.h1>
        </div>
    );
};

export default Overview;