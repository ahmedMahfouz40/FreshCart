import { FaShieldAlt } from "react-icons/fa";
import { FaGoogle, FaStar, FaTruckFast } from "react-icons/fa6";
import avatar from "@/images/signup-avatar.png";
import Image from "next/image";
import { MdOutlineFacebook } from "react-icons/md";
import Link from "next/link";
import Container from "@/app/_components/Container/Container";
import SignupForm from "@/app/_Forms/SignupForm";

const Signup = () => {
  return (
    <>
      <Container>
        <div className=" grid lg:grid-cols-2 gap-4 my-5">
          {/* Left Side  */}
          <div>
            <div className=" rounded shadow-lg p-4">
              {/* title */}
              <h1 className="font-bold text-4xl leading-10 text-gray-800">
                Welcome to <span className="text-primary-600">FreshCart</span>
              </h1>
              {/* description */}
              <p className="text-xl leading-7 text-gray-600 my-2">
                Join thousands of happy customers who enjoy fresh groceries
                delivered right to their doorstep.
              </p>
              {/* Info */}
              <ul className="py-6 space-y-6">
                <li className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full text-primary-600 flex items-center justify-center text-2xl bg-primary-200">
                    <FaStar />
                  </span>

                  <div>
                    <h3 className="font-semibold text-lg leading-7 text-gray-800">
                      Premium Quality
                    </h3>
                    <p className="text-gray-600 leading-6">
                      Premium quality products sourced from trusted suppliers.
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full text-primary-600 flex items-center justify-center text-2xl bg-primary-200">
                    <FaTruckFast />
                  </span>

                  <div>
                    <h3 className="font-semibold text-lg leading-7 text-gray-800">
                      Fast Delivery
                    </h3>
                    <p className="text-gray-600 leading-6">
                      Same-day delivery available in most areas
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full text-primary-600 flex items-center justify-center text-2xl bg-primary-200">
                    <FaShieldAlt />
                  </span>

                  <div>
                    <h3 className="font-semibold text-lg leading-7 text-gray-800">
                      Secure Shopping
                    </h3>
                    <p className="text-gray-600 leading-6">
                      Your data and payments are completely secure
                    </p>
                  </div>
                </li>
              </ul>
              {/* Review */}
              <div className="p-4">
                <div className="flex gap-2">
                  <div className="div w-12 h-12 rounded-full">
                    <Image src={avatar} alt="avatar" />
                  </div>
                  <div>
                    <h4 className="leading-6 text-gray-700 ">Sarah Johnson</h4>
                    <p className="flex items-center text-yellow-300">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </p>
                  </div>
                </div>
                <p className="italic text-slate-600 leading-6 my-4">
                  &quot;FreshCart has transformed my shopping experience. The
                  quality of the products is outstanding, and the delivery is
                  always on time. Highly recommend!&quot;
                </p>
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div className="p-6 rounded shadow-lg">
            {/* header */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-semibold leading-9 text-slate-700 ">
                Create Your Account
              </h2>
              <p className="leading-6 text-slate-700 font-medium">
                Start your fresh journey with us today
              </p>
            </div>
            {/* Buttons ( SignUp with Google & SignUp With Facebook )  */}
            <div className="flex gap-2 py-8">
              <div className="cursor-pointer w-1/2 justify-center border py-2 px-4 rounded-lg  flex items-center gap-2 font-semibold leading-6">
                <FaGoogle className="text-error-500 " />
                <span className="text-gray-900 ">Google</span>
              </div>
              <div className="cursor-pointer  w-1/2 justify-center border py-2 px-4 rounded-lg flex items-center gap-2 font-semibold leading-6">
                <MdOutlineFacebook className="text-blue-600 text-xl" />
                <span className="text-gray-900 ">Facebook</span>
              </div>
            </div>
            {/* Horizontal Line*/}
            <div className="flex items-center gap-3 text-[#364153] text-sm">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-lg">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <SignupForm />
            <div className="text-center mt-10 text-[#364153] leading-6">
              Already have an account?{" "}
              <Link className="text-primary-600" href={"/login"}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
