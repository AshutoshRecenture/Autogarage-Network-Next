"use client";

export default function PricingTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { name: "GMS Price" },
    { name: "Website for Garages" },
    { name: "Autotechdata", url: "https://www.autotechdata.co.uk/" }
  ];

  return (
    <section className="bg-white py-8 font-sans">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
          {tabs.map((tab) => {
            const isExternal = !!tab.url;
            const isActive = activeTab === tab.name;
            const commonClasses = `px-6 py-3 rounded-xl font-bold text-[15px] transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`;

            if (isExternal) {
              return (
                <a
                  key={tab.name}
                  href={tab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={commonClasses}
                >
                  {tab.name}
                </a>
              );
            }

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={commonClasses}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
