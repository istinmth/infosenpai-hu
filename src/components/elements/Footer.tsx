import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
      <footer className="bg-white text-gray-600 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-900">InfoSenpai</h2>
              <p className="mt-1 text-sm">Érettségi-felkészítés 10-12.-es diákoknak. Velünk gyerekjáték lesz az érettségi!</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link href="/aszf" className="text-sm text-gray-500 hover:text-gray-600">ÁSZF</Link>
              <Link href="/compliance" className="text-sm text-gray-500 hover:text-gray-600">Adatvédelmi irányelvek</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-600">Kapcsolat</Link>
            </div>
            <p className="mt-8 text-sm text-gray-400 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} InfoSenpai. Minden jog fenntartva.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;