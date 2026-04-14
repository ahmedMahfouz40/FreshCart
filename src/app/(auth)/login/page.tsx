import { FaClock, FaGoogle, FaStar, FaTruck, FaUsers } from "react-icons/fa6";
import Image from "next/image";
import { MdOutlineFacebook } from "react-icons/md";
import LoginForm from "./LoginForm";
import image from "@/images/login-Image.png";
import Link from "next/link";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import Container from "@/app/_components/Container/Container";
const Signin = () => {
  return (
    <>
      <Container>
        <div className="grid lg:grid-cols-2 gap-4 my-5">
          {/* Left Side  */}
          <div className="hidden sm:block">
            <div className=" rounded  shadow-lg p-5 xl:p-10 text-center space-y-5">
              <div className="shadow-lg rounded-3xl overflow-hidden">
                <Image src={image} alt="fresh cart" />
              </div>
              <h2 className="font-bold text-3xl text-[#1E2939] ">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-[#4A5565]">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>
              <div className="flex items-center justify-center gap-5 ">
                <div className="flex items-center gap-2 leading-5">
                  <FaTruck className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Free Delivery
                  </span>
                </div>
                <div className="flex items-center gap-2 leading-5">
                  <FaShieldAlt className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Secure Payment
                  </span>
                </div>
                <div className="flex items-center gap-2 leading-5">
                  <FaClock className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div className="p-12 rounded shadow-lg">
            {/* header */}
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold leading-9 text-[#1E2939] space-y-2 ">
                <span className="text-primary">Fresh</span>Cart
                <br />
                Welcome Back!
              </h1>

              <p className="leading-6 text-slate-700 font-medium">
                Sign in to continue your fresh shopping experience
              </p>
            </div>
            {/* Buttons ( SignUp with Google & SignUp With Facebook )  */}
            <div className=" py-8 space-y-2">
              <div className="cursor-pointer  w-full justify-center border-2 py-3 px-4 rounded-xl  flex items-center gap-2 font-semibold leading-6">
                <FaGoogle className="text-red-600 " />
                <span className="text-gray-900 ">Google</span>
              </div>
              <div className="cursor-pointer  w-full  justify-center border-2 py-3 px-4 rounded-xl flex items-center gap-2 font-semibold leading-6">
                <MdOutlineFacebook className="text-blue-600 text-xl" />
                <span className="text-gray-900 ">Facebook</span>
              </div>
            </div>
            {/* Horizontal Line*/}
            <div className="flex items-center gap-3 text-[#364153] text-sm">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs sm:text-lg">OR CONTINUE WITH EMAIL</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <LoginForm />
            <div className="text-center mt-10 text-[#364153] leading-6">
              New To FreshCart ?
              <Link className="text-primary" href={"/signup"}>
                Create an account
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-sm justify-center my-5 gap-5 text-muted-foreground">
              <div className="flex items-center gap-1 leading-5">
                <FaLock />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center gap-1 leading-5">
                <FaUsers />
                <span className="text-sm">50K+ Users</span>
              </div>
              <div className="flex items-center gap-1 leading-5">
                <FaStar />
                <span className="text-sm">4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signin;
