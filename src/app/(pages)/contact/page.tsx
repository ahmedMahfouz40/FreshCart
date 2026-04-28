import ContactCard from "@/components/ContactCard/ContactCard";
import ContactUsForm from "@/components/Forms/ContactUsForm";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeadset,
  FaCircle,
  FaCircleQuestion,
} from "react-icons/fa6";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import Link from "next/link";

const contactCards = [
  {
    icon: <FaPhone />,
    title: "Phone",
    content: (
      <>
        <p className="text-gray-500 text-sm mb-2">Mon-Fri from 8am to 6pm</p>
        <a
          href="tel:+18001234567"
          className="text-primary font-medium hover:underline"
        >
          +1 (800) 123-4567
        </a>
      </>
    ),
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    content: (
      <>
        <p className="text-gray-500 text-sm mb-2">
          We&apos;ll respond within 24 hours
        </p>
        <a
          href="mailto:support@freshcart.com"
          className="text-primary font-medium hover:underline"
        >
          support@freshcart.com
        </a>
      </>
    ),
  },
  {
    icon: <FaLocationDot />,
    title: "Office",
    content: (
      <p className="text-gray-500 text-sm">
        123 Commerce Street
        <br />
        New York, NY 10001
        <br />
        United States
      </p>
    ),
  },
  {
    icon: <FaClock />,
    title: "Business Hours",
    content: (
      <p className="text-gray-500 text-sm">
        Monday - Friday: 8am - 6pm
        <br />
        Saturday: 9am - 4pm
        <br />
        Sunday: Closed
      </p>
    ),
  },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
];

export default function ContactPage() {
  return (
    <div>
      <Header
        title="Contact Us"
        icon={<FaHeadset />}
        desc="We'd love to hear from you. Get in touch with our team."
      />
      <Container>
        <div className="mx-auto grid my-10 grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            {contactCards.map((card) => (
              <ContactCard key={card.title} {...card} />
            ))}

            {/* Social Links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactUsForm />
            <div className="mt-6 bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaCircleQuestion className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Looking for quick answers?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, returns, and more.
                  </p>
                  <Link
                    className="text-primary-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                    href="/help"
                  >
                    Visit Help Center →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
