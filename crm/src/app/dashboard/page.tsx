"use client";

import React, { useState } from "react";
import UserList from "../components/UserList";
import Sidebar from "../components/SideBar";
import PlansPage from "../plans/page";
import Graph from "../components/graph";
import GenerateCouponForm from "../components/GenerateCouponForm";

const Page = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <UserList />;
      case "analytics":
        return <PlansPage />;
      case "calendar":
        return <GenerateCouponForm/>;
      case "users":
        return <div className="text-white">Users section coming soon...</div>;
      case "monitoring":
        return <div className="text-white"><Graph/></div>;
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
