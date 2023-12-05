// import * as React from 'react';
import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Header() {
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event.key === 'Tab' || event.key === 'Shift'))
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  }
  const list = (anchor) => (
    <Box
      sx={{ width: '250px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={require("../logo/logo.jpeg")} width="40" height="50" />
            </ListItemIcon>
            <ListItemText primary="qVis" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Typography variant="body1">{text}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer('left', true)}>
            {/* <MenuIcon /> */}
            <img src={require("../logo/logo.jpeg")} width="40" height="50" />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={state.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
          <Typography variant="h6" color="inherit" component="div">
            qVis
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}