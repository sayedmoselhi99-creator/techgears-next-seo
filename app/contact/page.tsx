"use client"

import ContactForm from "./contact-form"

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Tech Gears Finds4You",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "sayedmoselhi99@gmail.com",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        suppressHydrationWarning
      />
      <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Contact Us</h1>

        <p className="text-lg mb-6 text-center">
          We'd love to hear from you! Whether you have questions, suggestions, or feedback about{" "}
          <strong className="text-blue-600 dark:text-blue-400">Tech Gears Finds4You</strong>, feel free to reach out.
        </p>

        <hr className="border-gray-300 dark:border-gray-700 my-8" />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Email</h2>
          <p>
            You can contact us directly at:{" "}
            <a href="mailto:sayedmoselhi99@gmail.com" className="text-blue-600 dark:text-blue-400 underline">
              sayedmoselhi99@gmail.com
            </a>
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700 my-8" />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Form</h2>
          <p>You can also use the form below to send us a message:</p>
          <ContactForm />
        </section>

        <hr className="border-gray-300 dark:border-gray-700 my-8" />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Social Media</h2>
          <p>Follow us for updates and new posts:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Twitter (X)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Pinterest
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}
