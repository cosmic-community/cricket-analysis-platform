// app/videos/[slug]/page.tsx
import { getMatchVideo, getShotAnalyses } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Play, Calendar, Users, Target, TrendingUp } from 'lucide-react'
import { isPlayerProfile } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params
  const video = await getMatchVideo(slug)

  if (!video) {
    notFound()
  }

  const player = video.metadata.player;
  const playerName = isPlayerProfile(player) 
    ? player.metadata?.player_name || player.title 
    : 'Unknown Player';

  // Get related shot analyses for this video
  const allAnalyses = await getShotAnalyses()
  const relatedAnalyses = allAnalyses.filter(analysis => 
    typeof analysis.metadata.related_video === 'object' && 
    analysis.metadata.related_video?.id === video.id
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        href="/videos" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Videos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Content */}
        <div className="lg:col-span-2">
          <div className="cricket-card overflow-hidden mb-8">
            <div className="relative">
              <img 
                src={`${video.metadata.video_file.imgix_url}?w=1000&h=500&fit=crop&auto=format,compress`}
                alt={video.metadata.video_title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <Play className="w-10 h-10 text-gray-800 ml-1" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.metadata.video_title}</h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(video.metadata.match_date), 'MMMM d, yyyy')}
                </div>
                {video.metadata.match_type && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {video.metadata.match_type.value}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Player</h3>
                  <p className="text-gray-600">{playerName}</p>
                </div>
                {video.metadata.teams && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Teams</h3>
                    <p className="text-gray-600">{video.metadata.teams}</p>
                  </div>
                )}
              </div>

              {video.metadata.video_notes && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600">{video.metadata.video_notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Shot Analyses */}
          {relatedAnalyses.length > 0 && (
            <div className="cricket-card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-primary-600" />
                Shot Analyses from this Video
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedAnalyses.map((analysis) => (
                  <Link 
                    key={analysis.id}
                    href={`/analyses/${analysis.slug}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-600">
                        {analysis.metadata.shot_type?.value || 'Shot Analysis'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-bold text-green-600">{analysis.metadata.analysis_score || 0}</span>
                        <span className="text-xs text-gray-500">/10</span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {analysis.metadata.shot_name}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>View detailed analysis</span>
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Video Details */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{format(new Date(video.metadata.match_date), 'MMM d, yyyy')}</span>
              </div>
              {video.metadata.match_type && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{video.metadata.match_type.value}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Analyses:</span>
                <span className="font-medium">{relatedAnalyses.length}</span>
              </div>
            </div>
          </div>

          {/* Player Profile Link */}
          {isPlayerProfile(player) && (
            <div className="cricket-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Player</h3>
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

          {/* Quick Actions */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/analyses" 
                className="w-full btn-primary text-center py-2 rounded-lg"
              >
                View All Analyses
              </Link>
              <Link 
                href="/videos" 
                className="w-full btn-secondary text-center py-2 rounded-lg"
              >
                Browse More Videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}