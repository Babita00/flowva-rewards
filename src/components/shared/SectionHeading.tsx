interface SectionHeadingProps {
  title: string
  className?: string
}

export default function SectionHeading({
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="relative text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent pb-2">
        <span className="absolute left-0 top-0 w-2 h-full bg-purple-600" />
        <span className="ml-4">{title}</span>
      </h2>
    </div>
  )
}
