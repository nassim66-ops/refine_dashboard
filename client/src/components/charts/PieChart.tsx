import { Box, Stack, Typography } from "@mui/material";
import { PieChartProps } from "interfaces/home";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Colors } from "utils/GlobalStyles";

const PieChart = (props: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      bgcolor={Colors.globalWhite}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
    >
      <Stack direction="column">
        <Typography fontSize={14} color={Colors.globalGray}>
          {props.title}
        </Typography>
        <Typography
          fontSize={24}
          fontWeight={700}
          mt={1}
          color={Colors.globalBlack}
        >
          {props.value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: "donut" },
          colors: props.colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={props.series}
        type="donut"
        width="120px"
      />
    </Box>
  );
};

export default PieChart;
