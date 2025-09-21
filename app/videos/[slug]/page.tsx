// app/videos/[slug]/page.tsx
import { getMatchVideo } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Play, Calendar, Users, Video, FileText } from 'lucide-react'
import { isPlayerProfile } from '@/types'
import PerformanceMatrix from '@/components/PerformanceMatrix'
import ProgressTracker from '@/components/ProgressTracker'

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
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="cricket-card p-6 mb-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{video.metadata.video_title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {playerName}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(video.metadata.match_date), 'MMMM d, yyyy')}
                </div>
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                  {video.metadata.match_type?.value}
                </span>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img 
                src={`${video.metadata.video_file.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                alt={video.metadata.video_title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-gray-800 ml-1" />
                </div>
              </div>
            </div>

            {video.metadata.video_notes && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Session Notes:</h3>
                <p className="text-gray-700 text-sm">{video.metadata.video_notes}</p>
              </div>
            )}
          </div>

          {/* Performance Matrix */}
          <div className="mb-8">
            <PerformanceMatrix 
              playerName={playerName}
              analysisDate={format(new Date(video.metadata.match_date), 'MMMM d, yyyy')}
            />
          </div>

          {/* Progress Tracker */}
          <div className="mb-8">
            <ProgressTracker playerName={playerName} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Video Details */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Video className="w-5 h-5 mr-2 text-primary-600" />
              Video Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{format(new Date(video.metadata.match_date), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{video.metadata.match_type?.value}</span>
              </div>
              {video.metadata.teams && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Teams:</span>
                  <span className="font-medium">{video.metadata.teams}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Player:</span>
                <span className="font-medium">{playerName}</span>
              </div>
            </div>
          </div>

          {/* Player Profile */}
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
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span>{player.metadata.playing_role?.value}</span>
                    <span>•</span>
                    <span>{player.metadata.batting_style?.value}</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Quick Actions */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/upload"
                className="flex items-center space-x-3 p-3 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
              >
                <Video className="w-5 h-5" />
                <span className="font-medium">Upload New Video</span>
              </Link>
              
              <Link
                href="/analyses"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">View All Analyses</span>
              </Link>
              
              <Link
                href="/reports"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Performance Reports</span>
              </Link>
            </div>
          </div>

          {/* Analysis Summary */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Summary</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">8.5</div>
                <div className="text-sm text-green-700">Overall Performance</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="font-bold text-blue-600">135</div>
                  <div className="text-xs text-blue-700">Ball Speed</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <div className="font-bold text-purple-600">42°</div>
                  <div className="text-xs text-purple-700">Bat Angle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}