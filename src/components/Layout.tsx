import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import ChatWidget from "./ChatWidget.tsx";
import MasterAIController from "./MasterAIController.tsx";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-orange-500 selection:text-white flex flex-col">
      <MasterAIController />
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      {!location.pathname.includes('/market') && <Footer />}
      <ChatWidget />
    </div>
  );
}
