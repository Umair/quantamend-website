"use client";

import { useAnimate } from "./use-animate";

const categories = [
  {
    label: "Frontend",
    techs: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "Python", "Go", "Rust", "GraphQL"],
  },
  {
    label: "Cloud & DevOps",
    techs: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform"],
  },
  {
    label: "AI / ML",
    techs: ["OpenAI", "LangChain", "PyTorch", "TensorFlow", "RAG"],
  },
  {
    label: "Databases",
    techs: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Supabase"],
  },
  {
    label: "Mobile",
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
  },
];

export default function TechStack() {
  const { ref: headerRef, visible: headerVisible } = useAnimate();
  const { ref: gridRef, visible: gridVisible } = useAnimate();

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Technology
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            What&apos;s Your{" "}
            <span className="gradient-text-static">Stack?</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            We leverage a powerful tech stack tailored to meet diverse project
            needs, ensuring scalability, performance, and security.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children"
        >
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`glass-card-flat p-7 reveal ${gridVisible ? "visible" : ""}`}
            >
              <h3 className="text-sm font-semibold text-cyan uppercase tracking-wider mb-5">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 text-sm rounded-lg bg-white/[0.04] border border-border text-secondary hover:text-foreground hover:border-cyan/20 hover:bg-cyan/5 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
