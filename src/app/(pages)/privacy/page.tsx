import {
  FaShieldHalved,
  FaDatabase,
  FaUserShield,
  FaLock,
  FaShareNodes,
  FaUserCheck,
  FaCookie,
  FaClock,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa6";
import Link from "next/link";
import Header from "@/components/Header/Header";
import { FaShieldAlt } from "react-icons/fa";

const articles = [
  {
    icon: <FaDatabase />,
    label: "Article 1",
    title: "Information We Collect",
    items: [
      {
        id: "1.1",
        text: (
          <>
            <strong className="text-gray-800">Personal Data: </strong>Name,
            email address, phone number, and shipping address.
          </>
        ),
      },
      {
        id: "1.2",
        text: (
          <>
            <strong className="text-gray-800">Payment Data: </strong>Credit card
            information processed securely through our payment providers.
          </>
        ),
      },
      {
        id: "1.3",
        text: (
          <>
            <strong className="text-gray-800">Technical Data: </strong>IP
            address, browser type, device information, and access times.
          </>
        ),
      },
      {
        id: "1.4",
        text: (
          <>
            <strong className="text-gray-800">Usage Data: </strong>Pages viewed,
            products browsed, and actions taken within our platform.
          </>
        ),
      },
    ],
  },
  {
    icon: <FaUserShield />,
    label: "Article 2",
    title: "How We Use Your Information",
    items: [
      { id: "2.1", text: "To process and fulfill your orders." },
      { id: "2.2", text: "To send order confirmations and shipping updates." },
      {
        id: "2.3",
        text: "To provide customer support and respond to inquiries.",
      },
      {
        id: "2.4",
        text: "To improve our products, services, and user experience.",
      },
      {
        id: "2.5",
        text: "To send promotional communications (with your consent).",
      },
    ],
  },
  {
    icon: <FaLock />,
    label: "Article 3",
    title: "Data Protection",
    items: [
      {
        id: "3.1",
        text: "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
      },
      {
        id: "3.2",
        text: "Payment information is processed by PCI-compliant payment providers.",
      },
      {
        id: "3.3",
        text: "We conduct regular security audits and vulnerability assessments.",
      },
      {
        id: "3.4",
        text: "Access to personal data is restricted to authorized personnel only.",
      },
    ],
  },
  {
    icon: <FaShareNodes />,
    label: "Article 4",
    title: "Information Sharing",
    items: [
      {
        id: "4.1",
        text: "We do not sell, trade, or rent your personal information to third parties.",
      },
      {
        id: "4.2",
        text: "We may share data with trusted service providers who assist in our operations.",
      },
      {
        id: "4.3",
        text: "We may disclose information when required by law or to protect our rights.",
      },
    ],
  },
  {
    icon: <FaUserCheck />,
    label: "Article 5",
    title: "Your Rights",
    items: [
      {
        id: "5.1",
        text: (
          <>
            <strong className="text-gray-800">Access: </strong>Request a copy of
            your personal data.
          </>
        ),
      },
      {
        id: "5.2",
        text: (
          <>
            <strong className="text-gray-800">Rectification: </strong>Request
            correction of inaccurate data.
          </>
        ),
      },
      {
        id: "5.3",
        text: (
          <>
            <strong className="text-gray-800">Erasure: </strong>Request deletion
            of your personal data.
          </>
        ),
      },
      {
        id: "5.4",
        text: (
          <>
            <strong className="text-gray-800">Portability: </strong>Request your
            data in a portable format.
          </>
        ),
      },
      {
        id: "5.5",
        text: (
          <>
            <strong className="text-gray-800">Opt-out: </strong>Unsubscribe from
            marketing communications at any time.
          </>
        ),
      },
    ],
  },
  {
    icon: <FaCookie />,
    label: "Article 6",
    title: "Cookies",
    items: [
      {
        id: "6.1",
        text: "We use cookies to enhance your browsing experience and remember preferences.",
      },
      {
        id: "6.2",
        text: "You can control cookie settings through your browser preferences.",
      },
      {
        id: "6.3",
        text: "Disabling cookies may affect the functionality of certain features.",
      },
    ],
  },
  {
    icon: <FaClock />,
    label: "Article 7",
    title: "Data Retention",
    description:
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
  },
  {
    icon: <FaEnvelope />,
    label: "Article 8",
    title: "Contact Us",
    description: (
      <>
        For questions about this Privacy Policy or to exercise your rights,
        contact our Data Protection Officer at{" "}
        <a
          href="mailto:privacy@freshcart.com"
          className="text-primary font-semibold hover:underline"
        >
          privacy@freshcart.com
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

export default function PrivacyPage() {
  return (
    <>
      <Header
        title="Privacy Policy"
        desc="Last updated: February 2026"
        icon={<FaShieldAlt />}
      />
      <div className="container mx-auto px-4 py-12">
        {/* Notice Banner */}
        <div className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-8 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 text-white text-xl">
            <FaShieldHalved />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">
              Your Privacy Matters
            </h2>
            <p className="text-primary/80 leading-relaxed">
              This Privacy Policy describes how FreshCart collects, uses, and
              protects your personal information when you use our services. We
              are committed to ensuring that your privacy is protected.
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
            href="/terms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 font-medium transition-all duration-200"
          >
            View Terms of Service <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
