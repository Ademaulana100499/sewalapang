import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Authorization = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const token = getCookie("token"); // Pastikan cookie diakses hanya di client

        if (!token) {
          router.push("/unauthorized");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/unauthorized");
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default Authorization;
