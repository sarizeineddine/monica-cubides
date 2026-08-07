import { portfolioData } from "@/data/portfolioData";
import SectionHeader from "@/components/shared/SectionHeader";
import Timeline from "@/components/shared/Timeline";

export default function Process() {
  const { process } = portfolioData;
  return (    <section id="proceso" className="section-pad relative">      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">        <SectionHeader          eyebrow={process.eyebrow}          title={process.title}          subtitle={process.subtitle}          align="center"          className="mx-auto"        />        <div className="mt-14">          <Timeline steps={process.steps} />        </div>      </div>    </section>  );
}
