"use client";

import { motion } from "framer-motion";

export default function MyServicesComp() {

  return (
    <section
      id="my-services"
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-8 py-20 text-white"
    >
      {/* ✅ LEFT SIDE — SEO-friendly Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex flex-col items-start text-center lg:text-left mb-12 lg:mb-0"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Building <span className="text-gray-500">Websites & Apps</span>
          That Define the <span className="text-gray-500">Next Level</span>
        </h1>

        <p className="text-gray-300 max-w-lg text-base md:text-lg mb-8">
          I specialize in building fast, scalable, and beautiful digital
          experiences using <strong>React</strong>, <strong>Next.js</strong>,
          and <strong>Node.js Express</strong>. {"Whether it's a sleek landing page or a full-stack web application I craft solutions that elevate your brand."}
        </p>

        <a
          href="#contact"
          className="bg-slate-950 transition  border border-slate-200 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md"
        >
          Free Consultation
        </a>
      </motion.div>

      {/* ✅ RIGHT SIDE — Profile Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex justify-center"
      ></motion.div>
    </section>
  );
}
