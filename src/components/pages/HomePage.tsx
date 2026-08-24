import React from 'react';
import { HeroSection } from '../home/HeroSection';
import { SeriesMatrixSection } from '../home/SeriesMatrixSection';
import { PopularProductsSection } from '../home/PopularProductsSection';
import { AdvantagesSection } from '../home/AdvantagesSection';
import { LeadFormSection } from '../home/LeadFormSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <SeriesMatrixSection />
      <PopularProductsSection />
      <AdvantagesSection />
      <LeadFormSection />
    </div>
  );
};
