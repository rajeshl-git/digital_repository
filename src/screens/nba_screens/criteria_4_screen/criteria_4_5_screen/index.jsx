import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme, IconButton} from "@mui/material";
import { DataGrid, GridCellModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import DataObjectIcon from '@mui/icons-material/DataObject';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Criteria_4_5_1_Screen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows_4_5_1, setRows_4_5_1] = useState([]);
  const [rows_4_5_2_m1, setRows_4_5_2_m1] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSubmitButtonClick = () => {
    window.location.reload();
  };
  const handleFileUpload = async (event, row) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append('proof', file);
        formData.append('criteria_name', row.criteria_name); // Add other necessary fields
        formData.append('division_name', row.division_name);
        formData.append('item_no', row.item_no);
        formData.append('student_name', row.student_name);
        formData.append('enrollment_no', row.enrollment_no);
        formData.append('company_name', row.company_name);
        formData.append('appointment_reference_no', row.appointment_reference_no);
  
        try {
          const response = await fetch(`http://localhost:2003/criteria_4_5_2_m1`, {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log('Document inserted successfully!', data);
        } catch (error) {
          console.error('Error inserting document:', error);
        }
      } else {
        alert('Please upload a valid file (PDF, JPG, JPEG)');
      }
    }
  };
  
  const fetchDataAndRefreshTable = (criteria) => {
    fetch(`http://localhost:2003/${criteria}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (criteria === "criteria_4_5_1") {
          const updatedRows = data.data.map(row => ({ ...row, id: row._id }));
          const averageRow = {
            id: '66268fe2a1e43735599f990e',
            item_no: 5,
            item_name: "X+Y+Z",
            LYG_17_18: (updatedRows[1].LYG_17_18) + (updatedRows[2].LYG_17_18) + (updatedRows[3].LYG_17_18),
            LYGm1_16_17: (updatedRows[1].LYGm1_16_17) + (updatedRows[2].LYGm1_16_17) + (updatedRows[3].LYGm1_16_17),
            LYGm2_15_16: (updatedRows[1].LYGm2_15_16) + (updatedRows[2].LYGm2_15_16) + (updatedRows[3].LYGm2_15_16),
          };
          const divisionRow = {
            id: '66268ffda1e43735599f990f', // Unique id for the division row
            item_no:6,
            item_name: "Placement Index:(X+Y+Z)/N",
            LYG_17_18: ((parseFloat(averageRow.LYG_17_18)/parseFloat(updatedRows[0].LYG_17_18))).toFixed(2),
            LYGm1_16_17:((parseFloat(averageRow.LYGm1_16_17)/parseFloat(updatedRows[0].LYGm1_16_17))).toFixed(2),
            LYGm2_15_16: ((parseFloat(averageRow.LYGm2_15_16)/parseFloat(updatedRows[0].LYGm2_15_16))).toFixed(2),
          };
          const averageRow2 = {
            id: '6626997e0c7f95d3f39f990a',
            item_no: 7,
            item_name: "Average placement= (P1 + P2 + P3)/3",
            LYG_17_18: ((parseFloat(divisionRow.LYG_17_18) + parseFloat(divisionRow.LYGm1_16_17) + parseFloat(divisionRow.LYGm1_16_17)) / 3).toFixed(2),
            LYGm1_16_17: ((parseFloat(divisionRow.LYG_17_18) + parseFloat(divisionRow.LYGm1_16_17) + parseFloat(divisionRow.LYGm1_16_17)) / 3).toFixed(2),
            LYGm2_15_16: ((parseFloat(divisionRow.LYG_17_18) + parseFloat(divisionRow.LYGm1_16_17) + parseFloat(divisionRow.LYGm1_16_17)) / 3).toFixed(2),
          };
          
         
          setRows_4_5_1(updatedRows);
          setLoading(false);
          updateDataAndRefreshTable("criteria_4_5_1",averageRow);
          updateDataAndRefreshTable("criteria_4_5_1",divisionRow);
          updateDataAndRefreshTable("criteria_4_5_1",averageRow2);
      
        }else if (criteria === "criteria_4_5_2_m1") {
          const updatedRows = data.data.map(row => ({ ...row, id: row._id }));
          setRows_4_5_2_m1(updatedRows); // Set rows for the second subdivision
        }
        })

      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDataAndRefreshTable("criteria_4_5_1");
    fetchDataAndRefreshTable("criteria_4_5_2_m1");
  }, []);
  const updateDataAndRefreshTable = async (criteria, updatedRow) => {
    try {
      const response = await fetch(`http://localhost:2003/${criteria}/${updatedRow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRow),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  const insertDataAndRefreshTable = async (criteria) => {
    try {
      const newDocument = {
        item_no: rows_4_5_2_m1.length + 1, // Adjust this based on your logic
        student_name: "",
        enrollment_no: "",
        company_name: "",
        appointment_reference_no: ""
      };

      const response = await fetch(`http://localhost:2003/rit_nba/${criteria}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDocument),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRows_4_5_2_m1(prevRows => [...prevRows, { ...newDocument, id: data.insertedId }]);

      console.log('Document inserted successfully!');
    } catch (error) {
      console.error('Error inserting document:', error);
    }
  };
  const processRowUpdate_4_5_1 = React.useCallback(
    async (updatedRow) => {
      updateDataAndRefreshTable("criteria_4_5_1", updatedRow);
      return updatedRow;
    },
  );
  const processRowUpdate_4_5_2_m1 = React.useCallback(
    async (updatedRow) => {
      updateDataAndRefreshTable("criteria_4_5_2_m1", updatedRow);
      return updatedRow;
    },
  );


  const handleProcessRowUpdateError = React.useCallback((error) => {
    return error;
  }, []);

  const column_4_5_1 = [
    {
      field: "item_no",
      headerName: "NO",
      flex: 0.45,
    },
    {
      field: "item_name",
      headerName: "ITEM NAME",
      flex: 3,
    },
    {
      field:"LYG_17_18",
      headerName:"LYG_17_18",
      flex:1,
      editable: true,
    },
    {
      field:"LYGm1_16_17",
      headerName:"LYGm1_16_17",
      flex:1,
      editable: true,
    },
    {
      field:"LYGm2_15_16",
      headerName:"LYGm2_15_16",
      flex:1,
      editable: true,
    },
   

  ];
  const column_4_5_2_m1 = [
    {
      field: "item_no",
      headerName: "NO",
      flex: 0.45,
    },
    {
      field: "student_name",
      headerName: "STUDENT NAME",
      flex: 2,
    },
    {
      field:"enrollment_no",
      headerName:"ENROLLMENT NO",
      flex:2,
    },
    {
      field:"company_name",
      headerName:"COMPANY NAME",
      flex:2,
    },
    {
      field:"appointment_reference_no",
      headerName:"APPOINTMENT REFERENCE NO",
      flex:2,
    },
    {
      field:"proof",
      headerName:"PROOF",
      flex:1,
      renderCell: (params) => (
        <IconButton
      component="label"
      sx={{
        color: colors.blueAccent[700],
      }}
    >
      <CloudUploadIcon />
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg"
        hidden
        onChange={(event) => handleFileUpload(event, params.row)}
      />
    </IconButton>
    
      ),
    
   
    },
   

  ];
  

  return (
    <Box m="20px">
      <Header
        title="STUDENT PERFORMANCE"
        subtitle="List of criteria 4.4 tables"
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
        <Typography variant="h4" fontWeight="bold">4.5.1: Placement, Higher Studies and Entrepreneurship"
</Typography>
         <div>
          <DataGrid
            rows={rows_4_5_1}
            columns={column_4_5_1}
            isCellEditable={(params) => params.row.item_no != 5 && params.row.item_no != 6} 
            processRowUpdate={(updatedRow) =>
              processRowUpdate_4_5_1(updatedRow)
            }
            onProcessRowUpdateError={handleProcessRowUpdateError}          
            style={{fontSize:"15px"}}
            getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
            sx={{
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
            }}
            slots={{
              toolbar: () => {
                return (
                  <GridToolbarContainer>
                    <GridToolbarExport />
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarFilterButton />
                    <GridToolbarQuickFilter />
                  </GridToolbarContainer>
                );
              },
            }}
            
          />
        </div>
        <Box m={"5px"}>
          <Button 
          onClick={handleSubmitButtonClick}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
            }}
            style={{
              position: 'absolute',right:0,fontSize: "14px", fontWeight:"bold"
            }}
          >
            Submit
          </Button>
        </Box>
        <Box m={"60px 0 0 0"}>
          <Typography variant="h4" fontWeight="bold">4.5.2: Provide the Placement Data in the below mentioned Format with the Name
          of the Program and the Assessment Year</Typography>
          <div>
          <DataGrid
            rows={rows_4_5_2_m1}
            columns={column_4_5_2_m1}
            isCellEditable={(params) => params.row.item_no != 5 && params.row.item_no != 6} 
            processRowUpdate={(updatedRow) =>
              processRowUpdate_4_5_2_m1(updatedRow)
            }
            onProcessRowUpdateError={handleProcessRowUpdateError}          
            style={{fontSize:"15px"}}
            getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
            sx={{
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
            }}
            slots={{
              toolbar: () => {
                return (
                  <GridToolbarContainer>
                    <GridToolbarExport />
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarFilterButton />
                    <GridToolbarQuickFilter />
                  </GridToolbarContainer>
                );
              },
            }}
            
          />
        </div>
        <Box m={"5px"}>
          <Button 
          onClick={handleSubmitButtonClick}
            sx={{
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
            }}
            style={{
              position: 'absolute',right:0,fontSize: "14px", fontWeight:"bold"
            }}
          >
            Submit
          </Button>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Criteria_4_5_1_Screen;