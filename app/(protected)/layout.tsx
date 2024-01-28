import MarginWidthWrapper from "@/components/margin-width-wrapper";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import PageWrapper from "@/components/page-wrapper";
import { Inter } from "next/font/google";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};
const inter = Inter({ subsets: ['latin'] })

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
  <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] to-[#121212] flex">
    <Sidebar />
    <main className="flex-1">
      <MarginWidthWrapper>
        <Header />
        <HeaderMobile />
        <PageWrapper>
          {children}
        </PageWrapper>
      </MarginWidthWrapper>
    </main>
  </div>
   );
}
 
export default ProtectedLayout;