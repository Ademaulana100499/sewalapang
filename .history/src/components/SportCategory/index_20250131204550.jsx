import { FiEdit, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { iconMap } from "../utils/imageIconData";
const SportDropdown = ({ setSelectedCategory }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategoryState] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories`
        );
        const categoriesFromAPI = response.data.result.data || [];
        if (!categoriesFromAPI.some((category) => category.id === 1)) {
          categoriesFromAPI.unshift({ id: 1, name: "Sepak Bola" });
        }
        setCategories(categoriesFromAPI);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.id);
    setSelectedCategoryState(category.name);
    setOpen(false);
  };

  return (
    <motion.div animate={open ? "open" : "closed"} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-5 py-2 rounded-sm text-indigo-50 bg-black hover:bg-black transition-colors">
        <span className="font-medium">
          {selectedCategory || "Jenis Olahraga"}
        </span>
        <motion.span variants={iconVariants}>
          <FiChevronDown />
        </motion.span>
      </button>

      {open && (
        <motion.ul
          initial={wrapperVariants.closed}
          animate={open ? "open" : "closed"}
          variants={wrapperVariants}
          className="flex flex-col z-40 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <Option
              key={category.id}
              category={category}
              setOpen={setOpen}
              Icon={iconMap[category.name.toLowerCase()] || iconMap["default"]}
              text={category.name}
              onClick={handleCategoryChange}
            />
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

const Option = ({ text, Icon, setOpen, category, onClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        onClick(category);
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer">
      <motion.span variants={actionIconVariants}>
        <Icon /> {/* Panggil komponen Icon sebagai elemen JSX */}
      </motion.span>

      <span>{text}</span>
    </motion.li>
  );
};

export default SportDropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const iconVariants = {
  open: { rotate: 180, transition: { duration: 0.2 } }, // Percepat animasi ikon
  closed: { rotate: 0, transition: { duration: 0.2 } }, // Percepat animasi ikon
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
      duration: 0.2,
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0, transition: { duration: 0.2 } }, // Percepat animasi ikon
  closed: { scale: 0, y: -7, transition: { duration: 0.2 } }, // Percepat animasi ikon
};
