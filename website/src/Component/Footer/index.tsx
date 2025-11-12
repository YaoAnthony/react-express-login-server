import { colors, styles } from "../../style";

import {
    MailOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    YoutubeOutlined,
    RedditOutlined,
    GithubOutlined,
} from "@ant-design/icons";

// NavLink
import { NavLink } from "react-router-dom";

const Footer = () => {

    //['Features', 'Docs', 'Community', 'Blog'];
    const navLists = ['Features', 'Docs', 'Community', 'Blog'];

    const socials = [
        {
            icon: <MailOutlined />,
            link: "mailto"
        },
        {
            icon: <TwitterOutlined />,
            link: "https://twitter.com"
        },
        {
            icon: <LinkedinOutlined />,
            link: "https://linkedin.com"
        },
        {
            icon: <YoutubeOutlined />,
            link: "https://youtube.com"
        },
        {
            icon: <RedditOutlined />,
            link: "https://reddit.com"
        },
        {
            icon: <GithubOutlined />,
            link: "https://github.com"
        },
    ];
    // dark:bg-[#1E3A89] 
    return (
        <footer className={`${styles.paddingX} 
            relative flex flex-col md:flex-row justify-start 
            text-white py-10 
            gap-8 md:gap-48`}>

            <div className="flex flex-col justify-between">

                <div className="w-full justify-center flex gap-5">
                    {socials.map((social, index) => (
                        <a key={index} href={social.link} className={`text-2xl transition-all ${colors.text.primary}`}>
                            {social.icon}
                        </a>
                    ))}
                </div>

            </div>
            <div className="flex flex-col items-start">
                {navLists.map((link, index) => (
                    <NavLink
                    key={index}
                    to={`/${link.toLowerCase()}`}
                    className="px-5 text-gray-400 cursor-pointer hover:text-white transition-all text-lg"
                    >
                    {link}
                    </NavLink>
                ))}
            </div>

            <div className="flex flex-col items-start">
                {navLists.map((link, index) => (
                    <NavLink
                    key={index}
                    to={`/${link.toLowerCase()}`}
                    className="px-5 text-gray-400 cursor-pointer hover:text-white transition-all text-lg"
                    >
                    {link}
                    </NavLink>
                ))}
            </div>

            <div className="flex flex-col items-start">
                {navLists.map((link, index) => (
                    <NavLink
                    key={index}
                    to={`/${link.toLowerCase()}`}
                    className="px-5 text-gray-400 cursor-pointer hover:text-white transition-all text-lg"
                    >
                    {link}
                    </NavLink>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
