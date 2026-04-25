import AccountSidebar from "@/app/_components/AccountSidebar/AccountSidebar";
import Container from "@/app/_components/Container/Container";
import Header from "@/app/_components/Header/Header";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa6";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Header
          title="My Account"
          desc="Manage your addresses and account settings"
          icon={<FaUser />}
        />
        <Container>
          <div className="my-10 grid grid-cols-12 gap-4">
            <div className="col-span-12  md:col-span-4  lg:col-span-3 ">
              <div className="shadow-xl shadow-gray-200 border border-[#F3F4F6] rounded-2xl overflow-hidden">
                <AccountSidebar />
              </div>
            </div>
            <div className="col-span-12  md:col-span-8 lg:col-span-9">
              <div> {children} </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default layout;
