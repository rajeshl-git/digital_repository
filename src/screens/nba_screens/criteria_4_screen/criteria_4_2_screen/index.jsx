import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { DataGrid, GridCellModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import DataObjectIcon from '@mui/icons-material/DataObject';

const Criteria_4_2_Screen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows_4_2_1, setRows_4_2_1] = useState([]);
  const [rows_4_2_2, setRows_4_2_2]= useState([]);
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
        if (criteria === "criteria_4_2_1") {
           const updatedRows = data.data.map(row => ({ ...row, id: row._id }));
          // Calculate division and add a new row
          const divisionRow = {
            id: '661bc832608898eddd9f990d', // Unique id for the division row
            item_no: 3,
            item_name: "Success Index (SI)",
            LYG_2017_2018: (updatedRows[1].LYG_2017_2018 / updatedRows[0].LYG_2017_2018).toFixed(2),
            LYGm1_2016_2017: (updatedRows[1].LYGm1_2016_2017 / updatedRows[0].LYGm1_2016_2017).toFixed(2),
            LYGm2_2015_2016: (updatedRows[1].LYGm2_2015_2016 / updatedRows[0].LYGm2_2015_2016).toFixed(2)
          };
          const averageRow = {
            id: '661bc862608898eddd9f990e',
            item_no: 4,
            item_name: "Average SI= (S1+S2+S3)/3",
            LYG_2017_2018: ((parseFloat(divisionRow.LYG_2017_2018) + parseFloat(divisionRow.LYGm1_2016_2017) + parseFloat(divisionRow.LYGm2_2015_2016)) / 3).toFixed(2),
            LYGm1_2016_2017: ((parseFloat(divisionRow.LYG_2017_2018) + parseFloat(divisionRow.LYGm1_2016_2017) + parseFloat(divisionRow.LYGm2_2015_2016)) / 3).toFixed(2),
            LYGm2_2015_2016: ((parseFloat(divisionRow.LYG_2017_2018) + parseFloat(divisionRow.LYGm1_2016_2017) + parseFloat(divisionRow.LYGm2_2015_2016)) / 3).toFixed(2),
          };
          setRows_4_2_1(updatedRows);
          setLoading(false);
          updateDataAndRefreshTable("criteria_4_2_1",divisionRow);
          updateDataAndRefreshTable('criteria_4_2_1',averageRow);
        }
        if (criteria === "criteria_4_2_2") {
          const updatedRows = data.data.map(row => ({ ...row, id: row._id }));
          // Calculate division and add a new row
          const divisionRow = {
            id: '661ce577c08ebf407c9f990c', // Unique id for the division row
            item_no: 3,
            item_name: "Success Index (SI)",
            LYG_2017_2018: (updatedRows[1].LYG_2017_2018 / updatedRows[0].LYG_2017_2018).toFixed(2),
            LYGm1_2016_2017: (updatedRows[1].LYGm1_2016_2017 / updatedRows[0].LYGm1_2016_2017).toFixed(2),
            LYGm2_2015_2016: (updatedRows[1].LYGm2_2015_2016 / updatedRows[0].LYGm2_2015_2016).toFixed(2)
          };
          const averageRow = {
            id: '661ce59ec08ebf407c9f990d',
            item_no: 4,
            item_name: "Average SI= (S1+S2+S3)/3",
            LYG_2017_2018: ((parseFloat(divisionRow.LYG_2017_2018) + parseFloat(divisionRow.LYGm1_2016_2017) + parseFloat(divisionRow.LYGm2_2015_2016)) / 3).toFixed(2),
            LYGm1_2016_2017: ((parseFloat(divisionRow.LYG_2017_2018) + parseFloat(divisionRow.LYGm1_2016_2017) + parseFloat(divisionRow.LYGm2_2015_2016)) / 3).toFixed(2),
            LYGm2_2015_2016: ((parseFloat(divisionRow.LYG_2017_2018) + parseFloat(divisionRow.LYGm1_2016_2017) + parseFloat(divisionRow.LYGm2_2015_2016)) / 3).toFixed(2),
          };
          setRows_4_2_2(data.data.map(row => ({ ...row, id: row._id })));
          setLoading(false);
          updateDataAndRefreshTable("criteria_4_2_2",divisionRow);
          updateDataAndRefreshTable('criteria_4_2_2',averageRow);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDataAndRefreshTable("criteria_4_2_1")
  }, []);
  useEffect(() => {
    fetchDataAndRefreshTable("criteria_4_2_2")
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
  const processRowUpdate_4_2_1 = React.useCallback(
    async (updatedRow) => {
      updateDataAndRefreshTable("criteria_4_2_1", updatedRow);
      return updatedRow;
    },
  );
  const processRowUpdate_4_2_2 = React.useCallback(
    async (updatedRow) => {
      updateDataAndRefreshTable("criteria_4_2_2", updatedRow);
      return updatedRow;
    },
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    return error;
  }, []);

  const column_4_2_1 = [
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
      field:"LYG_2017_2018",
      headerName:"LYG_2017_2018",
      flex:1,
      editable: true,
    },
    {
      field:"LYGm1_2016_2017",
      headerName:"LYGm1_2016_2017",
      flex:1,
      editable: true,
    },
    {
      field:"LYGm2_2015_2016",
      headerName:"LYGm2_2015_2016",
      flex:1,
      editable: true,
    },
   

  ];
  const column_4_2_2 =[
    {
      field:"item_no",
      headerName:"NO",
      flex:0.4,
    },
    {
      field:"item_name",
      headerName:"ITEM",
      flex:3,
    },
    {
      field:"LYG_2017_2018",
      headerName:"LYG_2017_2018",
      flex:1,
      editable: true,
    },
    {
        field:"LYGm1_2016_2017",
        headerName:"LYGm1_2016_2017",
        flex:1,
        editable: true,
      },
    {
      field:"LYGm2_2015_2016",
      headerName:"LYGm2_2015_2016",
      flex:1,
      editable: true,
    }
  ]

  return (
    <Box m="20px">
      <Header
        title="STUDENT PERFORMANCE"
        subtitle="List of criteria 4.2 tables"
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
        <Typography variant="h4" fontWeight="bold">4.2.1: SUCCESS RATE WITHOUT BACKLOGS IN ANY SEMESTER / YEAR OF STUDY</Typography>
         <div>
          <DataGrid
            rows={rows_4_2_1}
            columns={column_4_2_1}
            isCellEditable={(params) => params.row.item_no != 3 && params.row.item_no != 4 && params.row.item_no != 5} 
            processRowUpdate={(updatedRow) =>
              processRowUpdate_4_2_1(updatedRow)
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
          <Typography variant="h4" fontWeight="bold">4.2.2: SUCCESS RATE IN STIPULATED PERIOD OF STUDY</Typography>
          <div>
          <DataGrid
            rows={rows_4_2_2}
            columns={column_4_2_2}
            isCellEditable={(params) => params.row.item_no != 3 && params.row.item_no != 4 && params.row.item_no != 5} 
            processRowUpdate={(updatedRow) =>
              processRowUpdate_4_2_2(updatedRow)
            }
            onProcessRowUpdateError={handleProcessRowUpdateError}
            style={{fontSize:"15px"}}
            slots={{toolbar:()=>{
              return <GridToolbarContainer><GridToolbarExport/><GridToolbarColumnsButton/><GridToolbarDensitySelector/><GridToolbarFilterButton/><GridToolbarQuickFilter/></GridToolbarContainer>
            }}}
            getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
            sx={{
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
            }}
          />
        </div>
          <Box
        m={"5px"}
        >
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
export default Criteria_4_2_Screen;