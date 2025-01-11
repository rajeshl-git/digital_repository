import React, { useState, useEffect, } from "react";
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { DataGrid, GridCellModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Header from "../../../../components/Header.jsx";
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useNavigate } from 'react-router-dom';
import { tokens } from "../../../../theme.js";

const Criteria_4_Index_Screen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleOpen = (rowData) => {
      // Perform action to open another page or any other desired action
      switch(rowData.item_no){
        case 1:{
          navigate("/criteria_4_1_screen",{replace:false});
          break;
        }
        case 2:{
          navigate("/criteria_4_2_screen",{replace:false});
          break;
        }
        case 3:{
          navigate("/criteria_4_3_screen",{replace:false});
          break;
        }
        case 4:{
          navigate("/criteria_4_4_screen",{replace:false});
          break;
        }
        case 5:{
          navigate("/criteria_4_5_screen",{replace:false});
          break;
        }
        
      }
        
      
        
      // Example: navigate to another page
      // history.push('/another-page');
    };
  
    useEffect(() => {
      fetch("http://localhost:2003/criteria_4_list")
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
        field:"division",
        headerName:"DIVISION",
        flex:2

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
      
  
    ];
  
    return (
      <Box m="20px">
        <Header
          title="STUDENT PERFORMANCE"
          subtitle="List of criteria 4 tables"
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
  export default Criteria_4_Index_Screen;