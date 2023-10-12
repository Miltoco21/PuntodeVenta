/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Settings } from "@mui/icons-material";

const NavBar = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    // Update the date and time every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear user session and redirect to the login page
    console.log("Logging out...");
    // Replace the following line with your actual logout logic
    // logout();
  };

  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: "10vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Outer Paper with a blue background */}
        <Paper
          elevation={3}
          style={{ padding: 5, flex: 1, backgroundColor: "blue" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
              <Typography variant="h4" color={"white"}
              sx={{padding: 2}}>
                EasyPOS
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Paper elevation={3} style={{ padding: 10 }}>
                <Typography variant="h4">NOMBRE ESTABLECIMIENTO</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={2} >
              <Typography variant="h5" >Fecha:{formattedDate}</Typography>
              <Typography variant="h5">Hora:{formattedTime}</Typography>
            </Grid>
            <Grid item xs={6} md={1}>
              <IconButton onClick={handleMenuOpen}
                style={{ padding: '8px' }} 
               >
                <Settings fontSize="large"/>
              </IconButton>
              {/* User Settings Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => setIsLogoutDialogOpen(true)}>
                  Cerrar sesión
                </MenuItem>
                <MenuItem onClick={() => setIsLogoutDialogOpen(true)}>
                  Configuración
                </MenuItem>
                <MenuItem onClick={() => setIsLogoutDialogOpen(true)}>
                  Más
                </MenuItem>
                {/* Add other settings/options here */}
              </Menu>
              {/* Logout Confirmation Dialog */}
              <Dialog
                open={isLogoutDialogOpen}
                onClose={() => setIsLogoutDialogOpen(false)}
              >
                <DialogTitle>Logout</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to logout?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setIsLogoutDialogOpen(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleLogout} color="primary">
                    Logout
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default NavBar;
