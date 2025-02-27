import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";
const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleFormLogin = async () => {
    try {
      const res = await axios.post("/api/authentication/ssrlogin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setCookie("token", res.data.data.token);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
