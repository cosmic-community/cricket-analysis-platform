import { getShotAnalyses } from '@/lib/cosmic'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Target, Activity } from 'lucide-react'
import { isPlayerProfile } from '@/types'

export default async function AnalysesPage() {
  const shotAnalyses = await getShotAnalyses()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shot Analyses</h1>
        <p className="text-gray-600">Detailed technical analysis of batting techniques and performance</p>
      </div>

      {shotAnalyses.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Shot Analyses Available</h3>
          <p className="text-gray-500">Check back later for detailed shot analysis reports.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shotAnalyses.map((analysis) => {
            const player = analysis.metadata.player;
            const playerName = isPlayerProfile(player) 
              ? player.metadata?.player_name || player.title 
              : 'Unknown Player';
            const score = analysis.metadata.analysis_score || 0;
            const shotType = analysis.metadata.shot_type?.value || 'Unknown Shot';

            return (
              <Link 
                key={analysis.id} 
                href={`/analyses/${analysis.slug}`}
                className="cricket-card p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-primary-600">{shotType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-green-600">{score}</span>
                    <span className="text-sm text-gray-500">/10</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {analysis.metadata.shot_name}
                </h3>

                <p className="text-gray-600 text-sm mb-4">{playerName}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {analysis.metadata.ball_speed && (
                    <div>
                      <span className="text-xs text-gray-500">Ball Speed</span>
                      <p className="font-semibold text-gray-900">{analysis.metadata.ball_speed} km/h</p>
                    </div>
                  )}
                  {analysis.metadata.bat_angle && (
                    <div>
                      <span className="text-xs text-gray-500">Bat Angle</span>
                      <p className="font-semibold text-gray-900">{analysis.metadata.bat_angle}°</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">View Analysis</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  )
}