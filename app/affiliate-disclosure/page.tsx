export const metadata = {
  title: "Affiliate Disclosure | Tech Gears Finds4You",
  description: "Affiliate disclosure for Tech Gears Finds4You",
}

export default function AffiliateDisclosure() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Affiliate Disclosure</h1>

      <div className="space-y-8 leading-relaxed">
        <section>
          <p>
            <strong>Tech Gears Finds4You</strong> is a participant in the Amazon Services LLC Associates Program and
            other affiliate advertising programs.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">What This Means</h2>
          <p>
            When you click on a link to Amazon or another affiliate partner's website and make a purchase, we may earn a
            small commission from that sale. This does NOT increase the price you pay — you get the same price whether
            you buy through our link or directly.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Our Commitment</h2>
          <p>
            We only recommend products that we believe are genuinely useful and offer good value. Our affiliate
            relationships do not influence our honest reviews and recommendations.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Questions?</h2>
          <p>
            If you have any questions about our affiliate relationships, please{" "}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">
              contact us
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
