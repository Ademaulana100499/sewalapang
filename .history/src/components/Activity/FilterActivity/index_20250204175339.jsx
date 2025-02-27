import { useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SportCategoryDropdown from "../../Features/SportCategoryDropdown";
import { LocationDropdown } from "../../Features/LocationDropdown";
import { useRole } from "@/context/RoleContext";
export const FilterActivity = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const role = useRole();

  const handleSearch = () => {
    const query = {
      sport_category_id: selectedCategory || "",
      city_id: selectedLocation ? selectedLocation.value.city_id : "",
    };
    window.location.href = `/explore?${new URLSearchParams(query).toString()}`;
  };

  return (
    <div className="w-full z-50 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-2">
        <LocationDropdown
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <SportCategoryDropdown setSelectedCategory={setSelectedCategory} />
        <div className="w-40">
          <InteractiveHoverButton
            onClick={handleSearch}
            className="bg-white py-1.6 px-6 text-black hover:border-black rounded-md">
            {role === "admin" ? "Cari Acara" : "Cari Lawan"}
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};
