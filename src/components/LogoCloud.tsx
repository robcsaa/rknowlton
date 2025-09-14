import Image from 'next/image';
import { clsx } from 'clsx';

interface Logo {
  name: string;
  src: string;
  alt: string;
}

interface LogoCloudProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  className?: string;
  logoClassName?: string;
  grayscale?: boolean;
}

const defaultLogos: Logo[] = [
  {
    name: 'AWS',
    src: '/logos/aws.svg',
    alt: 'Amazon Web Services logo'
  },
  {
    name: 'Docker',
    src: '/logos/docker.svg',
    alt: 'Docker logo'
  },
  {
    name: 'Kubernetes',
    src: '/logos/kubernetes.svg',
    alt: 'Kubernetes logo'
  },
  {
    name: 'Proxmox',
    src: '/logos/proxmox.svg',
    alt: 'Proxmox logo'
  },
  {
    name: 'Terraform',
    src: '/logos/terraform.svg',
    alt: 'Terraform logo'
  },
  {
    name: 'Python',
    src: '/logos/python.svg',
    alt: 'Python logo'
  },
  {
    name: 'TypeScript',
    src: '/logos/typescript.svg',
    alt: 'TypeScript logo'
  },
  {
    name: 'React',
    src: '/logos/react.svg',
    alt: 'React logo'
  },
];

export default function LogoCloud({
  title = "Trusted tech stack",
  subtitle = "Built with industry-leading tools and platforms",
  logos = defaultLogos,
  className,
  logoClassName,
  grayscale = true,
}: LogoCloudProps) {
  return (
    <div className={clsx("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto max-w-2xl text-center">
            {title && (
              <h2 className="text-lg font-semibold leading-8 text-gray-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={clsx(
          "mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-8",
          title || subtitle ? "mt-10" : "mt-0"
        )}>
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="col-span-2 flex justify-center lg:col-span-1"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className={clsx(
                  "h-12 w-auto object-contain transition-all duration-200",
                  grayscale 
                    ? "grayscale opacity-60 hover:grayscale-0 hover:opacity-100" 
                    : "opacity-80 hover:opacity-100",
                  logoClassName
                )}
                priority={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}