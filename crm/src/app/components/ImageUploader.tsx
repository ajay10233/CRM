"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Photo = {
  id: string;
  link: string;
  details: string;
  createdAt: string;
};

export default function PhotosGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("/api/admin-images");
      setPhotos(res.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("details", details);

      await axios.post("http://localhost:3000/api/admin-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      setDetails("");
      fetchPhotos();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-[#222629] p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Admin Image Gallery
      </h1>

      {/* Uploader Section */}
      <div className="bg-[#394955] p-6 rounded-xl mb-10 border border-[#4FD1C5] shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Upload New Image
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="bg-[#2C3531] text-gray-300 p-2 rounded-lg border border-[#4FD1C5]"
          />
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Image details (optional)"
            className="bg-[#2C3531] text-gray-300 p-2 rounded-lg border border-[#4FD1C5] flex-1"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-[#4FD1C5] text-[#222629] font-semibold px-6 py-2 rounded-lg hover:bg-[#3FC1B0] transition"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* Gallery */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-16 h-16 border-4 border-t-[#4FD1C5] border-b-[#F6AD55] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="bg-[#394955] rounded-xl overflow-hidden border border-[#4FD1C5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <img
                src={photo.link}
                alt={photo.details || "Admin Image"}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-300 truncate">
                  {photo.details || "No details provided"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(photo.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}