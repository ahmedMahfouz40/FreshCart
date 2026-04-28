import {
  FaFileContract,
  FaHandshake,
  FaUserCheck,
  FaIdCard,
  FaCreditCard,
  FaTruck,
  FaRotateLeft,
  FaScaleBalanced,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import Header from "@/components/Header/Header";

const articles = [
  {
    icon: <FaHandshake />,
    label: "Article 1",
    title: "Acceptance of Terms",
    items: [
      {
        id: "1.1",
        text: "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      },
      {
        id: "1.2",
        text: "If you do not agree to these Terms, you must not access or use the Service.",
      },
      {
        id: "1.3",
        text: "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
      },
    ],
  },
  {
    icon: <FaUserCheck />,
    label: "Article 2",
    title: "User Eligibility",
    items: [
      {
        id: "2.1",
        text: "The Service is intended for users who are at least eighteen (18) years of age.",
      },
      {
        id: "2.2",
        text: "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
      },
      {
        id: "2.3",
        text: "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
      },
    ],
  },
  {
    icon: <FaIdCard />,
    label: "Article 3",
    title: "Account Registration",
    items: [
      {
        id: "3.1",
        text: "You may be required to create an account to access certain features of the Service.",
      },
      {
        id: "3.2",
        text: "You agree to provide accurate, current, and complete information during registration.",
      },
      {
        id: "3.3",
        text: "You are solely responsible for maintaining the confidentiality of your account credentials.",
      },
      {
        id: "3.4",
        text: "You agree to notify us immediately of any unauthorized use of your account.",
      },
    ],
  },
  {
    icon: <FaCreditCard />,
    label: "Article 4",
    title: "Orders and Payments",
    items: [
      {
        id: "4.1",
        text: "All orders placed through the Service are subject to acceptance and availability.",
      },
      {
        id: "4.2",
        text: "Prices are subject to change without notice prior to order confirmation.",
      },
      {
        id: "4.3",
        text: "Payment must be made in full at the time of purchase through approved payment methods.",
      },
      {
        id: "4.4",
        text: "We reserve the right to refuse or cancel any order at our sole discretion.",
      },
    ],
  },
  {
    icon: <FaTruck />,
    label: "Article 5",
    title: "Shipping and Delivery",
    items: [
      {
        id: "5.1",
        text: "Shipping times are estimates only and are not guaranteed.",
      },
      {
        id: "5.2",
        text: "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
      },
      {
        id: "5.3",
        text: "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
      },
    ],
  },
  {
    icon: <FaRotateLeft />,
    label: "Article 6",
    title: "Returns and Refunds",
    items: [
      {
        id: "6.1",
        text: "Our return policy allows returns within 14 days of delivery for most items.",
      },
      { id: "6.2", text: "Products must be unused and in original packaging." },
      {
        id: "6.3",
        text: "Refunds will be processed within 5–7 business days after receiving the returned item.",
      },
    ],
  },
  {
    icon: <FaScaleBalanced />,
    label: "Article 7",
    title: "Limitation of Liability",
    description:
      "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
  },
  {
    icon: <FaEnvelope />,
    label: "Article 8",
    title: "Contact Us",
    description: (
      <>
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:support@freshcart.com"
          className="text-primary font-semibold hover:underline"
        >
          support@freshcart.com
        </a>
      </>
    ),
  },
];

const ArticleCard = ({
  icon,
  label,
  title,
  items,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  items?: { id: string; text: React.ReactNode }[];
  description?: React.ReactNode;
}) => (
  <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300 group">
    <div className="flex items-start gap-4 mb-5">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          {label}
        </span>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
    </div>

    {items && (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              {item.id}
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    )}

    {description && (
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    )}
  </section>
);

export default function TermsPage() {
  return (
    <>
      <Header
        desc="Last updated: February 2026"
        icon={<FaFileContract />}
        title="Terms of Service"
      />
      <div className="container mx-auto px-4 py-12">
        {/* Notice Banner */}
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 text-white text-xl">
            <FaFileContract />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-900 mb-2">
              Important Notice
            </h2>
            <p className="text-amber-800 leading-relaxed">
              By accessing and using FreshCart, you accept and agree to be bound
              by the terms and provisions of this agreement. Please read these
              terms carefully before using our services.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.label} {...article} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-all duration-200"
          >
            <FaArrowLeft className="text-sm" /> Back to Home
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 font-medium transition-all duration-200"
          >
            View Privacy Policy <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
