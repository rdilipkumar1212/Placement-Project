import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Menu as MenuIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Sidebar = ({ profile = {}, sideBarLists, title }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();
  const { studentId, companyId, collegeId } = useParams();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const handleNavigatePage = (path) => {
    if (path === '/signin') {
      localStorage.clear();
      navigate('/signin');
      return;
    }
    navigate('/' + (studentId || companyId || collegeId) + path);
  };

  const drawerContent = (
    <Box
      sx={{
        width: isMinimized ? 72 : 240,
        backgroundColor: '#321353',
        color: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMinimized ? 'center' : 'space-between',
          padding: '10px',
          borderBottom: '1px solid white',
        }}
      >
        {!isMinimized && (
          <Box  sx={{ marginLeft:"auto",marginTop:"25px"}}>
            <Avatar
              src={profile?.imgUrl || ''}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {profile?.profileName}
            </Typography>
            <Typography variant="body2">{profile?.role}</Typography>
          </Box>
        )}
        <IconButton
          onClick={toggleSidebar}
          sx={{ color: '#fff', marginLeft: isMinimized ? 0 : 'auto' }}
        >
          {isMinimized ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      {/* List Section */}
      <List>
        {sideBarLists?.map((link, index) => (
          <Tooltip
            key={index}
            title={isMinimized ? link.label : ''}
            placement="right"
            arrow
          >
            <ListItemButton
              onClick={() => handleNavigatePage(link.path)}
              sx={{
                justifyContent: isMinimized ? 'center' : 'flex-start',
                padding: isMinimized ? '8px 0' : '8px 16px',
              }}
            >
              <ListItemIcon sx={{
            color: '#fff',
            minWidth: 0,
            marginRight: isMinimized ? '0px' : '8px', 
          }}>
                {link.icon}
              </ListItemIcon>
              {!isMinimized && (
                <ListItemText primary={link.label} sx={{ color: '#fff' }} />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar for Mobile */}
      <AppBar position="fixed" sx={{ display: { sm: 'none' } }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className=''>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: isMinimized ? 72 : 240 }, flexShrink: { sm: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isMinimized ? 72 : 240,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isMinimized ? 72 : 240,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
