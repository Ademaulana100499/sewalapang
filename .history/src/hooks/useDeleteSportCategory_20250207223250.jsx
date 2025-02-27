import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
export const useDeleteSportCategory = (fetchCategories) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Konfirmasi Hapus kategori",
      icon: "warning",
      text: "Apakah kamu yakin ingin menghapus kategori ini?",
      showCancelButton: true,
      confirmButtonColor: "#31c360",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-categories/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      console.log(res);

      Swal.fire({
        title: "Kategori Berhasil Dihapus!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });

      fetchCategories();
    } catch (err) {
      console.error("Error:", err.message);
      Swal.fire({
        title: "Gagal Menghapus Kategori",
        text: "Kategori ini tidak dapat dihapus .",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
};
