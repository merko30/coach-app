import { twMerge } from "tailwind-merge";

const Section = ({
  title,
  subtitle,
  children,
  contentClass,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  contentClass?: string;
}) => (
  <div className="flex flex-col md:flex-row gap-12 py-8 border-b border-gray-100">
    <div className="w-full md:w-1/3">
      <h3 className="text-lg">{title}</h3>
      {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
    </div>
    <div className="w-full md:w-2/3">
      <div
        className={twMerge("w-full md:w-2/3 flex flex-col gap-4", contentClass)}
      >
        {children}
      </div>
    </div>
  </div>
);

export default Section;
