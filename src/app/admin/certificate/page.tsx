import CertificateData from "@/components/admin/certificate/CertificateData";
import { CertificateFormDialog } from "@/components/admin/certificate/form/CertificateFormDialog";
import React from "react";

export default function CertificatesPages() {
  return (
    <section>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-secondary-foreground font-bold text-3xl">Certificates</h1>
        <CertificateFormDialog />
      </div>
      <CertificateData />
    </section>
  );
}
