export const metadata = {
  title: "Terms & Conditions | Tech Gears Finds4You",
  description: "Read our terms and conditions",
}

export default function TermsConditions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Terms & Conditions</h1>

      <div className="space-y-8 leading-relaxed">
        <section>
          <p>
            Welcome to <strong>Tech Gears Finds4You</strong>. By using this website, you agree to comply with these
            terms and conditions.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on our
            website for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
          <p>
            The materials on this website are provided for informational purposes only. We make no warranties, expressed
            or implied, and hereby disclaim and negate any other warranties.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Limitations</h2>
          <p>
            In no event shall Tech Gears Finds4You or its suppliers be liable for damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
            inability to use the materials on this website.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p>
            If you have questions about these terms and conditions, please{" "}
            <a href="mailto:sayedmoselhi99@gmail.com" className="text-blue-600 dark:text-blue-400 underline">
              contact us
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
