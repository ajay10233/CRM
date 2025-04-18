"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Coupon = {
  id: string;
  name: string;
  discountPercentage: number;
  startDate: string;
  durationInDays: number;
  expiresAt: string;
  purpose: string;
  limit: number;
};

export default function GenerateCouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);

  // form state
  const [name, setName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [durationInDays, setDurationInDays] = useState<number>(1);
  const [purpose, setPurpose] = useState("PLAN"); // new state
  const [limit, setLimit] = useState<number>(1); // new state

  // loading flags
  const [loadingList, setLoadingList] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const loadCoupons = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/coupons");
      const data: Coupon[] = await res.json();
      setCoupons(data);
    } catch (e) {
      console.error(e);
      alert("Failed to load coupons.");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const resetForm = () => {
    setFormMode("create");
    setEditingId(null);
    setName("");
    setDiscountPercentage(0);
    setStartDate(new Date());
    setDurationInDays(1);
    setPurpose("PLAN"); // reset
    setLimit(1); // reset
  };

  const handleSubmit = async () => {
    if (!name || discountPercentage <= 0 || durationInDays <= 0 || limit <= 0) {
      alert("Please fill all fields with valid values.");
      return;
    }
    setLoadingAction(true);

    const payload = {
      name,
      discountPercentage,
      startDate: startDate?.toISOString(),
      durationInDays,
      purpose,
      limit,
    };

    try {
      const url =
        formMode === "create" ? "/api/coupons" : `/api/coupons/${editingId}`;
      const method = formMode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");
      await loadCoupons();
      resetForm();
    } catch (e) {
      console.error(e);
      alert(`Failed to ${formMode === "create" ? "create" : "update"} coupon.`);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    setLoadingAction(true);
    try {
      const res = await fetch(`/api/coupons/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Bad delete");
      await loadCoupons();
    } catch (e) {
      console.error(e);
      alert("Failed to delete coupon.");
    } finally {
      setLoadingAction(false);
    }
  };

  const startEdit = (c: Coupon) => {
    setFormMode("edit");
    setEditingId(c.id);
    setName(c.name);
    setDiscountPercentage(c.discountPercentage);
    setStartDate(new Date(c.startDate));
    setDurationInDays(c.durationInDays);
    setPurpose(c.purpose);
    setLimit(c.limit);
  };

  const Loader = () => (
    <div className="flex justify-center items-center h-60">
      <div className="w-16 h-16 border-4 border-t-[#4FD1C5] border-b-[#F6AD55] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-primary p-4 rounded-xl border border-secondary space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text mb-4 flex items-center gap-2">
          {formMode === "create" ? "🎟️ New Coupon" : "✏️ Edit Coupon"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text mb-1">Name</label>
            <input
              className="w-full p-2 rounded-xl border border-secondary bg-[#394652] text-text focus:ring-2 focus:ring-accent outline-none"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())} // uppercase as you type
              placeholder="Ex: GOLD PLAN"
            />
          </div>
          <div>
            <label className="block text-text mb-1">Discount (%)</label>
            <input
              className="w-full p-2 rounded-xl border border-secondary bg-[#394652] text-text focus:ring-2 focus:ring-accent outline-none"
              type="number"
              value={discountPercentage}
              onChange={(e) => {
                const value = +e.target.value;
                if (value > 100) {
                  setDiscountPercentage(100);
                } else if (value < 1) {
                  setDiscountPercentage(1);
                } else {
                  setDiscountPercentage(value);
                }
              }}
              placeholder="Ex: 50"
              min={1}
              max={100}
            />
          </div>

          <div>
            <label className="block text-text mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 rounded-xl border border-secondary bg-[#394652] text-text focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-text mb-1">Duration (days)</label>
            <input
              className="w-full p-2 rounded-xl border border-secondary bg-[#394652] text-text focus:ring-2 focus:ring-accent outline-none"
              type="number"
              value={durationInDays}
              onChange={(e) => setDurationInDays(+e.target.value)}
              placeholder="Ex: 10"
              min={1}
            />
          </div>

          {/* Purpose dropdown */}
          <div>
            <label className="block text-text mb-1">Purpose</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2 rounded-xl border border-secondary bg-[#394652] text-text focus:ring-2 focus:ring-accent outline-none"
            >
              <option value="PLAN">PLAN</option>
              <option value="PROMOTION">PROMOTION</option>
            </select>
          </div>

          {/* Limit input */}
          <div>
            <label className="block text-text mb-1">Limit</label>
            <input
              className="w-full p-2 rounded-xl border border-secondary bg-[#394652] text-text focus:ring-2 focus:ring-accent outline-none"
              type="number"
              value={limit}
              onChange={(e) => setLimit(+e.target.value)}
              placeholder="Ex: 10"
              min={1}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loadingAction}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition 
      ${
        formMode === "create"
          ? "bg-green-500 hover:bg-green-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      } 
      disabled:opacity-60`}
          >
            {loadingAction
              ? "Processing..."
              : formMode === "create"
              ? "➕ Create Coupon"
              : "💾 Update Coupon"}
          </button>

          {formMode === "edit" && (
            <button
              onClick={resetForm}
              className="py-3 px-5 rounded-lg text-sm font-medium border border-gray-500 text-gray-300 hover:bg-gray-600 transition"
            >
              ✖ Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div>
        <h3 className="text-xl font-semibold text-text mb-3">📋 All Coupons</h3>
        {loadingList ? (
          <Loader />
        ) : coupons.length === 0 ? (
          <p className="text-text">No coupons found.</p>
        ) : (
          <ul className="space-y-4">
            {coupons.map((c) => {
              const start = new Date(c.startDate);
              const end = new Date(c.expiresAt);
              const durationDays = c.durationInDays;

              return (
                <li
                  key={c.id}
                  className="bg-[#394652] p-4 rounded-xl border border-secondary text-text flex justify-between items-start"
                >
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {c.name}</p>
                    <p><strong>Discount:</strong> {c.discountPercentage}%</p>
                    <p><strong>Starts:</strong> {start.toLocaleDateString()}</p>
                    <p><strong>Expires:</strong> {end.toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {durationDays} day{durationDays > 1 ? "s" : ""}</p>
                    <p><strong>Purpose:</strong> {c.purpose}</p>
                    <p><strong>Limit:</strong> {c.limit}</p>
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <button
                      onClick={() => startEdit(c)}
                      className="px-3 py-1 rounded-lg bg-accent text-primary text-xs font-medium hover:bg-highlight transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={loadingAction}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
