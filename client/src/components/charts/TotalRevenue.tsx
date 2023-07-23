import { ArrowCircleUpRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";
import { Colors } from "utils/GlobalStyles";

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      mr={1}
      flex={1}
      bgcolor={Colors.globalWhite}
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color={Colors.globalBlack}>
        Total Revenue
      </Typography>
      <Stack my={2} direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={24} fontWeight={700} color={Colors.globalBlack}>
          $3599,99
        </Typography>
        <Stack direction="row">
          <ArrowCircleUpRounded
            sx={{ fontSize: 20, color: `${Colors.globalBlue}` }}
          />
          <Stack ml={2}>
            <Typography fontSize={15} color={Colors.globalBlue}>
              0.8%
            </Typography>
            <Typography fontSize={12} color={Colors.globalGray}>
              Than last month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </Box>
  );
};

export default TotalRevenue;
