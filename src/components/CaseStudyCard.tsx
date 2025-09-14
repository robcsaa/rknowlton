import { CaseStudyCardProps } from '@/types';
import { brandConfig } from '@/lib/config';

export default function CaseStudyCard({
  title,
  problem,
  solution,
  outcome,
  metrics,
}: CaseStudyCardProps) {
  return (
    <div className="relative group bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-gray-300">
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      
      {/* Problem → Solution → Outcome Structure */}
      <div className="space-y-6">
        {/* Problem */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#ef4444' }}
            />
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Problem
            </h4>
          </div>
          <p className="text-gray-600 leading-relaxed">{problem}</p>
        </div>

        {/* Solution */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: brandConfig.accentColor }}
            />
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Solution
            </h4>
          </div>
          <p className="text-gray-600 leading-relaxed">{solution}</p>
        </div>

        {/* Outcome */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#10b981' }}
            />
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Outcome
            </h4>
          </div>
          <p className="text-gray-600 leading-relaxed">{outcome}</p>
        </div>
      </div>

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h5 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Key Results
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center sm:text-left">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: brandConfig.accentColor }}
                >
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hover effect indicator */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: brandConfig.accentColor }}
      />
    </div>
  );
}