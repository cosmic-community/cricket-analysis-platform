// app/reports/[slug]/page.tsx
import { getPerformanceReport } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, FileText, TrendingUp, Target, Activity, Trophy, Users } from 'lucide-react'
import { isPlayerProfile, isShotAnalysis } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params
  const report = await getPerformanceReport(slug)

  if (!report) {
    notFound()
  }

  const player = report.metadata.player;
  const playerName = isPlayerProfile(player) 
    ? player.metadata?.player_name || player.title 
    : 'Unknown Player';

  const shotAnalyses = report.metadata.shot_analyses?.filter(isShotAnalysis) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        href="/reports" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Reports
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="cricket-card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{report.metadata.report_title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{playerName}</span>
                  <span>•</span>
                  <span>{format(new Date(report.metadata.report_date), 'MMMM d, yyyy')}</span>
                  {report.metadata.analysis_period && (
                    <>
                      <span>•</span>
                      <span>{report.metadata.analysis_period}</span>
                    </>
                  )}
                </div>
              </div>
              {report.metadata.overall_score && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">{report.metadata.overall_score}</div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
              )}
            </div>

            {/* Performance Trends Charts */}
            {report.metadata.performance_trends && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                  Performance Trends
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Batting Average Trend */}
                  {report.metadata.performance_trends.batting_average_trend && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Batting Average Trend</h4>
                      <div className="flex items-end space-x-2 h-20">
                        {report.metadata.performance_trends.batting_average_trend.map((value, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${(value / 50) * 100}%`, minHeight: '4px' }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Shot Accuracy Trend */}
                  {report.metadata.performance_trends.shot_accuracy_trend && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Shot Accuracy</h4>
                      <div className="flex items-end space-x-2 h-20">
                        {report.metadata.performance_trends.shot_accuracy_trend.map((value, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-green-500 rounded-t"
                              style={{ height: `${(value / 10) * 100}%`, minHeight: '4px' }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footwork Scores */}
                  {report.metadata.performance_trends.footwork_scores && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Footwork Progress</h4>
                      <div className="flex items-end space-x-2 h-20">
                        {report.metadata.performance_trends.footwork_scores.map((value, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-purple-500 rounded-t"
                              style={{ height: `${(value / 10) * 100}%`, minHeight: '4px' }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timing Scores */}
                  {report.metadata.performance_trends.timing_scores && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Timing Improvement</h4>
                      <div className="flex items-end space-x-2 h-20">
                        {report.metadata.performance_trends.timing_scores.map((value, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-orange-500 rounded-t"
                              style={{ height: `${(value / 10) * 100}%`, minHeight: '4px' }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Key Insights */}
            {report.metadata.key_insights && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: report.metadata.key_insights }}
                />
              </div>
            )}

            {/* Recommendations */}
            {report.metadata.recommendations && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: report.metadata.recommendations }}
                />
              </div>
            )}

            {/* Shot Analyses */}
            {shotAnalyses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  Related Shot Analyses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shotAnalyses.map((analysis) => (
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
                      
                      <h4 className="font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {analysis.metadata.shot_name}
                      </h4>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>View detailed analysis</span>
                        <Activity className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Comparison Data */}
          {report.metadata.comparison_data && (
            <div className="cricket-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-primary-600" />
                Performance Comparison
              </h3>
              
              {/* vs Professional */}
              {report.metadata.comparison_data.vs_professional && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">vs Professional Standards</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drive Technique:</span>
                      <span className="font-medium">{report.metadata.comparison_data.vs_professional.drive_technique}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Footwork:</span>
                      <span className="font-medium">{report.metadata.comparison_data.vs_professional.footwork}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timing:</span>
                      <span className="font-medium">{report.metadata.comparison_data.vs_professional.timing}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shot Selection:</span>
                      <span className="font-medium">{report.metadata.comparison_data.vs_professional.shot_selection}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Peer Comparison */}
              {report.metadata.comparison_data.peer_comparison && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Peer Ranking</h4>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">
                      #{report.metadata.comparison_data.peer_comparison.rank}
                    </div>
                    <div className="text-sm text-gray-600">
                      out of {report.metadata.comparison_data.peer_comparison.total_players} players
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {report.metadata.comparison_data.peer_comparison.percentile}th percentile
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
                </div>
              </Link>
            </div>
          )}

          {/* Report Stats */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Report Date:</span>
                <span className="font-medium">{format(new Date(report.metadata.report_date), 'MMM d, yyyy')}</span>
              </div>
              {report.metadata.analysis_period && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Period:</span>
                  <span className="font-medium">{report.metadata.analysis_period}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Analyses:</span>
                <span className="font-medium">{shotAnalyses.length}</span>
              </div>
              {report.metadata.overall_score && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Score:</span>
                  <span className="font-medium text-green-600">{report.metadata.overall_score}/10</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}