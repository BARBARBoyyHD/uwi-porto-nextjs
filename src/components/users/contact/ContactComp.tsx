"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
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
        Get In <span className="">Touch</span>
      </motion.h1>

      {/* Contact Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl">
        {/* Profile Card (your info) */}

        {/* Contact Links */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Let’s Connect 🚀
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            I’m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <Mail size={20} /> your@email.com
            </a>
            <a
              href="tel:+621234567890"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <Phone size={20} /> +62 123-4567-890
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <Linkedin size={20} /> linkedin.com/in/yourlinkedin
            </a>
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-300 transition"
            >
              <Github size={20} /> github.com/yourgithub
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
