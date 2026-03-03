import Image from "next/image";

interface TestimonialCardProps {
  text: string;
  name: string;
  rating: number;
  image: string;
}

export function TestimonialCard({
  text,
  name,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <div className="flex w-[350px] shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(33,30,31,0.06)] md:w-[400px]">
      {/* Stars */}
      <div className="mb-3 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-4 flex-1">
        <svg
          className="absolute -start-1 -top-2 h-7 w-7 text-primary/15"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
        </svg>
        <p className="relative text-sm leading-relaxed text-dark-light line-clamp-4">
          {text}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="text-sm font-bold text-dark">{name}</span>
      </div>
    </div>
  );
}
