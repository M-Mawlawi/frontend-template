import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import Vehicles from "../../components/vehicles";

function Home() {
  return (
    <div className="bg-white w-screen h-screen flex">
      <Sidebar/>
      <Vehicles/>
    </div>
  );
}

export default Home;
