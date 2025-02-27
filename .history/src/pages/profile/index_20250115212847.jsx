import React from "react";
import { getProfile } from "@/services/profile";

export async function getServerSideProps() {
  try {
    console.log("ggggg");
    const response = await getProfile();

    console.log("Profile successful:", response);
    console.log("Response Data:", response.data.data);

    return { props: { data: response.data.data || [] } };
  } catch (error) {
    console.log(error);
    return { props: { data: [] } };
  }
}
const ProfilePage = ({ data }) => {
  return (
    <div>
      <h1>Nama :{data.name}</h1>
    </div>
  );
};

export default ProfilePage;
