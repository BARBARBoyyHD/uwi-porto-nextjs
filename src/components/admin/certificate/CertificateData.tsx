"use client";
import { useGetData } from "@/hooks/useFetch";
import React from "react";
import type { Certificate } from "@/types/certificates";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { CertificateEditFormDialog } from "./form/CertificateEditForm";
import { DeleteComp } from "../../deleteComp";
import { Delete } from "lucide-react";
import { SpinnerLoading } from "@/components/SpinnerLoading";

export default function CertificateData() {
  // 🎯 FIX 1: The hook must return an array, so the generic type must be Certificate[].
  const { data, error, isLoading } = useGetData<Certificate>(
    "/api/v1/admin/certificate/get",
    "certificate"
  );

  if (isLoading) {
    return (
      <div>
        <SpinnerLoading />
      </div>
    );
  }
  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* 4. Flex container with wrapping */}
      {/* 🎯 Note: data should be checked for an array if data is defined and not null. */}
      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
          {data.map((cert) => (
            // 5. Styled Card for each Certificate
            <div
              // ⚠️ IMPORTANT: Use a unique ID for the key, not just the index.
              key={cert.id || cert.cert_name}
              className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.33rem)] xl:w-[calc(25%-1.125rem)] 
                         bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="w-full h-40 bg-gray-200 relative">
                {/* Using next/image is highly recommended for performance */}
                <Image
                  src={cert.image_url}
                  alt={`${cert.cert_name} certificate image`}
                  fill={true}
                  style={{ objectFit: "cover" }} // Use style prop for objectFit with fill/layout="fill"
                  className="transition duration-300 hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="p-5">
                <h3
                  className="text-xl font-bold text-gray-800 truncate mb-1"
                  title={cert.cert_name}
                >
                  {cert.cert_name}
                </h3>
                <p className="text-sm font-medium text-indigo-600 mb-3">
                  {cert.issuer}
                </p>

                <p className="text-xs text-gray-500 mb-1">
                  {/* 🎯 FIX 2: Correct property name from issuer_date to issue_date */}
                  Issued:{" "}
                  <span className="font-semibold text-gray-700">
                    {cert.issuer_date}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Expires:{" "}
                  <span className="font-semibold text-gray-700">
                    {cert.expiration_date}
                  </span>
                </p>

                {/* URL Link */}
                <a
                  href={cert.cert_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-700 transition duration-150 block truncate"
                  title="View Certificate"
                >
                  View Credential
                </a>
              </div>

              {/* 6. Edit and Delete Actions */}
              <div className="flex justify-end p-3 border-t border-gray-100 bg-gray-50">
                {/* Edit Button */}
                {/* 🎯 FIX 3: Attach handleEdit function */}
                <CertificateEditFormDialog id={cert.id} />

                {/* Delete Button */}
                {/* 🎯 FIX 4: Attach handleDelete function */}
                <DeleteComp
                  id={cert.id}
                  endpoint="/api/v1/admin/certificate/delete"
                  queryKey="certificate"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 7. Empty State
        
          <div className="text-center rounded-lg text-gray-500">
            No certificates found.
          </div>
        
      )}
    </section>
  );
}
