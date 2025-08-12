import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Header />
      <Box component="main" sx={{ flex: 1, width: '100%' }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default RootLayout;