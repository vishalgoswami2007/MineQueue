import logo from '../assets/logo.png';
import {Link} from "react-router-dom"

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center gap-3">
        <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer">
             <img src={logo} alt="MineQueue Logo" className="h-10 w-auto" />
                 <Link to="/" className="text-xl font-bold text-white">MineQueue</Link>
                    <p className="text-xs text-slate-500">
                            Healthcare appointments, simplified.
                     </p>
        </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium text-cyan-400">
            LEGAL
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Privacy Policy
          </h2>

          <p className="mt-4 text-slate-400">
            Last updated: August 24, 2026
          </p>
        </div>

        <div className="space-y-10 leading-8">
          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              1. Introduction
            </h3>

            <p>
              Welcome to MineQueue. MineQueue is a healthcare appointment
              booking platform that helps users discover hospitals and doctors,
              view available appointment slots, and book appointments online.
            </p>

            <p className="mt-4">
              We respect your privacy and are committed to protecting the
              personal information you provide while using our website,
              application, and services.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              2. Information We Collect
            </h3>

            <p>
              Depending on how you use MineQueue, we may collect the following
              information:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Account login information</li>
              <li>City, state, and location-related information</li>
              <li>Hospital and doctor appointment details</li>
              <li>Appointment history and booking information</li>
              <li>Information you voluntarily provide to us</li>
              <li>Device, browser, IP address, and technical information</li>
              <li>Usage information about how you interact with MineQueue</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              3. How We Use Your Information
            </h3>

            <p>
              We may use collected information to:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Create and manage your MineQueue account</li>
              <li>Process and manage doctor appointments</li>
              <li>Show relevant hospitals, doctors, and available slots</li>
              <li>Send appointment confirmations and reminders</li>
              <li>Provide customer support</li>
              <li>Improve our website, application, and services</li>
              <li>Prevent fraud, misuse, and unauthorized activity</li>
              <li>Maintain security and platform functionality</li>
              <li>Comply with applicable legal requirements</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              4. Health Information
            </h3>

            <p>
              MineQueue is primarily an appointment booking platform. Users
              should only provide health or medical information when it is
              specifically requested for a legitimate service purpose.
            </p>

            <p className="mt-4">
              MineQueue does not replace a doctor, hospital, emergency service,
              diagnosis, treatment, or professional medical advice.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              5. Sharing of Information
            </h3>

            <p>
              We may share relevant information with hospitals, doctors, and
              service providers when necessary to provide the services you
              request.
            </p>

            <p className="mt-4">
              We may also share information with technology, hosting,
              analytics, payment, communication, or security providers that
              help us operate MineQueue.
            </p>

            <p className="mt-4">
              We do not intend to sell your personal information as a product
              to third parties.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              6. Cookies and Tracking
            </h3>

            <p>
              MineQueue may use cookies, local storage, analytics tools, and
              similar technologies to keep users signed in, remember
              preferences, understand usage, and improve the platform.
            </p>

            <p className="mt-4">
              You may be able to control cookies through your browser settings.
              Disabling certain cookies may affect some features of the
              platform.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              7. Data Security
            </h3>

            <p>
              We use reasonable technical and organizational measures designed
              to protect your information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>

            <p className="mt-4">
              However, no internet-based service can guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              8. Data Retention
            </h3>

            <p>
              We retain information for as long as reasonably necessary to
              provide our services, maintain business records, resolve
              disputes, prevent misuse, and comply with applicable legal
              obligations.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              9. Your Rights
            </h3>

            <p>
              Depending on applicable law, you may have rights regarding your
              personal information, including requesting access, correction,
              deletion, or withdrawal of certain permissions.
            </p>

            <p className="mt-4">
              To make a privacy-related request, contact us using the details
              provided below.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              10. Children's Privacy
            </h3>

            <p>
              MineQueue is not intended to knowingly collect personal
              information from children without appropriate authorization.
              If you believe a child has provided personal information to us
              improperly, please contact us.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              11. Third-Party Services
            </h3>

            <p>
              MineQueue may integrate with third-party services such as
              authentication providers, payment processors, hosting providers,
              analytics services, maps, communication providers, or other
              external services.
            </p>

            <p className="mt-4">
              Those services may have their own privacy policies and terms.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              12. Changes to This Privacy Policy
            </h3>

            <p>
              We may update this Privacy Policy from time to time. When we
              make changes, we may update the "Last updated" date shown at the
              top of this page.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-2xl font-semibold text-white">
              13. Contact Us
            </h3>

            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy, please contact MineQueue.
            </p>

            <p className="mt-4">
              <span className="font-medium text-white">Email:</span>{" "}
              AerqonBusiness@gmail.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;