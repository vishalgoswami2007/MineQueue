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
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#features" className="hover:text-white transition">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
            <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
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