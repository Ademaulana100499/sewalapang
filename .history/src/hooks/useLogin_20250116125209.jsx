import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormLogin = async () => {
    try {
      const resp = await fetch("/api/authentication/server-side-login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const { data } = await resp.json();

      if (resp.ok) {
        setCookie("token", data.data.token);
        router.push("/");
      } else {
        // Optional: handle failed login case here
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("An error occurred");
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
