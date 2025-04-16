"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  id: string;
  role: string;
  firstName: string;
  email: string;
}

const COLORS = ["#06b6d4", "#22c55e", "#facc15", "#f97316"];

const Graph = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roleData, setRoleData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch("/api/users/all");
      const data = await res.json();
      setUsers(data.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const roleCount: Record<string, number> = {};
    users.forEach((user) => {
      roleCount[user.role] = (roleCount[user.role] || 0) + 1;
    });
    const formattedData = Object.keys(roleCount).map((role) => ({
      name: role,
      value: roleCount[role],
    }));
    setRoleData(formattedData);
  }, [users]);

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    const filtered = users.filter((user) => user.role === role);
    setFilteredUsers(filtered);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setFilteredUsers([]);
  };

  const handleExport = async () => {
    const element = document.getElementById("pdf-export-content");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("user-roles-chart.pdf");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">📊 Users Monitoring</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-16 h-16 border-4 border-t-[#4FD1C5] border-b-[#F6AD55] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            id="chart-section"
            className="space-y-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Bar Chart */}
            <div className="rounded-xl bg-gray-800 p-4 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Data Base Report</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={roleData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  onClick={(e) =>
                    e && e.activeLabel && handleRoleClick(e.activeLabel)
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis allowDecimals={false} stroke="#cbd5e1" />
                  <Tooltip />
                  <Bar dataKey="value">
                    {roleData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* User List Modal */}
      {/* Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="relative bg-[#1F2937] p-8 rounded-2xl shadow-2xl w-full max-w-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition"
                aria-label="Close"
              >
                ✖
              </button>

              <h2 className="text-3xl font-semibold text-white mb-6 text-center">
                {selectedRole} Users
              </h2>

              <ul className="space-y-4">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center bg-gray-700 rounded-lg p-3 transition hover:bg-gray-600"
                  >
                    <div className="text-white">
                      <p className="font-medium">{user.firstName}</p>
                      <p className="text-sm text-gray-300">{user.email}</p>
                    </div>
                    <a
                      href={`/users/${user.id}`}
                      className="text-[#4FD1C5] hover:underline font-medium"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Graph;
