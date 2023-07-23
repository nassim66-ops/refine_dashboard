import { Box, Stack, Typography } from "@mui/material";
import { propertyReferralsInfo } from "constants/index";
import React from "react";
import { Colors } from "utils/GlobalStyles";
interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const PropertyReferrals = () => {
  const ProgressBar = (props: ProgressBarProps) => {
    return (
      <Box width="100%">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize={16} fontWeight={500} color={Colors.globalBlack}>
            {props.title}
          </Typography>
          <Typography fontSize={16} fontWeight={500} color={Colors.globalBlack}>
            {props.percentage}%
          </Typography>
        </Stack>
        <Box
          mt={2}
          position="relative"
          width="100%"
          height="8px"
          borderRadius={1}
          bgcolor="#e4e8ef"
        >
          {/* That is how you can make a line according to a number */}
          <Box
            width={`${props.percentage}%`}
            bgcolor={props.color}
            position="absolute"
            height="100%"
            borderRadius={1}
          />
        </Box>
      </Box>
    );
  };
  return (
    <Box
      p={4}
      ml={1}
      bgcolor={Colors.globalWhite}
      minWidth={490}
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color={Colors.globalBlack}>
        Property Referrals
      </Typography>
      <Stack my="20px" direction="column" gap={4}>
        {propertyReferralsInfo.map((bar: any) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
    </Box>
  );
};

export default PropertyReferrals;
