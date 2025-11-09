"use client";

import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { Certificate } from "@/types/certificates";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CertificateComp() {
  const { data } = useGetData<Certificate>(
    "/api/v2/certificate",
    "certificate"
  );
  const [optimisticCertificate] = useOptimisticList(data || []);

  return (
    <section className="min-h-screen w-full text-white py-20 px-6 mt-6">
      <div className="flex flex-col items-center justify-center text-center mb-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 drop-shadow-md">
            Certificates
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed"
        >
          Lifelong learning is at the heart of my craft — these certificates
          showcase my continuous journey to refine my skills, explore new
          technologies, and grow as a developer.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-base text-gray-500 mt-2"
        >
          Here are some of my proudest milestones 👇
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {optimisticCertificate.map((certificate, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group rounded-2xl overflow-hidden 
                       hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] 
                       hover:-translate-y-2 transition-all duration-500"
          >
            <Link
              href={certificate.cert_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-2xl">
                <Image
                  src={certificate.image_url}
                  alt={certificate.cert_name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
