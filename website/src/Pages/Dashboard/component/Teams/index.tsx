import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { TeamOutlined } from "@ant-design/icons";
import { RootState } from "../../../../Redux/store";
import { Team } from "../../../../Types/Profile";

const TeamsPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const teams = useSelector((state: RootState) => state.profile.profile?.teams);

    // if not logged in, show a login prompt
    if (!user) {
        return (
            <div className="w-full md:px-10 xs:px-5 3xl:px-12 4xl:px-0 flex flex-col items-center justify-center text-center mt-20">
                <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">Manage Your Teams</h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Please log in to create, view, and manage your teams.</p>
                <button
                    onClick={() => { window.location.href = '/login'; }}
                    className="mt-6 px-8 py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
                >
                    Log In
                </button>
            </div>
        );
    }

    return (
        <div className="w-full md:px-10 xs:px-5 3xl:px-12 4xl:px-0">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-8"
            >
                <div>
                    <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">Teams</h1>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Collaborate and manage your projects with your team.
                    </p>
                </div>
                {/* <button
                    className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    Create Team
                </button> */}
            </motion.div>

            {/* Content */}
            {teams && teams.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {teams.map((team: Team) => {
                        const role = team.leader._id === user._id ? 'Admin' : 'Member';
                        return (
                            <div key={team._id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                                            <TeamOutlined className="text-2xl text-neutral-500 dark:text-neutral-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{team.name}</h3>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{team.members.length} members</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${role === 'Admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'}`}>
                                        {role}
                                    </span>
                                    <button className="text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-400">
                                        Manage
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 px-6 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col items-center"
                >
                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800/50 rounded-full flex items-center justify-center mb-4">
                        <TeamOutlined className="text-4xl text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">No teams yet</h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                        Create a team to start collaborating with others and manage your projects together.
                    </p>
                    {/* <button
                        className="mt-6 px-8 py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out flex items-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Create your first team
                    </button> */}
                </motion.div>
            )}
        </div>
    );
};

export default TeamsPage;