import { useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import LeftSection from "@/components/LeftSection";
import { Box } from "@chakra-ui/react";
import DashNav from "@/components/Dashboard/DashNav"
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation(); // React Router current path

    // Scroll to top whenever route changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [pathname]);

    return (

        <Box w="100vw" minW={"base"} h="100vh" display="flex">

            {/* Sidebar */}
            <Box w="250px" bg="gray.900" color="white" display={{base:'none', md:'none', lg:'block'}}>
                <LeftSection />
            </Box>

            {/* Right Content */}
            <Box flex="1" display="flex" flexDirection="column" overflow={{base:'hidden', md:'auto', lg:'auto'}}>
                <DashNav />

                <Box ref={scrollRef} flex="1" overflowY="auto" css={{

                    bg: "rgb(225, 226, 239)",
                    // For Chrome, Safari and Opera
                    "&::-webkit-scrollbar": {
                        width: 0,
                        height: 0,
                        display: "none",
                    },
                    // For Firefox
                    scrollbarWidth: "none",
                    // For IE, Edge and Firefox
                    "-ms-overflow-style": "none",
                }}>
                    <Outlet />
                    <Footer />
                </Box>
            </Box>

        </Box>
        // <Box
        //     flex="1"
        //     h="100vh"
        //     overflowY="auto"
        //     css={{
        //         bg: "rgb(225, 226, 239)",

        //         "&::-webkit-scrollbar": {
        //             width: 0,
        //             height: 0,
        //             display: "none",
        //         },

        //         scrollbarWidth: "none",
        //         "-ms-overflow-style": "none",
        //     }}
        // >
        //     {children}
        // </Box>
    );
};

export default MainLayout;