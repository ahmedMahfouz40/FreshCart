import Container from "@/components/Container/Container";
import MainForm from "@/components/Forms/ForgotPasswordForms/MainForm";
import { FaShieldAlt } from "react-icons/fa";
import { FaEnvelope, FaLock } from "react-icons/fa6";

const page = () => {
  return (
    <div className="my-20">
      <Container>
        <div className="grid grid-cols-2 gap-8 my-5">
          {/* Left Side */}
          <div className="col-span-2 md:col-span-1">
            <div className="relative bg-linear-30 from-[#F0FDF4] via-[#F0FDF4] to-[#F3F4F6] pt-37 pb-59 shadow-lg shadow-primary-100/70 rounded-2xl">
              <div className="absolute animate-pulse bg-primary-50 rounded-full h-24 w-24 top-8 left-8 "></div>
              <div className="absolute animate-pulse bg-primary-50 rounded-full h-32 w-32 bottom-12 right-10 "></div>
              <div className="absolute animate-pulse bg-primary-50 rounded-full h-16 w-16 top-20 right-20 "></div>
              <div className="absolute top-1/2 left-1/2 -translate-1/2 flex gap-4">
                <div className="animate-bounce  bg-white shadow-xl w-14 h-14 flex items-center justify-center -rotate-12 hover:rotate-0 transition-all duration-200 rounded-xl mb-5">
                  <div className="text-primary text-lg">
                    <FaEnvelope />
                  </div>
                </div>
                <div className=" flex flex-col gap-1 items-center">
                  <div className="bg-white shadow-xl w-22 h-22 flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-200 rounded-3xl mb-5">
                    <div className="rounded-2xl bg-primary-100 w-16 h-16 text-2xl text-primary flex items-center justify-center">
                      <FaLock />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary-300"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-400"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  </div>
                </div>
                <div className="animate-bounce  bg-white shadow-xl w-14 h-14 flex items-center justify-center rotate-12 hover:rotate-0 transition-all duration-200 rounded-xl mb-5">
                  <div className="text-primary text-lg">
                    <FaShieldAlt />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 space-y-8">
              <h2 className="text-heading font-bold text-3xl leading-9">
                Reset Your Password
              </h2>
              <p className="text-[#4A5565] text-lg">
                Don&apos;t worry, it happens to the best of us. We&apos;ll help
                you get back into your account in no time.
              </p>
              <div className="flex gap-6 items-center flex-wrap justify-center">
                <div className="flex gap-2 items-center text-sm text-[#6A7282]  leading-5">
                  <FaEnvelope className="text-primary" />
                  Email Verification
                </div>
                <div className="flex gap-2 items-center text-sm text-[#6A7282] leading-5">
                  <FaShieldAlt className="text-primary" />
                  Secure Reset
                </div>
                <div className="flex gap-2 items-center text-sm text-[#6A7282]  leading-5">
                  <FaLock className="text-primary" />
                  Encrypted
                </div>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="col-span-2 md:col-span-1 ">
            <div className="shadow-xl rounded-2xl p-5 sm:p-12 md:p-8 ">
              <MainForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
