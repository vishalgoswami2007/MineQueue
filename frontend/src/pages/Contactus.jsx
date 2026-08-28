import {Link} from "react-router-dom";
import logo from '../assets/logo.png';


const ContactUs = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">

      {/* Header */}
      <header className="border-b border-white/10">
        <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer">
             <img src={logo} alt="MineQueue Logo" className="h-10 w-auto" />
                 <Link to="/" className="text-xl font-bold text-white">MineQueue</Link>
                    <p className="text-xs text-slate-500">
                         Healthcare appointments, simplified.
                     </p>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-20">

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Get in Touch
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Contact Us
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Have a question, suggestion, or need help with MineQueue?
            We would love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">

          {/* Email */}
          <a
            href="mailto:AerqonBusiness@gmail.com"
            className="group rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.07]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
              ✉️
            </div>

            <h3 className="text-xl font-semibold text-white">
              Email
            </h3>

            <p className="mt-2 break-all text-slate-400 group-hover:text-cyan-400">
              AerqonBusiness@gmail.com
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:+919588559330"
            className="group rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.07]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
              📞
            </div>

            <h3 className="text-xl font-semibold text-white">
              Phone
            </h3>

            <p className="mt-2 text-slate-400 group-hover:text-cyan-400">
              +91 95885 59330
            </p>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/vishalgoswami2007"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.07]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
              💻
            </div>

            <h3 className="text-xl font-semibold text-white">
              GitHub
            </h3>

            <p className="mt-2 text-slate-400 group-hover:text-cyan-400">
              github.com/vishalgoswami2007
            </p>
          </a>

        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-cyan-400/10 bg-linear-to-r from-blue-500/10 to-cyan-400/10 p-8 text-center">
          <h3 className="text-2xl font-bold text-white">
            Let’s make healthcare simpler.
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Whether you are a patient, doctor, hospital, or simply
            want to know more about MineQueue, feel free to reach out.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} MineQueue. All rights reserved.
      </footer>

    </div>
  );
};

export default ContactUs;