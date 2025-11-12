import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// motion
import { motion } from "motion/react";

// constants
import { APPNAME, navLists } from "../../../Constant";

// redux
import { useSelector } from "react-redux";

// icons
import { GitlabFilled, MenuOutlined } from "@ant-design/icons";

// types
import { RootState } from "../../../Redux/store";

// style
import { colors, styles } from "../../../style";

// auth modal
import { useAuthModal } from "../../../Features/Authentication/component/ModalAuthContext";

// antd
import { Tooltip } from "antd";

// components
import DarkLightSwitch from "../../DarkLightSwitch";
import DropDownBar from "./DropDownBar";

const DeskTopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);
  const { user } = useSelector((state: RootState) => state.user);
  const { showAuthModal } = useAuthModal();

  const isHome = location.pathname === "/";

  const handleScrollToSection = (id: string) => {
    if (!isHome) {
      navigate(`/#${id}`);
    }

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
        setActiveSection(id); // 手动激活
      }
    }, 100);
  };

  const navItemClass = (active: boolean) =>
    `px-5 cursor-pointer transition-all ${
      active ? colors.text.primary : colors.text.primary
    } ${colors.text.hoverSecondary}`;

  // 自动根据 hash 激活 section（刷新后依然识别）
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setActiveSection(hash);
    }
  }, [location]);

  return (
    <nav className={`hidden md:flex w-full items-center ${styles.paddingX}`}>
      {/* LOGO */}
      <NavLink to="/" className={`flex items-center gap-2 ${colors.text.primary}`}>
        <GitlabFilled className=" text-2xl" />
        <span className="text-2xl font-bold ">{APPNAME}</span>
      </NavLink>

      {/* NAV CENTER */}
      <div className="flex-1 flex justify-center">
        {/* PRICING (Scroll to section) */}
        <div
          onClick={() => handleScrollToSection("pricing")}
          className={navItemClass(isHome && activeSection === "pricing")}
        >
          Pricing
        </div>

        {/* OTHER NAV LINKS */}
        {navLists.map((link, index) => {
          const path = `/${link.toLowerCase()}`;
          return (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) => navItemClass(isActive)}
            >
              {link}
            </NavLink>
          );
        })}
      </div>

      {/* NAV RIGHT */}
      <div className="flex items-center gap-7 justify-end">
        <DarkLightSwitch />

        {isAuthenticated ? (
          <Tooltip
            color="white"
            onOpenChange={() => setIsOpen(false)}
            fresh={true}
            title={<DropDownBar />}
            styles={{
              root: {
                whiteSpace: "normal",
                maxWidth: "none",
                padding: 0,
              },
            }}
          >
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="h-12 flex gap-2 items-center text-lg tracking-wide font-sans cursor-pointer"
            >
              <div onMouseEnter={() => setIsOpen(true)} className="flex items-center gap-2 select-none">
                <img
                  src={user?.image_url}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  style={{ borderWidth: 3 }}
                />
              </div>
            </div>
          </Tooltip>
        ) : (
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <div
              onClick={() => showAuthModal()}
              className={`max-sm:hidden text-lg cursor-pointer select-none ${colors.text.primary}`}
            >
              Login
            </div>
          </motion.div>
        )}

        {/* DOWNLOAD (Scroll to section) */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => handleScrollToSection("download")}
          className={`${navItemClass(isHome && activeSection === "download")} border-2 px-5 py-2 rounded-full`}
        >
          Download
        </motion.div>

        {/* MOBILE MENU ICON */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="text-white text-lg cursor-pointer select-none max-sm:block hidden"
        >
          <MenuOutlined />
        </motion.div>
      </div>
    </nav>
  );
};

export default DeskTopNav;
