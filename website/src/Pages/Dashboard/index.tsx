import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

//icons
import { 
    BarChartOutlined,
    UsergroupDeleteOutlined,
    CreditCardOutlined,
    SettingOutlined
    
} from '@ant-design/icons';

// component
import Navbar from "../../Component/Navigation/Navbar";
import { Link, useLocation } from "react-router-dom";

// login
import { useAuthModal } from "../../Features/Authentication/component/ModalAuthContext";
import { useAuthGate } from "../../hook/useAuthGate";


const sidebarItems = [
    { label: "Overview", path: "/dashboard/overview", icon: <BarChartOutlined /> },
    { label: "Billing", path: "/dashboard/billing", icon: <CreditCardOutlined /> },
    { label: "Teams ", path: "/dashboard/teams", icon: <UsergroupDeleteOutlined /> },
    { label: "Setting", path: "/dashboard/setting", icon: <SettingOutlined /> },
];

const SideBar: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="flex flex-col gap-1 min-w-[200px] p-2">
            {sidebarItems.map(item => (
            <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors text-sm font-medium ${
                location.pathname.startsWith(item.path)
                    ? "bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
            >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
            </Link>
            ))}
        </nav>
    );
};

const Dashboard: React.FC = () => {

    const { profile } = useSelector((state: RootState) => state.profile);
    const { authReady, isLoggedIn } = useAuthGate();


    // 防止重复弹出登录框
    const openedRef = React.useRef(false);

    const { showAuthModal } = useAuthModal();

    useEffect(() => {
        if (authReady && !isLoggedIn && !openedRef.current) {
        showAuthModal();
        openedRef.current = true;
        }
    }, [authReady, isLoggedIn, showAuthModal]);

    useEffect(() => {
        if (profile) {
            openedRef.current = false;
        }
    }, [profile]);

    const renderContent = (children: React.ReactNode) => (
        <div className="flex min-h-screen bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
            <Navbar />
            
            <div className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-80 max-w-5xl rounded-full bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.28),transparent_70%)]" />
            <main className="screen-max-width w-full h-full flex pt-24 md:pt-32 gap-8">
                {children}
            </main>
        </div>
    );

    // 鉴权未就绪 → 骨架屏或空白占位，避免闪烁/误弹窗
    if (!authReady) {
        return renderContent(
            <>
                <div className="hidden md:block">
                    <div className="w-[200px] p-2">
                        {/* Sidebar Skeleton */}
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-8 bg-white dark:bg-neutral-800 rounded-md mb-2 animate-pulse"></div>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    {/* Content Skeleton */}
                    <div className="w-full h-32 bg-white dark:bg-neutral-800 rounded-lg animate-pulse"></div>
                </div>
            </>
        );
    }

    if (!isLoggedIn) {
        return renderContent(
            <div className="w-full flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">Please sign in</h2>
                    <p className="text-neutral-500 dark:text-neutral-400">You need to be signed in to view this page.</p>
                </div>
            </div>
        );
    }

    return renderContent(
        <>
            <div className="hidden md:block">
                <SideBar />
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </>
    );
};

export default Dashboard;
