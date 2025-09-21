import { getMatchVideos } from '@/lib/cosmic'
import Link from 'next/link'
import { format } from 'date-fns'
import { Play, Calendar, Users } from 'lucide-react'
import { isPlayerProfile } from '@/types'

export default async function VideosPage() {
  const videos = await getMatchVideos()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Videos</h1>
        <p className="text-gray-600">Video analysis and match recordings for performance review</p>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Videos Available</h3>
          <p className="text-gray-500">Check back later for video analysis content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const player = video.metadata.player;
            const playerName = isPlayerProfile(player) 
              ? player.metadata?.player_name || player.title 
              : 'Unknown Player';

            return (
              <Link 
                key={video.id} 
                href={`/videos/${video.slug}`}
                className="cricket-card overflow-hidden hover:shadow-lg transition-all duration-200 group"
              >
                <div className="relative">
                  <img 
                    src={`${video.metadata.video_file.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                    alt={video.metadata.video_title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {video.metadata.video_title}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(video.metadata.match_date), 'MMM d, yyyy')}
                    </div>
                    {video.metadata.match_type && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {video.metadata.match_type.value}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{playerName}</p>

                  {video.metadata.teams && (
                    <p className="text-gray-500 text-sm">{video.metadata.teams}</p>
                  )}

                  {video.metadata.video_notes && (
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{video.metadata.video_notes}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  )
}