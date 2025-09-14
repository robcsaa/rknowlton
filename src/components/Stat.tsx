import { clsx } from 'clsx';
import { brandConfig } from '@/lib/config';

interface StatProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  accentColor?: string;
}

interface StatsGridProps {
  stats: StatProps[];
  title?: string;
  subtitle?: string;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function Stat({
  value,
  label,
  description,
  className,
  valueClassName,
  labelClassName,
  descriptionClassName,
  accentColor = brandConfig.accentColor,
}: StatProps) {
  return (
    <div className={clsx("text-center", className)}>
      <div 
        className={clsx(
          "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
          valueClassName
        )}
        style={{ color: accentColor }}
      >
        {value}
      </div>
      <div className={clsx(
        "mt-2 text-lg font-semibold leading-8 text-gray-900",
        labelClassName
      )}>
        {label}
      </div>
      {description && (
        <div className={clsx(
          "mt-1 text-sm leading-6 text-gray-600",
          descriptionClassName
        )}>
          {description}
        </div>
      )}
    </div>
  );
}

export function StatsGrid({
  stats,
  title,
  subtitle,
  className,
  columns = 3,
}: StatsGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={clsx("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto max-w-2xl text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={clsx(
          "mx-auto mt-16 grid gap-8 sm:gap-12",
          gridCols[columns],
          title || subtitle ? "mt-16" : "mt-0"
        )}>
          {stats.map((stat, index) => (
            <Stat
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              className={stat.className}
              valueClassName={stat.valueClassName}
              labelClassName={stat.labelClassName}
              descriptionClassName={stat.descriptionClassName}
              accentColor={stat.accentColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Pre-configured stats for Rob's metrics
export const robStats: StatProps[] = [
  {
    value: "40-70%",
    label: "Faster cycle times",
    description: "Reduced deployment and development cycles"
  },
  {
    value: "60%",
    label: "Cost savings",
    description: "Average infrastructure cost reduction"
  },
  {
    value: "99.9%",
    label: "Uptime achieved",
    description: "Reliable systems that stay online"
  },
];

export default Stat;