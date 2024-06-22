import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, useTheme, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [visibleCharts, setVisibleCharts] = useState({
    lineChart: true,
    barChart: true,
    pieChart: true,
  });

  const handleChartVisibilityChange = (event) => {
    const { value } = event.target;
    setVisibleCharts({
      lineChart: value.includes('lineChart'),
      barChart: value.includes('barChart'),
      pieChart: value.includes('pieChart'),
    });
  };

  const chartOptions = [
    { label: 'Line Chart', value: 'lineChart' },
    { label: 'Bar Chart', value: 'barChart' },
    { label: 'Pie Chart', value: 'pieChart' }
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="chart-visibility-label">Select Charts</InputLabel>
          <Select
            labelId="chart-visibility-label"
            multiple
            value={Object.keys(visibleCharts).filter((key) => visibleCharts[key])}
            onChange={handleChartVisibilityChange}
            renderValue={(selected) => selected.map(key => chartOptions.find(option => option.value === key).label).join(', ')}
            label="Select Charts"
          >
            {chartOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={visibleCharts[option.value]} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* GRID & CHARTS */}
      <Box display="flex" gap="20px" flexWrap="wrap">
        {/* LINE CHART */}
        {visibleCharts.lineChart && (
          <Card sx={{ flex: "1 1 calc(33% - 20px)", minWidth: "300px", backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Line Chart - Revenue Generated
              </Typography>
              <Box height="250px" mt="10px">
                <LineChart isDashboard={true} />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* BAR CHART */}
        {visibleCharts.barChart && (
          <Card sx={{ flex: "1 1 calc(33% - 20px)", minWidth: "300px", backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Bar Chart - Sales Quantity
              </Typography>
              <Box height="250px" mt="10px">
                <BarChart isDashboard={true} />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* PIE CHART */}
        {visibleCharts.pieChart && (
          <Card sx={{ flex: "1 1 calc(33% - 20px)", minWidth: "300px", backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Pie Chart - Geography Based Traffic
              </Typography>
              <Box height="250px" mt="10px">
                <PieChart isDashboard={true} />
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
