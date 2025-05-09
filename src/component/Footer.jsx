import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`py-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-200 text-gray-800'} mt-auto`}
    >
      <div className="container mx-auto px-4 text-center">
        <Link
          to="/"
          onClick={scrollToTop}
          className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-600 hover:text-red-500' : 'text-red-700 hover:text-red-600'} transition-colors duration-300`}
        >
          NETFLIX
        </Link>
        <p className="mt-2 text-sm">
          영화 탐색을 위한 최고의 앱 | 문의: support@movieapp.com
        </p>
        <p className="mt-1 text-sm">
          © {new Date().getFullYear()} Movie App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;