import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import CollabEdNamePlate from "../NamePlate/CollabEdNamePlate";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-3"><CollabEdNamePlate></CollabEdNamePlate></h2>
          <p className="text-sm opacity-80">
            Your trusted collaborative education platform. Join study sessions,
            explore learning paths, and grow together.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-xl hover:text-primary">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl hover:text-primary">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-primary">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-primary">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/sessions" className="hover:text-primary">Sessions</a></li>
            <li><a href="/tutors" className="hover:text-primary">Tutors</a></li>
            <li><a href="/resources" className="hover:text-primary">Resources</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-primary">FAQ</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm flex items-center gap-2">
            <FaEnvelope className="text-accent" /> support@collabed.com
          </p>
          <p className="text-sm flex items-center gap-2 mt-2">
            <FaPhoneAlt className="text-accent" /> +880 123 456 789
          </p>
          <p className="text-sm flex items-center gap-2 mt-2">
            <FaMapMarkerAlt className="text-accent" /> Dhaka, Bangladesh
          </p>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-base-300">
        © {new Date().getFullYear()} CollabEd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
