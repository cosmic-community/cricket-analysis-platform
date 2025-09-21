import { getPerformanceReports } from '@/lib/cosmic'
import Link from 'next/link'
import { format } from 'date-fns'
import { FileText, TrendingUp, Calendar, User } from 'lucide-react'
import { isPlayerProfile } from '@/types'

export default async function ReportsPage() {
  const reports = await getPerformanceReports()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Reports</h1>
        <p className="text-gray-600">Comprehensive analysis reports tracking player progress and performance</p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Performance Reports Available</h3>
          <p className="text-gray-500">Check back later for detailed performance analysis reports.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const player = report.metadata.player;
            const playerName = isPlayerProfile(player) 
              ? player.metadata?.player_name || player.title 
              : 'Unknown Player';

            return (
              <Link 
                key={report.id} 
                href={`/reports/${report.slug}`}
                className="cricket-card p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-primary-600">Performance Report</span>
                  </div>
                  {report.metadata.overall_score && (
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-green-600">{report.metadata.overall_score}</span>
                      <span className="text-sm text-gray-500">/10</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {report.metadata.report_title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {playerName}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(report.metadata.report_date), 'MMM d, yyyy')}
                  </div>
                  {report.metadata.analysis_period && (
                    <div className="text-xs text-gray-500">
                      Period: {report.metadata.analysis_period}
                    </div>
                  )}
                </div>

                {/* Progress Indicators */}
                {report.metadata.performance_trends && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Recent Trends</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {report.metadata.performance_trends.shot_accuracy_trend && (
                        <div>
                          <span className="text-gray-600">Accuracy: </span>
                          <span className="font-medium text-green-600">
                            {report.metadata.performance_trends.shot_accuracy_trend.slice(-1)[0]}/10
                          </span>
                        </div>
                      )}
                      {report.metadata.performance_trends.timing_scores && (
                        <div>
                          <span className="text-gray-600">Timing: </span>
                          <span className="font-medium text-green-600">
                            {report.metadata.performance_trends.timing_scores.slice(-1)[0]}/10
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">View Full Report</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {report.metadata.shot_analyses?.length || 0} analyses
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  )
}