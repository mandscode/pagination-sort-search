import { useCallback, useEffect, useRef, useState } from "react";
import UserInfo from "../components/Sections/UserInfo";

const Index = () => {

    const [navbarHeight, setNavbarHeight] = useState(0);
    const mainRef = useRef(null);


    const setMarginToMain = useCallback(() => {
        if (mainRef.current) {
            mainRef.current.style.marginTop = `${navbarHeight}px`;
        }
    }, [navbarHeight]);

    // calculate navbar height
    const calculateNavbarHeight = useCallback(() => {
        const navbar = document.querySelector('header');
        if (navbar) {
            const height = navbar.clientHeight;
            setNavbarHeight(height);
        }
    }, []);

    useEffect(() => {
        // Call the function to calculate navbar height
        calculateNavbarHeight();

        // Call the function to set margin to main element
        setMarginToMain();

        // event listener for window resize
        const handleResize = () => {
            calculateNavbarHeight();
        };

        window.addEventListener('resize', handleResize);

        // cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateNavbarHeight, setMarginToMain]);

    return (
        <>
            <main ref={mainRef}>
                <UserInfo/>
            </main>
        </>
    );
}
 
export default Index;