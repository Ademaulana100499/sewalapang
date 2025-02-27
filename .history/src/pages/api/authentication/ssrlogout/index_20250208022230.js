import axios from "axios";
import { deleteCookie } from "cookies-next";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  const token = getCookie("token", { req, res });
  try {
    console.log("Token:", token);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    deleteCookie("token", { req, res });
    res.status(200).json({ message: "Logout successful", data: response.data });
  } catch (error) {
    console.error("Logout API Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Logout failed",
      error: error.response?.data || "Internal Server Error",
    });
  }
}
