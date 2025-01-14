import React from "react";
import Link from "next/link";
import useRegister from "@/hooks/useRegister";
const RegisterPage = () => {
  const { formData, setFormData, handleFormRegister } = useRegister();
  return (
    <div>
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Name" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <input type="number" placeholder="Phone Number" />
      <button onClick={handleFormRegister}>Register</button>
      <Link href="/login">Login</Link>
    </div>
  );
};
export default RegisterPage;
