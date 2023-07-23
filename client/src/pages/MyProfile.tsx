import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";
import SpinnerLoader from "components/common/SpinnerLoader/SpinnerLoader";

const MyProfile = () => {
  const { data: user } = useGetIdentity<any>();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });

  const myProfile = data?.data ?? ([] as any);

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
