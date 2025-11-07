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
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-semibold mb-14 text-center"
      >
        My Certificates
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {optimisticCertificate.map((certificate, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group bg-white/5 border border-white/20 
                       backdrop-blur-xl rounded-2xl overflow-hidden 
                       hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] 
                       hover:-translate-y-2 transition-all duration-500"
          >
            {/* Certificate Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={certificate.image_url}
                alt={certificate.cert_name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Certificate Info */}
            <div className="p-5 flex flex-col justify-between h-[220px]">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-400">
                  {certificate.cert_name}
                </h3>
                <p className="text-gray-300 text-sm mb-1">
                  <span className="font-medium">Issuer:</span>{" "}
                  {certificate.issuer}
                </p>
                <p className="text-gray-400 text-xs mb-2">
                  Issued: {certificate.issuer_date}{" "}
                  {certificate.expiration_date && (
                    <>| Exp: {certificate.expiration_date}</>
                  )}
                </p>
              
              </div>

              {/* Button */}
              <Link
                href={certificate.cert_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-center text-sm font-medium text-white 
                           border border-white/30 rounded-lg py-2 px-4 
                           hover:bg-white hover:text-black transition-all duration-300"
              >
                View Certificate
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
