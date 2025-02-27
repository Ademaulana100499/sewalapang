import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    role: "user",
    phone_number: "",
  });

  const handleFormRegister = async () => {
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => value === ""
    );

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map(([key]) => key).join(", ");
      alert(`Field berikut tidak boleh kosong: ${emptyFieldNames}`);
      return;
    }

    // Cek jika password dan konfirmasi password tidak cocok
    if (formData.password !== formData.c_password) {
      alert("Password dan konfirmasi password harus sama");
      return;
    }

    try {
      const res = await axios.post("/api/authentication/ssrregist", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        Swal.fire({
          title: res.data.error.data.email,
          icon: "error",
          draggable: true,
        });
        console.log(res);
      } else {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          draggable: true,
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error?.response?.data?.message || "Registration failed",
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormRegister, setFormData, formData };
};

export default useRegister;
