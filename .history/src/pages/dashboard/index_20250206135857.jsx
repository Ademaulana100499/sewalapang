import React, { useState } from "react";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { MdEventNote } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { FaRupiahSign } from "react-icons/fa6";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [selected, setSelected] = useState("Activitys");
  return (
    <div className="flex bg-indigo-50">
      <Sidebar selected={selected} setSelected={setSelected} />
      <Content selected={selected} />
    </div>
  );
};
export default DashboardPage;
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Activitys");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}>
      <TitleSection open={open} />
      <div className="space-y-1">
        <Option
          Icon={MdEventNote}
          title="Activitys"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={TbCategory2}
          title="Sport Category"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FaRupiahSign}
          title="Transactions"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}>
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium">
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white">
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-6 w-6" />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}>
              <div className=" flex text-lg items-center gap-2 ">
                Tanding<span className="text-green-500">Lapang</span>
              </div>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};
const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100">
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg">
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium">
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const Content = ({ selected }) => {
  return (
    <div className="h-[200vh] w-full p-4">
      {selected === "Sport Category" && <div>Sport Category</div>}
      {selected === "Activitys" && <div>Activitys</div>}
      {selected === "Transactions" && <div>Transactions</div>}
    </div>
  );
};
