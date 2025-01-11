import React, { useState, useEffect, } from "react";
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { DataGrid, GridCellModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Header from "../../../components/Header.jsx";
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useNavigate } from 'react-router-dom';
import { tokens } from "../../../theme";

const Index_Screen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleOpen = (rowData) => {
      // Perform action to open another page or any other desired action
      switch(rowData.item_no){
        case 4:{
          navigate("/criteria_4_index_screen",{replace:false});
          break;
        }
        
      }
        
      
        
      // Example: navigate to another page
      // history.push('/another-page');
    };
  
    useEffect(() => {
      fetch("http://localhost:2003/criterias")
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setRows(data.data.map(row => ({ ...row, id: row._id })));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);
   
  
    const column_index = [
      {
        field: "item_no",
        headerName: "NO",
        flex: 0.45,
      },
      {
        field: "item_name",
        headerName: "ITEM NAME",
        flex: 4,
      },
      {
        field:"open",
        headerName:"OPEN",
        flex:1,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(params.row)}
            sx={{
            
              backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.primary[500],
            },
            }}
          >
            Open
          </Button>
        ),
      
     
      },
      {
        field:"completed",
        headerName:"COMPLETED",
        flex:1,
    
      },
      {
        field:"download",
        headerName:"DOWNLOAD",
        flex:1,
        renderCell: (params) => (
          <Button 
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
          }}
          >
            Download
          </Button>
        )
        

      },
      
  
    ];
  
    return (
      <Box m="20px">
        <Header
          title="STUDENT PERFORMANCE"
          subtitle="List of Criterias"
        />
        <Box
          m="10px 0 0 0"
          height="75vh"
          sx={{
            position: 'relative', // Make the container position relative
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]}!important`,
            },
          }}
        >
          
          <div>
            <DataGrid
              rows={rows}
              columns={column_index}
              style={{fontSize:"15px"}}
              slots={{toolbar:()=>{
                return <GridToolbarContainer><GridToolbarExport/><GridToolbarDensitySelector/><GridToolbarQuickFilter/></GridToolbarContainer>
              }}}
            />
          </div>
        </Box>
      </Box>
    );
  }
  export default Index_Screen;