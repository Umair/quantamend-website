import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | QuantaMend - AI Automation Insights for Local Businesses",
  description:
    "Expert guides on AI lead reactivation, voice receptionists, and automation strategies for MedSpas, dental clinics, real estate, and high-revenue local businesses.",
  openGraph: {
    title: "QuantaMend Blog | AI Automation Insights",
    description:
      "Expert guides on AI lead reactivation, voice receptionists, and automation for high-revenue local businesses.",
    type: "website",
  },
};

const articles = [
  {
    slug: "dead-lead-reactivation-guide",
    title:
      "The Dead Lead Reactivation Playbook: How AI Turns Dormant Clients Into $127K+ in Recovered Revenue",
    excerpt:
      "Your CRM is sitting on a goldmine. Learn how AI-powered SMS reactivation campaigns are helping MedSpas, dental clinics, and local businesses recover six figures from leads they thought were gone forever.",
    category: "Lead Reactivation",
    readTime: "12 min read",
    date: "April 10, 2026",
  },
  {
    slug: "missed-calls-costing-your-practice",
    title:
      "Your Practice Is Losing $150,000/Year to Missed Calls: Here's the Math (And the Fix)",
    excerpt:
      "62% of calls to local businesses go unanswered. We break down the real revenue impact, show you the lifetime value math, and explain how AI voice agents eliminate this problem permanently.",
    category: "Revenue Recovery",
    readTime: "10 min read",
    date: "April 8, 2026",
  },
  {
    slug: "ai-receptionist-vs-hiring-staff",
    title:
      "AI Receptionist vs. Hiring Another Front Desk Employee: The Complete Cost-Benefit Analysis for 2026",
    excerpt:
      "A new hire costs $45K/year and still can't work nights or weekends. Compare the true total cost of a human receptionist against a 24/7 AI voice agent, using real numbers from actual practices.",
    category: "Operations",
    readTime: "11 min read",
    date: "April 5, 2026",
  },
  {
    slug: "multilingual-ai-untapped-revenue",
    title:
      "The $2.3 Trillion Blind Spot: How Multilingual AI Unlocks Revenue from the Clients You're Accidentally Ignoring",
    excerpt:
      "67 million Americans speak a language other than English at home. If your phones can only handle English, you're leaving massive revenue on the table. Here's how AI solves this overnight.",
    category: "Growth Strategy",
    readTime: "9 min read",
    date: "April 3, 2026",
  },
  {
    slug: "roi-of-ai-automation-local-business",
    title:
      "The ROI of AI Automation for Local Businesses: A Data-Driven Breakdown for Practice Owners",
    excerpt:
      "What does AI automation actually return per dollar invested? We analyze real deployment data across dental clinics, MedSpas, and real estate brokerages to show the true numbers behind AI ROI.",
    category: "Business Case",
    readTime: "13 min read",
    date: "April 1, 2026",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      {/* Header */}
      <div className="mb-16">
        <p className="section-label mb-4">Blog</p>
        <h1 className="display-large mb-6">
          AI Automation Insights for
          <br className="hidden sm:block" />
          Practice Owners & Operators
        </h1>
        <p className="body-large max-w-2xl">
          Expert guides on lead reactivation, voice AI, multilingual
          automation, and the business case for AI operations in high-revenue
          local businesses.
        </p>
      </div>

      {/* Featured article */}
      <a
        href={`/blog/${articles[0].slug}`}
        className="block card-featured p-8 sm:p-10 mb-8 group hover:shadow-[rgba(50,50,93,0.25)_0px_30px_45px_-30px,rgba(0,0,0,0.1)_0px_18px_36px_-18px] transition-all duration-300"
      >
        <span className="badge-success text-[10px] mb-4 inline-flex">
          Featured
        </span>
        <h2 className="text-heading text-2xl sm:text-3xl font-light tracking-tight mb-4 group-hover:text-purple transition-colors" style={{ letterSpacing: "-0.64px" }}>
          {articles[0].title}
        </h2>
        <p className="body-large mb-6 max-w-3xl">{articles[0].excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-body">
          <span className="badge-purple text-[10px]">
            {articles[0].category}
          </span>
          <span>{articles[0].readTime}</span>
          <span>·</span>
          <span>{articles[0].date}</span>
        </div>
      </a>

      {/* Article grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {articles.slice(1).map((article) => (
          <a
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="card p-7 group hover:shadow-[rgba(50,50,93,0.25)_0px_30px_45px_-30px,rgba(0,0,0,0.1)_0px_18px_36px_-18px] transition-all duration-300"
          >
            <span className="badge-purple text-[10px] mb-4 inline-flex">
              {article.category}
            </span>
            <h3 className="text-heading text-lg font-light tracking-tight mb-3 group-hover:text-purple transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-body text-sm leading-relaxed mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-body">
              <span>{article.readTime} · {article.date}</span>
              <ArrowRight
                size={14}
                className="text-purple opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
