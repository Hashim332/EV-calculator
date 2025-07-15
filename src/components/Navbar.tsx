import { useState } from "react";
import ContactModal from "./ContactModal";

function Navbar() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white shadow flex items-center justify-between px-4 py-3 mb-4 md:px-6 md:py-4 md:mb-8">
        <a className="text-xl font-bold focus:outline-none" href="/">
          EV Calculator
        </a>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="text-gray-700 hover:text-violet-500 transition-colors focus:outline-none"
        >
          Contact
        </button>
      </nav>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
