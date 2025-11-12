// react
import React, { useRef, memo } from "react";

// style
import { styles } from "../../style";

// components
import Hero from "./Hero";
import Navbar from "../../Component/Navigation/Navbar";
import Footer from "../../Component/Footer";
import MobileFloatThemeButton from "../../Component/FloatDarkLightSwitch";

// 包装 memo 版本
const MemoHero = memo(Hero);
const MemoFooter = memo(Footer);


const MainPage: React.FC = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null!);
  return (
    <main className="relative w-full overflow-hidden md:overflow-visible z-0 bg-white-background dark:bg-dark-background ">
        <Navbar />

        <MemoHero scrollTargetRef={scrollTargetRef} />
        <MobileFloatThemeButton />


        <MemoFooter />
    </main>
  );
};

export default MainPage;
