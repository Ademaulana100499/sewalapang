import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { handleRegister } from "@/services/auth";
import { useState } from "react";
import Swal from "sweetalert2";

const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    phone_number: "",
  });

  const handleFormLogin = async () => {
    try {
      const response = await handleRegister(formData);
      console.log(response);
      setCookie("token", response.data.token);
      Swal.fire({
        title: response.data.message,
        icon: "success",
        draggable: true,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Email or Password is incorrect!",
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useRegister;
