import { useState } from "react";
import ContactModal from "./ContactModal";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className='w-full bg-gray-100 border-t border-gray-200 py-4 mt-8'>
        <div className='max-w-3xl mx-auto px-4 flex justify-between items-center text-sm text-gray-600'>
          <div className='flex items-center space-x-4'>
            <a
              href='https://rafiq.codes'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-violet-600 transition-colors font-semibold flex items-center'
            >
              Created by Hashim{" "}
              <ArrowUpRight
                size={15}
                className='inline-block align-baseline ml-0.5'
              />
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className='hover:text-violet-600 transition-colors cursor-pointer'
            >
              Contact
            </button>
          </div>
          <div className='text-xs text-gray-400'>© 2025 EV Calculator</div>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
