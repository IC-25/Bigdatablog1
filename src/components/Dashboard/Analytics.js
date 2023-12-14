import React from "react";
import BarChart from "../Chart/Barchart";
import DashboardNavBar from "./DashboardNavBar";
import Piecharts from "../Chart/PieChart";
import CardinalChart from "../Chart/cardinalChart";

function Analytics() {
  return (
    <>
      <DashboardNavBar />
      <section className="section-two">
        <div className="chart-container">
          <Piecharts />
          <BarChart />
          <CardinalChart />
        </div>
      </section>
    </>
  );
}

export default Analytics;
