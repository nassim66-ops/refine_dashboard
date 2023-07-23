import { useList } from "@refinedev/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AgentCard } from "components";
import SpinnerLoader from "components/common/SpinnerLoader/SpinnerLoader";

const Agents = () => {
  const { data, isLoading, isError } = useList({ resource: "users" });

  const allAgents = data?.data ?? [];

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <div>error...</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agents List
      </Typography>

      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          backgroundColor: "#fcfcfc",
        }}
      >
        {allAgents.map((agent) => {
          return (
            <AgentCard
              key={agent._id}
              id={agent._id}
              name={agent.name}
              avatar={agent.avatar}
              email={agent.email}
              noOfProperties={agent.allProperties.length}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Agents;
