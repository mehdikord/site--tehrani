import { coursesData } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { CourseCard } from "./CourseCard";

/** Every course, grouped by delivery type. Group ids are the anchors used by the nav (#in-person, #recorded, #online). */
export function CourseCatalog() {
  return (
    <section id="catalog" className="pattern-paper relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="همه‌ی دوره‌ها" title="دوره‌ی خود را انتخاب کنید" description="روی هر دوره بزنید تا سرفصل‌ها، ویدئوی معرفی، قیمت و شرایط ثبت‌نام را ببینید." />
        <div className="mt-14 space-y-16 lg:space-y-20">
          {coursesData.categories.map((cat) => {
            const list = coursesData.items.filter((c) => c.category === cat.id);
            if (!list.length) return null;
            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-28">
                <Reveal className="flex items-center gap-4">
                  <h3 className="text-2xl font-black text-pine lg:text-3xl">{cat.title}</h3>
                  <span className="h-px flex-1 bg-pine/15" />
                  <span className="font-latin text-sm text-taupe">{fa(list.length)} دوره</span>
                </Reveal>
                <Reveal stagger={0.1} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {list.map((c) => (
                    <div key={c.slug}><CourseCard c={c} /></div>
                  ))}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
