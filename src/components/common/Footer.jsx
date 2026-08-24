import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-8 pt-12 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {/* Brand */}
        <div>
          <h3 className="text-white text-xl font-bold mb-2">MineQueue</h3>
          <p className="text-sm text-gray-400">Book appointments. Skip the wait.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link to="/howItsWork" className="hover:text-white transition">How It Works</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="terms" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-3">Connect</h4>
          <div className="flex gap-4">
            
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © 2026 MineQueue. Built by Vishal as a portfolio project.
      </div>
    </footer>
  );
}

export default Footer;