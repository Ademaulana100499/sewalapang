import React from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSectionActivity } from "@/components/ActivityHero";
import { ActivitySchedule } from "@/components/ActivitySchedule";
import { ReactLenis } from "lenis/dist/lenis-react";

const ActivityDetailPage = ({ activityData }) => {
  return (
   
      <Navbar />
      <div className="bg-zinc-950">
        <ReactLenis root options={{ lerp: 0.05 }}>
          <HeroSectionActivity activityData={activityData} />
          <ActivitySchedule activityData={activityData} />
        </ReactLenis>
      </div>
      <Footer />
    
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params || { id: "" };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${id}`,
      {
        headers: { Authorization: `Bearer ${context.req.cookies.token}` },
      }
    );
    return { props: { activityData: res.data.result || {} } };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return { props: { activityData: {} } };
  }
}

export default ActivityDetailPage;
