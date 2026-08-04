import { portfolioData } from "@/data/portfolioData";
import SectionHeader from "@/components/shared/SectionHeader";
import CaseStudyCard from "@/components/shared/CaseStudyCard";

export default function SelectedWork() {
  const { work } = portfolioData;

  return (
    <section id="casos" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow={work.eyebrow} title={work.title} subtitle={work.subtitle} />

        <div className="mt-14 flex flex-col gap-8">
          {work.items.map((item, i) => (
            <CaseStudyCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}