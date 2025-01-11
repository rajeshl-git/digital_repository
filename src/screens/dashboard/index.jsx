import React from 'react';
import { Box , Button,useTheme} from '@mui/material';
import Header from "../../components/Header";
import { tokens } from '../../theme';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Statbox from "../../components/Statbox";
import TopicIcon from '@mui/icons-material/Topic';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => { 
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px"
    >
    <Box display='flex' justifyContent= "space-between" alignItems= "center"
    >
      <Header title="DASHBOARD" subtitle= "Welcome"/>
    </Box>
    <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
         {/* GRID & CHARTS */}
         <Box
         display="grid"
         gridTemplateColumns="repeat(10, 1fr)"
         gridAutoRows="200px"
         gap="30px"
         >
          {/* ROW 1 */}
          <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          >
            <Statbox
            title="STUDENT DATABASE"
            subtitle="upload here.."
            progress="0.10"
            increase="10%"
            clickable={true}
            onClick={()=>{
              navigate("/team",{replace:false})
            }}
            icon={
              <DriveFolderUploadIcon
                sx={{ color: colors.greenAccent[500], fontSize: "60px" }}
              />
            }
          />
          </Box>
          <Box
           gridColumn="span 3"
           backgroundColor={colors.primary[400]}
           display="flex"
           alignItems="center"
           justifyContent="center"
          >
            <Statbox
            title="NBA DATABASE"
            subtitle="upload here.."
            progress="0.50"
            increase="50%"
            onClick={()=>{
              navigate("/index_screen",{replace:true})
            }}
            icon={
              <TopicIcon
                sx={{ color: colors.greenAccent[500], fontSize: "60px" }}
              />
            }
            />
          </Box>
          <Box
           gridColumn="span 3"
           backgroundColor={colors.primary[400]}
           display="flex"
           alignItems="center"
           justifyContent="center"
          >
            <Statbox
            title="ACADAMIC DATABASE"
            subtitle="upload here.."
            progress="0.80"
            increase="80%"
            icon={
              <AddToDriveIcon
                sx={{ color: colors.greenAccent[500], fontSize: "60px" }}
              />
            }
          />
          </Box>
         </Box>
    </Box>
  )
}

export default Dashboard