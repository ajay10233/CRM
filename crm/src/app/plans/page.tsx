"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";  // ← Framer Motion import

type Plan = {
  id?: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  durationInDays: number | null;
  image: string;
};

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedPlan, setEditedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("/api/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("Error fetching plans", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedPlan(plans[index]);
  };

  const handleChange = (field: keyof Plan, value: any) => {
    if (!editedPlan) return;
    setEditedPlan({ ...editedPlan, [field]: value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!editedPlan) return;
    const updatedFeatures = [...editedPlan.features];
    updatedFeatures[index] = value;
    setEditedPlan({ ...editedPlan, features: updatedFeatures });
  };

  const handleSave = async () => {
    if (!editedPlan) return;
    try {
      await axios.put(`/api/plans/${editedPlan.id}`, editedPlan);
      setEditIndex(null);
      fetchPlans();
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#222629] p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">Plans Portal</h1>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-16 h-16 border-4 border-t-[#4FD1C5] border-b-[#F6AD55] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="bg-[#394955] border border-[#4FD1C5] rounded-2xl p-6 shadow-md transform transition hover:scale-[1.03] hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {editIndex === index ? (
                <div className="space-y-3">
                  <input
                    className="w-full bg-[#2F3E4C] text-white border border-[#4FD1C5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                    value={editedPlan?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <input
                    type="number"
                    className="w-full bg-[#2F3E4C] text-white border border-[#4FD1C5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                    value={editedPlan?.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                  />
                  <textarea
                    className="w-full bg-[#2F3E4C] text-white border border-[#4FD1C5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                    value={editedPlan?.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                  <input
                    type="number"
                    className="w-full bg-[#2F3E4C] text-white border border-[#4FD1C5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                    placeholder="Duration in days"
                    value={editedPlan?.durationInDays || ""}
                    onChange={(e) => handleChange("durationInDays", Number(e.target.value))}
                  />
                  {editedPlan?.features.map((feature, fIndex) => (
                    <input
                      key={fIndex}
                      className="w-full bg-[#2F3E4C] text-white border border-[#4FD1C5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      value={feature}
                      onChange={(e) => handleFeatureChange(fIndex, e.target.value)}
                    />
                  ))}
                  <button
                    className="bg-[#4FD1C5] text-[#2F3E4C] font-semibold w-full py-2 rounded-lg hover:bg-[#38B2AC] transition"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                  <p className="text-2xl font-bold text-[#F6AD55]">₹ {plan.price}</p>
                  <p className="text-sm text-gray-400">
                    {plan.durationInDays ? `${plan.durationInDays} days` : "No duration"}
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    className="bg-[#4FD1C5] text-[#2F3E4C] font-semibold w-full py-2 mt-3 rounded-lg hover:bg-[#38B2AC] transition"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
