import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";
import pages from "@/data/pages";

export default function Footer() {
  // Static links
  const staticLinks = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/contact", title: "Contact" },
    { href: "/privacy-policy", title: "Privacy Policy" },
    { href: "/affiliate-disclosure", title: "Affiliate Disclosure" },
    { href: "/terms-conditions", title: "Terms and Conditions" },
    { href: "/disclaimer", title: "Disclaimer" },
  ];

  // Merge static links and dynamic pages, deduplicate by href
  const allLinksMap = new Map<string, { href: string; title: string }>();

  [...staticLinks, ...(pages || [])].forEach((link) => {
    const href = link.href || `/${link.slug}`;
    const title = link.title;
    if (!allLinksMap.has(href)) {
      allLinksMap.set(href, { href, title });
    }
  });

  const allLinks = Array.from(allLinksMap.values());

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Tech Gears Finds4You" className="h-10 w-auto" />
              <h2 className="text-xl font-semibold text-gray-900">Tech Gears Finds4You</h2>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover budget-friendly gadgets, honest reviews, and smart tech that makes life simpler — powered by
              creativity and curiosity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {allLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Stay Connected</h3>
            <div className="flex gap-3 mb-4">
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://youtube.com" icon={<Youtube size={18} />} />
              <SocialLink href="https://github.com" icon={<Github size={18} />} />
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Tech Gears Finds4You. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          Made with ❤️ using Next.js & Tailwind by Tech Gears Finds4You
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
