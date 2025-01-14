import React from "react";
import { handleLogin } from "../../services/auth";
import useRouter from "next/router";
import { setCookie } from "cookies-next";
import { useState, useEffect } from "react";
const LoginPage = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleFormLogin = async () => {
    try {
      const response = await handleLogin(formData);
      console.log(response);
      setCookie("token", response.data.token);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (!isClient) return { handleFormLogin, setFormData, formData };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button onClick={handleFormLogin}>Login</button>
    </div>
  );
};
export default LoginPage;
