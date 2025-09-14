import { clsx } from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'accent';
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export default function Section({
  children,
  className,
  containerSize = 'lg',
  background = 'white',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: SectionProps) {
  const containerSizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-7xl',
    xl: 'max-w-none',
  };

  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    accent: 'bg-gradient-to-br from-gray-50 to-gray-100',
  };

  return (
    <section 
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={clsx(
        'py-12 sm:py-16 lg:py-24',
        backgrounds[background],
        className
      )}
    >
      <div className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8', 
        containerSizes[containerSize]
      )}>
        {children}
      </div>
    </section>
  );
}