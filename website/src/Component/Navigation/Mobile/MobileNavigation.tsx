//react
import { useState, useEffect  } from 'react';

//react-router
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../Redux/Features/userSlice';
import { clearProfile } from '../../../Redux/Features/profileSlice';
import { RootState } from '../../../Redux/store';

//antd
import { Avatar, Drawer, message } from 'antd';

//constants
import { APPNAME } from "../../../Constant";

//icons
import { FiLogOut } from "react-icons/fi";
import { MenuOutlined } from "@ant-design/icons";
import { GitlabFilled } from "@ant-design/icons";
import { CloseOutlined } from '@ant-design/icons';
import { MdInsertChartOutlined } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { 
    AiOutlineCoffee,
    AiOutlineUsergroupDelete,
    AiOutlineSetting,
} from "react-icons/ai";

//style
//import style from "../../style.module.scss";
import { colors } from '../../../style';
import { User } from '../../../Types/User';


const userNav = [
    { name: "Overview", icon: <MdInsertChartOutlined />, url: "/dashboard/overview" },
    { name: "Teams", icon: <AiOutlineUsergroupDelete />, url: "/dashboard/teams" },
    { name: "Billing & Subscription", icon: <CiCreditCard1 />, url: "/dashboard/billing" },
    { name: "Setting", icon: <AiOutlineSetting />, url: "/dashboard/setting" },
];



interface MobileUserNavProps {
    open: boolean;
    isOpen: (open: boolean) => void;
}

const MobileUserNav = ({ open, isOpen }: MobileUserNavProps) => {
    // calculate the width of the drawer based on the window size
    const [drawerWidth, setDrawerWidth] = useState(window.innerWidth);

    //get the user info from redux store
    const user = useSelector((state: RootState) => state.user.user);
    
    // hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // scroll to section
    const handleScrollToSection = (id: string) => {
        navigate("/");
        isOpen(false);
        setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        }, 100);
    };


    useEffect(() => {
        const updateWidth = () => setDrawerWidth(window.innerWidth);
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleSignOut = () => {
        dispatch(logout());
        dispatch(clearProfile());
        message.success('Sign out successfully');
    };

    const UserPart = (user : User) => {

        if (!user) {
            return (
                <div className={`${colors.text.primary} flex items-center gap-3`}>
                    <Avatar />
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold">Guest</span>
                        <span className="text-sm">Please login</span>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${colors.text.primary} flex items-center gap-3`}>
                <Avatar 
                    className='w-10 h-10'    
                    src={user?.image_url} />
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{user.username}</span>
                    <span className={`text-sm ${colors.text.secondary}`}>{user.subscription.level}</span>
                </div>

            </div>
        )
    }

    return (
        <div>
            <div onClick={() => isOpen(true)}>
                <MenuOutlined className={` text-2xl ${colors.text.primary}`} />
            </div>
            <Drawer
                title={APPNAME}
                placement="right"
                open={open}
                onClose={() => isOpen(false)}
                width={drawerWidth}
                styles={{
                    body: {},
                    header: {},
                }}
                className={`${colors.bg.primary} ${colors.text.primary}`}
                closeIcon={<CloseOutlined className={`${colors.text.primary} text-xl`} />}
            >
                <div className='w-full flex flex-col justify-center gap-5'>
                    {user && UserPart(user)}
                    <div
                        onClick={() => handleScrollToSection("pricing")}
                        className={`w-full relative overflow-hidden `}
                        >
                        <div className="flex items-center gap-5 text-md justify-start px-4 py-3">
                            
                            <AiOutlineCoffee />
                            <span>Pricing</span>
                        </div>
                        
                    </div>

                    {userNav.map(item => (
                        <NavLink
                            onClick={() => isOpen(false)}
                            to={item.url}
                            key={item.url}
                            className="w-full rounded-md relative overflow-hidden shadow-list"
                        >
                            <div className="flex items-center gap-5 text-md justify-start px-4 py-3">
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        </NavLink>
                    ))}
                    <hr />
                    <button
                        onClick={handleSignOut}
                        className="w-full rounded-md overflow-hidden shadow-list flex items-center gap-5 text-md justify-start px-4 py-3"
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </Drawer>
        </div>
    );
};

const MobileGuestNav = ({ open, isOpen }: { open: boolean; isOpen: (open: boolean) => void }) => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/login" && (
                <div onClick={() => isOpen(true)}>
                    <MenuOutlined className={` text-2xl ${colors.text.primary}`} />
                </div>
            )}
            <Drawer
                title={APPNAME}
                placement="right"
                open={open}
                onClose={() => isOpen(false)}
                width={window.innerWidth}
            >
                <div className='w-full flex flex-col justify-center gap-5'>
                    <NavLink
                        onClick={() => isOpen(false)}
                        to="/login"
                        className="w-full rounded-md relative overflow-hidden shadow-list border flex justify-center"
                    >
                        <div className="flex items-center gap-5 text-md justify-start px-4 py-3">
                            <span>Login</span>
                        </div>
                    </NavLink>

                    {/* Priceing Section */}


                    {/* Features Section */}


                    {/* Docs Section */}


                    {/* Community Section */}


                    {/* Blog Section */}

                </div>
            </Drawer>
        </>
    );
};
const MobileNav = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex w-full overflow-hidden md:hidden items-center justify-between px-5">
            <div className={`flex items-center gap-2 ${colors.text.primary}`}>
                <GitlabFilled className={`text-2xl ${colors.text.primary}`} />
                <span className=" text-xl font-bold ">{APPNAME}</span>
            </div>
            <div className="flex items-center">
                {isAuthenticated ? (
                    <MobileUserNav open={open} isOpen={setOpen} />
                ) : (
                    <MobileGuestNav open={open} isOpen={setOpen} />
                )}
            </div>
        </nav>
    );
};

export default MobileNav;
