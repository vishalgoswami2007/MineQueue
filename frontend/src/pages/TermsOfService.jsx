import logo from '../assets/logo.png';
import {Link} from "react-router-dom"


const TermsOfService = () => {
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
            Terms of Service
          </h2>

          <p className="mt-4 text-slate-400">
            Last updated: August 24, 2026
          </p>
        </div>

        <div className="space-y-10 leading-8">
          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              1. Acceptance of Terms
            </h3>

            <p>
              By accessing or using MineQueue, you agree to these Terms of
              Service. If you do not agree with these terms, please do not use
              the MineQueue platform.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              2. About MineQueue
            </h3>

            <p>
              MineQueue is a healthcare appointment booking platform designed
              to help users discover hospitals and doctors, view appointment
              availability, and request or book appointments.
            </p>

            <p className="mt-4">
              MineQueue is a technology platform and does not itself provide
              medical diagnosis, treatment, or emergency medical services.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              3. User Accounts
            </h3>

            <p>
              Some MineQueue features may require you to create an account.
              You are responsible for providing accurate information and
              maintaining the confidentiality of your account credentials.
            </p>

            <p className="mt-4">
              You are responsible for activities performed through your
              account and should notify MineQueue if you believe your account
              has been accessed without authorization.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              4. Appointment Booking
            </h3>

            <p>
              MineQueue allows users to select hospitals, doctors, dates, and
              available appointment slots through the platform.
            </p>

            <p className="mt-4">
              Appointment availability may change based on information
              provided by doctors, hospitals, clinics, or other service
              providers.
            </p>

            <p className="mt-4">
              An appointment should be considered confirmed only when MineQueue
              or the relevant healthcare provider displays a confirmation.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              5. Cancellations and Rescheduling
            </h3>

            <p>
              Appointment cancellation and rescheduling may be subject to the
              policies of the relevant hospital, doctor, or healthcare
              provider.
            </p>

            <p className="mt-4">
              Users are responsible for checking appointment details and
              cancellation conditions before booking.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              6. Medical Disclaimer
            </h3>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <p>
                MineQueue is not a medical service provider. Information
                displayed on the platform should not be considered medical
                advice, diagnosis, treatment, or a substitute for consultation
                with a qualified healthcare professional.
              </p>

              <p className="mt-4">
                In case of a medical emergency, contact your local emergency
                service or visit the nearest emergency facility.
              </p>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              7. Doctor and Hospital Information
            </h3>

            <p>
              MineQueue may display information about doctors, hospitals,
              clinics, specialties, availability, reviews, and other
              healthcare services.
            </p>

            <p className="mt-4">
              While we may take reasonable steps to maintain accurate
              information, MineQueue does not guarantee that every piece of
              information will always be complete, current, or error-free.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              8. Acceptable Use
            </h3>

            <p>You agree not to:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Use MineQueue for unlawful purposes</li>
              <li>Provide false or misleading information</li>
              <li>Create accounts using another person's identity</li>
              <li>Attempt to access another user's account</li>
              <li>Interfere with the operation of the platform</li>
              <li>Use automated systems to abuse or overload the service</li>
              <li>Attempt to bypass security measures</li>
              <li>Use the platform to harass doctors, hospitals, or users</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              9. Payments
            </h3>

            <p>
              If MineQueue offers paid services, payments may be processed
              through third-party payment providers. Additional payment,
              cancellation, refund, or service charges may apply depending on
              the service.
            </p>

            <p className="mt-4">
              MineQueue does not store complete payment card information unless
              explicitly stated in the applicable payment terms.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              10. Intellectual Property
            </h3>

            <p>
              The MineQueue name, logo, design, interface, software, graphics,
              content, and other platform materials may be protected by
              applicable intellectual property laws.
            </p>

            <p className="mt-4">
              You may not copy, modify, distribute, reproduce, or commercially
              exploit MineQueue materials without appropriate authorization.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              11. Third-Party Services
            </h3>

            <p>
              MineQueue may contain integrations or links to third-party
              websites and services. MineQueue is not responsible for the
              content, policies, availability, or practices of third-party
              services.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              12. Service Availability
            </h3>

            <p>
              We aim to keep MineQueue available and reliable, but we do not
              guarantee uninterrupted or error-free access. The service may
              occasionally be unavailable due to maintenance, technical
              problems, security issues, or circumstances beyond our control.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              13. Limitation of Liability
            </h3>

            <p>
              To the extent permitted by applicable law, MineQueue will not be
              responsible for losses arising from appointment availability,
              actions of healthcare providers, inaccurate third-party
              information, technical interruptions, or circumstances beyond
              MineQueue's reasonable control.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              14. Account Suspension
            </h3>

            <p>
              MineQueue may suspend or terminate accounts that violate these
              Terms, misuse the platform, engage in fraudulent activity, or
              create security or legal risks.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-2xl font-semibold text-white">
              15. Changes to These Terms
            </h3>

            <p>
              We may update these Terms of Service from time to time. Updated
              terms will be published on this page with a revised "Last
              updated" date.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-2xl font-semibold text-white">
              16. Contact Us
            </h3>

            <p>
              If you have questions regarding these Terms of Service, please
              contact MineQueue.
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

export default TermsOfService;