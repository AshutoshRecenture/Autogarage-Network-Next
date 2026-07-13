import React from 'react';
import SeoHero from '@/components/seo/SeoHero';
import SeoSearchTerms from '@/components/seo/SeoSearchTerms';
import SeoBenefits from '@/components/seo/SeoBenefits';
import SeoCTA from '@/components/seo/SeoCTA';

export const metadata = {
  title: 'Automotive SEO Services | Auto Garage Network',
  description: 'The UK\'s number 1 SEO provider for garages and the automotive industry. Rank your MOT, Tyres, and Servicing higher on Google.',
};

export default function SeoPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SeoHero />
      <SeoSearchTerms />
      <SeoBenefits />
      <SeoCTA />
    </main>
  );
}
