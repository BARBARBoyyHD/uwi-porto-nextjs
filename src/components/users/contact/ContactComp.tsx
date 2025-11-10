"use client";

import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter  } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
export default function ContactComp() {
  return (
    <motion.section
      id="contact"
      className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 md:px-20 bg-transparent"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get In <span className="text-[#FFD700]">Touch</span>
      </motion.h1>

      {/* Contact Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl">
        {/* Profile Card (your info) */}

        {/* Contact Links */}
        <div className="w-full  flex flex-col items-start gap-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-[#FFD700] shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Let’s Connect 🚀
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            I’m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>

          <div className="flex flex-col flex-wrap gap-3 w-full">
             <a
              href="muhammadnahrulhayat98@gmail.com"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <IoMail size={20} /> muhammadnahrulhayat98@gmail.com
            </a>
             <a
              href="https://www.instagram.com/notuwithelifter"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <FaInstagram size={20} /> notuwithelifter
            </a>
            <a
              href="https://www.tiktok.com/@uwi_dev"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <FaTiktok size={20} /> uwi_dev
            </a>
            <a
              href="https://x.com/HdBoyy86138"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <FaXTwitter size={20} /> uwi_dev
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-nahrul-hayat/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <FaLinkedin size={20} /> muhammad-nahrul-hayat
            </a>
            <a
              href="https://github.com/BARBARBoyyHD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <FaGithub size={20} /> BARBARBoyyHD
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
