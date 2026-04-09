import type { FAQItem } from "@/types";
import { getFaqJsonLd, safeJsonLd } from "@/lib/seo";
interface RecetteFAQProps {
  faq: FAQItem[];
}

export default function RecetteFAQ({ faq }: RecetteFAQProps) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(getFaqJsonLd(faq)) }}
      />

      <h3 className="font-display font-bold text-lg">Questions fréquentes</h3>

      <div className="space-y-2">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group glass-card rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-medium text-sm hover:text-accent transition-colors">
              <span>{item.question}</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform duration-200">
                ▾
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {item.reponse}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
