"use client";

import { useState } from "react";

export default function EditPlan({ planId }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    durationInDays: "",
    image: null,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Updating...");

    const payload = {
      ...formData,
      price: formData.price ? Number(formData.price) : undefined,
      durationInDays: formData.durationInDays
        ? Number(formData.durationInDays)
        : null,
      features: formData.features
        ? formData.features.split(",").map((f) => f.trim())
        : undefined,
    };

    try {
      const res = await fetch(`/api/plans/${planId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update");

      setStatus("Plan updated successfully!");
    } catch (err) {
      console.error(err);
      setStatus(err.message || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">Update Plan</h2>

      <input
        type="text"
        name="name"
        placeholder="Plan name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Price (e.g. 199)"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="features"
        placeholder="Comma separated features"
        value={formData.features}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="durationInDays"
        placeholder="Duration in days (leave empty for lifetime)"
        value={formData.durationInDays}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Plan
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
