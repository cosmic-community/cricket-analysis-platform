import Link from 'next/link'
import { Star, Play } from 'lucide-react'
import { ProfessionalExample } from '@/types'

interface ProfessionalShowcaseProps {
  examples: ProfessionalExample[]
}

export default function ProfessionalShowcase({ examples }: ProfessionalShowcaseProps) {
  if (!examples || examples.length === 0) {
    return (
      <div className="cricket-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Examples</h2>
        <p className="text-gray-500">No professional examples available.</p>
      </div>
    )
  }

  return (
    <div className="cricket-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Learn from the Pros</h2>
        <Link href="/professional" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All Examples
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.slice(0, 3).map((example) => {
          const shotType = example.metadata.shot_type?.value || 'Shot Analysis';
          const timingScore = example.metadata.key_metrics?.timing_score || 0;
          
          return (
            <div key={example.id} className="cricket-card overflow-hidden">
              <div className="aspect-video relative bg-gray-100">
                {example.metadata.example_video?.imgix_url ? (
                  <img
                    src={`${example.metadata.example_video.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                    alt={example.metadata.example_title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="cricket-badge bg-blue-100 text-blue-800">
                    {shotType}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">
                      {timingScore}/10
                    </span>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-1">
                  {example.metadata.example_title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {example.metadata.professional_player}
                </p>
                
                {example.metadata.learning_points && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {example.metadata.learning_points}
                  </p>
                )}
                
                <Link 
                  href={`/professional/${example.slug}`}
                  className="mt-3 inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Analysis
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}