"use client";
import React, { useState } from "react";
import UserList from "../components/UserList";
import Sidebar from "../components/SideBar";

const Page = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <UserList />;
      case "analytics":
        return <div className="text-white">Analytics section coming soon...</div>;
      case "calendar":
        return <div className="text-white">Calendar section coming soon...</div>;
      case "users":
        return <div className="text-white">Users section coming soon...</div>;
      case "monitoring":
        return <div className="text-white">Monitoring section coming soon...</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#222629] flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default Page;
