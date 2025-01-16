import React from "react";
import axios from "axios";

export async function getServerSideProps({ req }) {
  const token = req.cookies.token || "";
  if (!token) return { redirect: { destination: "/login", permanent: false } };
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { props: { data: res.data.data || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}

const ProfilePage = ({ data }) => (
  <div>
    <h1>Nama: {data.name || "Tidak tersedia"}</h1>
    <h1>Email: {data.email}</h1>
  </div>
);

export default ProfilePage;
