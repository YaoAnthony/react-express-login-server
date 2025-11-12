//react
import { useLayoutEffect } from 'react'

//react route dom
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

//api
import { profileApi } from "./api/profileApi";
//redux
import { store } from './Redux/store';
//motion
import { AnimatePresence } from 'motion/react';

//pages
import {
    MainPage,
    Dashboard,
} from './Pages'
// Dashboard
import { 
    Overview,
    Setting,
    Teams,
 } from './Pages/Dashboard/component';


//feature page
import { LoginRegisterPage, GithubCallback } from './Features';

// theme
import { useThemeSync } from './hook/useThemeSync';

// Scroll to the top of the page when the location changes
function ScrollToTop() {
    const location = useLocation();

    useLayoutEffect(() => {
        // Scroll to the top of the page when the location changes
        window.scrollTo(0, 0);
    }, [location]);

  // Return null as this component doesn't render anything
  return null;
}
const App = () => {
    const location = useLocation();

    // 处理主题
    useThemeSync();
    
    store.dispatch(profileApi.endpoints.getProfileAndUser.initiate());
    
    return (
        
        <div className="relative w-full min-h-screen">
            <ScrollToTop />
            
            <AnimatePresence mode="wait">
                
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<MainPage />} />


                    <Route path="/login" element={<LoginRegisterPage />} />

                    <Route path="/github-callback" element={<GithubCallback />} />



                    {/* Dashborad */}
                    <Route path="/dashboard" element={<Dashboard />} >
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="setting" element={<Setting />} />
                        <Route path="teams" element={<Teams />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
        
    );
}


export default App;
