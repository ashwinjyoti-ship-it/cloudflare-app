import { Link } from 'react-router-dom';

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card flex flex-col items-center text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
      {name}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
            Fullstack Starter Template
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Build faster with a
            <span className="block text-blue-600">modern tech stack</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            A production-ready foundation for your next fullstack application.
            Includes a REST API, React frontend, and modern tooling out of the
            box.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/posts" className="btn-primary px-6 py-2.5 text-base">
              Explore Posts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-6 py-2.5 text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Everything you need to get started
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Pre-configured with best practices and modern libraries
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            title="Lightning Fast"
            description="Powered by Vite for instant HMR and lightning-fast builds. Your code compiles in milliseconds, not seconds."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            }
            title="Beautiful UI"
            description="Styled with Tailwind CSS for rapid, consistent design. Responsive, accessible, and customizable components."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
            title="Type Safe"
            description="Full TypeScript support across the stack. Catch errors at compile time and enjoy excellent IDE autocompletion."
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center sm:px-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Modern Tech Stack
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Carefully chosen technologies that work great together
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <TechBadge name="React 18" />
          <TechBadge name="TypeScript" />
          <TechBadge name="Vite" />
          <TechBadge name="Tailwind CSS" />
          <TechBadge name="React Router" />
          <TechBadge name="REST API" />
        </div>
      </section>
    </div>
  );
}
