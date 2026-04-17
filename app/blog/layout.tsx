import type { Metadata } from "next";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Blog | QuantaMend - AI Automation Insights for Local Businesses",
  description:
    "Expert guides on AI lead reactivation, voice receptionists, and automation strategies for MedSpas, dental clinics, real estate, and high-revenue local businesses.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">{children}</main>
      <Footer />
    </>
  );
}
