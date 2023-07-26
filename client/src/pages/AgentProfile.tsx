import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";
import SpinnerLoader from "components/common/SpinnerLoader/SpinnerLoader";

const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const myProfile = data?.data ?? ([] as any);

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
