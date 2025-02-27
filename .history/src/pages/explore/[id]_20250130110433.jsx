import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import Link from "next/link";
import { Detail } from "@/components/layout/Detail";
import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
const ActivityDetail = ({ data }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data.description) {
      setDescription(data.description);
    }
    setIsLoading(false);
  }, [data.description]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>Data not found</div>;
  }

  return (
    <div>
      <Navbar />
      <Detail />
      <div className="bg-zinc-950">
        <ReactLenis
          root
          options={{
            lerp: 0.05,
          }}>
          <Hero />
          <Schedule />
        </ReactLenis>
      </div>
      <div className="container mx-auto p-4">
        <Link
          className="text-blue-500 hover:underline mb-4 inline-block"
          href="/explore">
          Back
        </Link>
        <h1 className="text-3xl font-bold mb-4">Detail</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
          <p className="mb-4">
            <strong className="font-semibold">Deskripsi:</strong>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Kategori:</strong>
            {data.sport_category?.name}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Lokasi:</strong>
            {data.address}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Tanggal:</strong>
            {data.activity_date}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Waktu:</strong> {data.start_time}-{" "}
            {data.end_time}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Harga:</strong> Rp
            {data.price?.toLocaleString()}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Harga diskon:</strong> Rp
            {data.price_discount?.toLocaleString()}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Slot Tersedia:</strong>
            {data.slot}
          </p>
          <p className="mb-4">
            <strong className="font-semibold">Penyelenggara:</strong>
            {data.organizer?.name} ({data.organizer?.email})
          </p>

          <h3 className="text-xl font-semibold mb-2">Peserta:</h3>
          <ul className="list-disc pl-6 mb-4">
            {data.participants?.length > 0 ? (
              data.participants.map((participant) => (
                <li key={participant.id} className="mb-2">
                  {participant.user.name} ({participant.user.email})
                </li>
              ))
            ) : (
              <li>No participants</li>
            )}
          </ul>
          <p>
            <strong className="font-semibold">Lokasi di Map:</strong>
            <a
              href={data.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline">
              Klik di sini
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetail;

export async function getServerSideProps(context) {
  const param = context.params || { id: "" };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${param.id}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }
    );
    return { props: { data: res.data.result || {} } };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return { props: { data: {} } };
  }
}

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full">
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50">
        Launch Schedule
      </motion.h1>
      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
      <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
      <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
      <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
      <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9">
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};
