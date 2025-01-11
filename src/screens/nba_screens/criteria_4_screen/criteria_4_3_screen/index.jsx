import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { DataGrid, GridCellModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import DataObjectIcon from '@mui/icons-material/DataObject';

const Criteria_4_3_1_Screen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows_4_3_1, setRows_4_3_1] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSubmitButtonClick = () => {
    window.location.reload();
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
        if (criteria === "criteria_4_3_1") {
          const updatedRows = data.data.map(row => ({ ...row, id: row._id }));
          const divisionRow = {
            id: '662609aeae51122dc29f990d', // Unique id for the division row
            item_no:4,
            item_name: "API=X*(Y/Z)",
            CAYm3_18_19: (updatedRows[0].CAYm3_18_19)*( updatedRows[1].CAYm3_18_19/ updatedRows[2].CAYm3_18_19).toFixed(2),
            LYG_17_18:(updatedRows[0].LYG_17_18)*( updatedRows[1].LYG_17_18/ updatedRows[2].LYG_17_18).toFixed(2),
            LYGm1_16_17:(updatedRows[0].LYGm1_16_17)*( updatedRows[1].LYGm1_16_17/ updatedRows[2].LYGm1_16_17).toFixed(2)
          };
          const averageRow = {
            id: '662609d1ae51122dc29f990e',
            item_no: 5,
            item_name: "Average API= (API1 + API2 + API3)/3",
            CAYm3_18_19: ((parseFloat(divisionRow.  CAYm3_18_19) + parseFloat(divisionRow.LYG_17_18) + parseFloat(divisionRow.LYGm1_16_17)) / 3).toFixed(2),
            LYG_17_18: ((parseFloat(divisionRow.  CAYm3_18_19) + parseFloat(divisionRow.LYG_17_18) + parseFloat(divisionRow.LYGm1_16_17)) / 3).toFixed(2),
            LYGm1_16_17: ((parseFloat(divisionRow.  CAYm3_18_19) + parseFloat(divisionRow.LYG_17_18) + parseFloat(divisionRow.LYGm1_16_17)) / 3).toFixed(2),
          };
          const assesment = {
            id: '662609faae51122dc29f990f',
            item_no: 6 ,
            item_name: "Assesment[1.5 * API]",
            CAYm3_18_19: (1.5*(parseFloat(averageRow.CAYm3_18_19)) ).toFixed(2),
            LYG_17_18: (1.5*(parseFloat(averageRow.LYG_17_18)) ).toFixed(2),
            LYGm1_16_17: (1.5*(parseFloat(averageRow.LYGm1_16_17)) ).toFixed(2),
          };
          setRows_4_3_1(updatedRows);
          setLoading(false);
          updateDataAndRefreshTable("criteria_4_3_1",divisionRow);
          updateDataAndRefreshTable("criteria_4_3_1",averageRow);
          updateDataAndRefreshTable("criteria_4_3_1",assesment);
        }
        })

      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDataAndRefreshTable("criteria_4_3_1")
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
  const processRowUpdate_4_3_1 = React.useCallback(
    async (updatedRow) => {
      updateDataAndRefreshTable("criteria_4_3_1", updatedRow);
      return updatedRow;
    },
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    return error;
  }, []);

  const column_4_3_1 = [
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
      field:"CAYm3_18_19",
      headerName:"CAYm3_18_19",
      flex:1,
      editable: true,
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
   

  ];
  

  return (
    <Box m="20px">
      <Header
        title="STUDENT PERFORMANCE"
        subtitle="List of criteria 4.3 tables"
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
        <Typography variant="h4" fontWeight="bold">4.3: Academic Performance in Third Year"
</Typography>
         <div>
          <DataGrid
            rows={rows_4_3_1}
            columns={column_4_3_1}
            isCellEditable={(params) => params.row.item_no != 4 && params.row.item_no != 5 && params.row.item_no != 6} 
            processRowUpdate={(updatedRow) =>
              processRowUpdate_4_3_1(updatedRow)
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
      </Box>
    </Box>
  );
}
export default Criteria_4_3_1_Screen;