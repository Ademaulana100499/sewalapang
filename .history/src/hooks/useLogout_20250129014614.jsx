import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export const useLogout = () => {
  const router = useRouter();

  const handleButtonLogout = async () => {
    try {
      const res = await axios.post(
        "/api/authentication/ssrlogout",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      router.push("/");
      console.log("Logout successful:", res);
      Swal.fire({
        title: "Logout Berhasil",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      deleteCookie("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        title: error,
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
    }
  };
  return { handleButtonLogout };
};
