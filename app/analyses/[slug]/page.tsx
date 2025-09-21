// app/analyses/[slug]/page.tsx
import { getShotAnalysis } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Target, Activity, TrendingUp, Play } from 'lucide-react'
import { isPlayerProfile, isMatchVideo } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ShotAnalysisPage({ params }: PageProps) {
  const { slug } = await params
  const analysis = await getShotAnalysis(slug)

  if (!analysis) {
    notFound()
  }

  const player = analysis.metadata.player;
  const playerName = isPlayerProfile(player) 
    ? player.metadata?.player_name || player.title 
    : 'Unknown Player';
  
  const relatedVideo = analysis.metadata.related_video;
  const videoTitle = isMatchVideo(relatedVideo) 
    ? relatedVideo.metadata?.video_title || relatedVideo.title 
    : 'Practice Video';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        href="/analyses" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Analyses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="cricket-card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{analysis.metadata.shot_name}</h1>
                <p className="text-gray-600">{playerName}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{analysis.metadata.analysis_score || 0}</div>
                <div className="text-sm text-gray-500">Overall Score</div>
              </div>
            </div>

            {/* Video Section */}
            {isMatchVideo(relatedVideo) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-primary-600" />
                  Video Analysis
                </h3>
                <div className="relative rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={`${relatedVideo.metadata.video_file.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                    alt={videoTitle}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{videoTitle}</p>
              </div>
            )}

            {/* Technical Analysis */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Analysis</h3>
              {analysis.metadata.recommendations ? (
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: analysis.metadata.recommendations }}
                />
              ) : (
                <p className="text-gray-600">Detailed technical analysis will be available soon.</p>
              )}
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ball & Impact Data</h4>
                <div className="space-y-3">
                  {analysis.metadata.ball_speed && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ball Speed:</span>
                      <span className="font-medium">{analysis.metadata.ball_speed} km/h</span>
                    </div>
                  )}
                  {analysis.metadata.spin_rate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spin Rate:</span>
                      <span className="font-medium">{analysis.metadata.spin_rate} rpm</span>
                    </div>
                  )}
                  {analysis.metadata.bat_angle && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bat Angle:</span>
                      <span className="font-medium">{analysis.metadata.bat_angle}°</span>
                    </div>
                  )}
                  {analysis.metadata.impact_zone && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impact Quality:</span>
                      <span className="font-medium capitalize">{analysis.metadata.impact_zone.impact_quality}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Shot Trajectory</h4>
                <div className="space-y-3">
                  {analysis.metadata.trajectory_data?.launch_angle && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Launch Angle:</span>
                      <span className="font-medium">{analysis.metadata.trajectory_data.launch_angle}°</span>
                    </div>
                  )}
                  {analysis.metadata.trajectory_data?.exit_velocity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exit Velocity:</span>
                      <span className="font-medium">{analysis.metadata.trajectory_data.exit_velocity} km/h</span>
                    </div>
                  )}
                  {analysis.metadata.trajectory_data?.distance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-medium">{analysis.metadata.trajectory_data.distance}m</span>
                    </div>
                  )}
                  {analysis.metadata.trajectory_data?.direction && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Direction:</span>
                      <span className="font-medium capitalize">{analysis.metadata.trajectory_data.direction.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Footwork Analysis */}
          {analysis.metadata.footwork_analysis && (
            <div className="cricket-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary-600" />
                Footwork Analysis
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Front Foot:</span>
                  <span className="font-medium capitalize">{analysis.metadata.footwork_analysis.front_foot_position.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-medium capitalize">{analysis.metadata.footwork_analysis.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight Transfer:</span>
                  <span className="font-medium capitalize">{analysis.metadata.footwork_analysis.weight_transfer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stance Width:</span>
                  <span className="font-medium capitalize">{analysis.metadata.footwork_analysis.stance_width}</span>
                </div>
              </div>
            </div>
          )}

          {/* Shot Type */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-600" />
              Shot Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Shot Type:</span>
                <span className="font-medium">{analysis.metadata.shot_type?.value || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Analysis Score:</span>
                <span className="font-medium text-green-600">{analysis.metadata.analysis_score || 0}/10</span>
              </div>
            </div>
          </div>

          {/* Player Link */}
          {isPlayerProfile(player) && (
            <div className="cricket-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Player Profile</h3>
              <Link 
                href={`/players/${player.slug}`}
                className="flex items-center space-x-3 hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                {player.metadata.profile_photo && (
                  <img 
                    src={`${player.metadata.profile_photo.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                    alt={playerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{playerName}</p>
                  <p className="text-sm text-gray-600">{player.metadata.team}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}