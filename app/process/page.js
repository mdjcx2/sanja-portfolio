"use client";

import Link from "next/link";
import DarkNav from "../components/DarkNav";
import DarkPageHero from "../components/DarkPageHero";
import DarkProcessDiamond from "./DarkProcessDiamond";
import CaseFooter from "../components/case/CaseFooter";

export default function ProcessPage() {
  return (
    <div style={{ minHeight: "100vh", color: "#F0EDE8", position: "relative", zIndex: 1, background: "linear-gradient(to bottom, transparent 15%, rgba(2,4,8,0.45) 55%, rgba(2,4,8,0.62) 100%)" }}>
      <style>{`
        .pr-hero   { padding: 140px 64px 60px; }
        .pr-body   { padding: 0 64px 120px; }
        .pr-footer { padding: 28px 64px; }
        @media (max-width: 768px) {
          .pr-hero   { padding: 100px 24px 48px; }
          .pr-body   { padding: 0 24px 80px; }
          .pr-footer { padding: 28px 24px; }
        }
        @media (max-width: 640px) {
          .dk-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>

      <DarkNav />

      <DarkPageHero
        className="pr-hero"
        label="Product Design"
        heading="Process"
        sub="AI accelerates exploration. Judgment shapes outcomes."
      />

      {/* Diamond */}
      <div className="pr-body" style={{
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ width: "100%", maxWidth: 860 }}>
          <DarkProcessDiamond />
        </div>
      </div>

      <CaseFooter />
    </div>
  );
}
