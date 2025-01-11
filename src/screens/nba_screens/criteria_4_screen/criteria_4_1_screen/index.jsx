import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Header from "../../../../components/Header";
import { tokens } from "../../../../theme";

const Criteria_4_1_Screen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows_4_1_1, setRows_4_1_1] = useState([]);
  const [rows_4_1_2, setRows_4_1_2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verticalSums, setVerticalSums] = useState({});
  const [averageRatio, setAverageRatio] = useState(0);

  // Function to calculate ratio and update the rows
  const calculateRatioAndUpdateRows = (rows) => {
    const updatedRows = rows.map(row => {
      const ratio = (row.N1 / row.N) * 100;
      return { ...row, ratio: isNaN(ratio) ? 0 : ratio };
    });
    return updatedRows;
  };

  const updateDataInDataGridB = async (dataGridA, dataGridB) => {
    const item1Data = dataGridA.find(item => item.item_no === 1);
    const item2Data = dataGridA.find(item => item.item_no === 2);

    const updatedDataGridB = await Promise.all(dataGridB.map(async item => {
      let updatedRow;
      switch (item.item_no) {
        case 1:
          updatedRow = { ...item, N: item1Data.CAY_21_22, N1: item2Data.CAY_21_22 };
          await updateDataAndRefreshTable("criteria_4_1_2", updatedRow);
          return updatedRow;
        case 2:
          updatedRow = { ...item, N: item1Data.CAYm1_20_21, N1: item2Data.CAYm1_20_21 };
          await updateDataAndRefreshTable("criteria_4_1_2", updatedRow);
          return updatedRow;
        case 3:
          updatedRow = { ...item, N: item1Data.CAYm2_19_20, N1: item2Data.CAYm2_19_20 };
          await updateDataAndRefreshTable("criteria_4_1_2", updatedRow);
          return updatedRow;
        default:
          return item; // Don't modify other items
      }
    }));
    
    const updatedRowsWithRatio = calculateRatioAndUpdateRows(updatedDataGridB);
    setRows_4_1_2(updatedRowsWithRatio);

    // Calculate and set the average ratio
    const totalRatio = updatedRowsWithRatio.reduce((acc, row) => acc + row.ratio, 0);
    const average = updatedRowsWithRatio.length > 0 ? totalRatio / updatedRowsWithRatio.length : 0;
    setAverageRatio(average);
  };

  const calculateVerticalSum = (rows, field) => {
    return rows.reduce((sum, row) => sum + (row[field] || 0), 0);
  };

  const calculateVerticalSums = (rows, fields) => {
    const rowsToCalculate = rows.slice(1, -1);
    const sums = {};
    fields.forEach(field => {
      sums[field] = calculateVerticalSum(rowsToCalculate, field);
    });
    return sums;
  };

  useEffect(() => {
    if (rows_4_1_1.length > 0) {
      const sums = calculateVerticalSums(rows_4_1_1, [
        'CAY_21_22',
        'CAYm1_20_21',
        'CAYm2_19_20',
        'CAYm3_18_19',
        'CAYm4_17_18',
        'CAYm5_16_17',
        'CAYm6_15_16'
      ]);
      setVerticalSums(sums);
      updateDataInDataGridB(rows_4_1_1, [...rows_4_1_2]);  // Pass both DataGrids
      updateDocumentInDatabase(sums);
    }
  }, [rows_4_1_1]);

  const updateDocumentInDatabase = async (sums) => {
    try {
      const response = await fetch(`http://localhost:2003/criteria_4_1_1/6618c6d33e81f887f19f990e`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sums),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

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
        if (criteria === "criteria_4_1_1") {
          setRows_4_1_1(data.data.map(row => ({ ...row, id: row._id })));
          setLoading(false);
        }
        if (criteria === "criteria_4_1_2") {
          const updatedRowsWithRatio = calculateRatioAndUpdateRows(data.data.map(row => ({ ...row, id: row._id })));
          setRows_4_1_2(updatedRowsWithRatio);

          // Calculate and set the average ratio
          const totalRatio = updatedRowsWithRatio.reduce((acc, row) => acc + row.ratio, 0);
          const average = updatedRowsWithRatio.length > 0 ? totalRatio / updatedRowsWithRatio.length : 0;
          setAverageRatio(average);

          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

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

  useEffect(() => {
    fetchDataAndRefreshTable("criteria_4_1_1");
  }, []);

  useEffect(() => {
    fetchDataAndRefreshTable("criteria_4_1_2");
  }, []);

  const processRowUpdate_4_1_1 = React.useCallback(
    async (updatedRow) => {
      updateDataAndRefreshTable("criteria_4_1_1", updatedRow);
      return updatedRow;
    },
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    return error;
  }, []);

  const column_4_1_1 = [
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
      field: "CAY_21_22",
      headerName: "CAY (21-22)",
      flex: 1,
      editable: true,
    },
    {
      field: "CAYm1_20_21",
      headerName: "CAY m1 (20-21)",
      flex: 1,
      editable: true,
    },
    {
      field: "CAYm2_19_20",
      headerName: "CAY m2 (19-20)",
      flex: 1,
      editable: true,
    },
    {
      field: "CAYm3_18_19",
      headerName: "CAY m3 (18-19)",
      flex: 1,
      editable: true,
    },
    {
      field: "CAYm4_17_18",
      headerName: "CAY m4 (17-18)",
      flex: 1,
      editable: true,
    },
    {
      field: "CAYm5_16_17",
      headerName: "CAY m5 (16-17)",
      flex: 1,
      editable: true,
    },
    {
      field: "CAYm6_15_16",
      headerName: "CAY m6 (15-16)",
      flex: 1,
      editable: true,
    },
  ];

  const column_4_1_2 = [
    {
      field: "item_no",
      headerName: "NO",
      flex: 0.4,
    },
    {
      field: "item_name",
      headerName: "ITEM",
      flex: 3,
    },
    {
      field: "N",
      headerName: "N",
      flex: 2,
    },
    {
      field: "N1",
      headerName: "N1",
      flex: 2,
    },
    {
      field: "ratio",
      headerName: "RATIO",
      flex: 2,
    }
  ]

  return (
    <Box m="20px">
      <Header
        title="STUDENT PERFORMANCE"
        subtitle="List of criteria 4.1 tables"
      />
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          position: 'relative',
          "& .MuiDataGrid-root": {
            border: "none",
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            wordWrap: 'break-word'},
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
        <Typography variant="h4" fontWeight="bold">4.1.1 : STUDENT ADMISSION DETAILS</Typography>

        <div>
          <DataGrid
            rows={rows_4_1_1}
            columns={column_4_1_1}
            processRowUpdate={(updatedRow) =>
              processRowUpdate_4_1_1(updatedRow)
            }
            onProcessRowUpdateError={handleProcessRowUpdateError}
            isCellEditable={(params) => params.row.item_no !== 5}
            style={{ fontSize: "15px" }}
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
              position: "absolute", right: 0, fontSize: "14px", fontWeight: "bold",
            }}
          >
            SUBMIT
          </Button>
        </Box>
        <Box m={"60px 0 0 0"}>
          <Typography variant="h4" fontWeight="bold">4.1.2 : ENROLMENT RATIO</Typography>
          <div>
            <DataGrid
              rows={rows_4_1_2}
              columns={column_4_1_2}
              style={{ fontSize: "15px" }}

              slots={{
                toolbar: () => {
                  return <GridToolbarContainer><GridToolbarExport /><GridToolbarColumnsButton /><GridToolbarDensitySelector /><GridToolbarFilterButton /><GridToolbarQuickFilter /></GridToolbarContainer>
                }
              }}
            />
          </div>

        </Box>
        <Typography variant="h5" fontWeight="bold">
    Average Ratio: {averageRatio.toFixed(2)} {/* Displaying average ratio */}
  </Typography>
      </Box>
    </Box>
  );
}
export default Criteria_4_1_Screen;
