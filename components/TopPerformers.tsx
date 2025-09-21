import Link from 'next/link'
import { Trophy, ArrowRight } from 'lucide-react'
import { ShotAnalysis } from '@/types'

interface TopPerformersProps {
  shotAnalyses: ShotAnalysis[]
}

export default function TopPerformers({ shotAnalyses }: TopPerformersProps) {
  if (!shotAnalyses || shotAnalyses.length === 0) {
    return (
      <div className="cricket-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Shots</h2>
        <p className="text-gray-500">No shot analyses available.</p>
      </div>
    )
  }

  return (
    <div className="cricket-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Top Performing Shots</h2>
        <Link href="/analyses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {shotAnalyses.map((analysis, index) => {
          const player = analysis.metadata.player;
          const playerName = player?.metadata?.player_name || player?.title || 'Unknown Player';
          const score = analysis.metadata.analysis_score || 0;
          const shotType = analysis.metadata.shot_type?.value || 'Unknown Shot';
          
          return (
            <div key={analysis.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <Link href={`/analyses/${analysis.slug}`} className="block">
                  <h3 className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">
                    {analysis.metadata.shot_name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {playerName} • {shotType}
                  </p>
                  <div className="mt-1 flex items-center space-x-4">
                    <span className="text-xs text-gray-500">Score:</span>
                    <span className="text-sm font-medium text-green-600">
                      {score}/10
                    </span>
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}