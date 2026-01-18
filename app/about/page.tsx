export default function AboutPage() {
  return (
    <div className="prose prose-slate max-w-3xl">
      <h1>About The Modern Ledger</h1>
      <p>
        We are a US-first cost of living and lifestyle database built for
        Americans who want pricing clarity before a move, a job change, or a
        long weekend vacation.
      </p>
      <p>
        We track inflation data across 50 US States and major global cities to
        help Americans budget better.
      </p>
      <h2>Our Data Methodology</h2>
      <p>
        We do not use AI to guess prices. We aggregate data from local rental
        listings (Zillow), government utility reports, and user submissions to
        ensure 98% accuracy.
      </p>
      <h2>Data Sources</h2>
      <p>
        Where do we get our data? We do not guess. Our pricing data is
        aggregated from:
      </p>
      <p>
        We verify our data using Zillow, Redfin, and Government Utility Reports.
      </p>
      <ul>
        <li>Zillow &amp; Redfin Rental Markets (For housing averages).</li>
        <li>USDA Food Plans (For grocery estimates).</li>
        <li>Local Utility Providers (For electricity/water rates).</li>
      </ul>
      <p>
        Our research focuses on apartments, groceries, healthcare, utilities,
        and transportation costs with US-standard formatting, so you can compare
        dollars side-by-side without translation or conversion.
      </p>
    </div>
  );
}
