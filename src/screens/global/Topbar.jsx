import React from 'react';
import { Box, IconButton, colors, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import { useContext } from 'react';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Theme } from '@fullcalendar/core/internal';



const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box display= "flex" justifyContent= "space-between" p={2}>
      {/*Search bar*/}
      <Box
      display= "flex"
      backgroundColor = {colors.primary[400]}
      borderRadius= "3pix"
      >
        <InputBase sx={{ml:2,flex:1}} placeholder = "search"/>
        <IconButton type='button' sx={{p: 1}}>
          <SearchIcon/>
        </IconButton>
      </Box>
      {/*ICONS*/}
      <Box display= "flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark"?(
            <DarkModeOutlinedIcon/>
          ):(
            <LightModeOutlinedIcon/>
          )
        }
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon/>
        </IconButton>

        <IconButton>
          <SettingsOutlinedIcon/>
        </IconButton>

        <IconButton>
          <PersonOutlinedIcon/>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar   