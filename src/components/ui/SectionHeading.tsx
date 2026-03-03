import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center")}>
      <div
        className={cn(
          "mb-4 h-[3px] w-12 rounded-full bg-primary",
          centered && "mx-auto"
        )}
      />
      <h2
        className={cn(
          "text-3xl font-bold md:text-4xl lg:text-5xl",
          light ? "text-white" : "text-dark"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl",
            light ? "text-gray-300" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
