import Link from 'next/link'
import { format } from 'date-fns'
import { FileText, ArrowRight } from 'lucide-react'
import { PerformanceReport } from '@/types'

interface RecentReportsProps {
  reports: PerformanceReport[]
}

export default function RecentReports({ reports }: RecentReportsProps) {
  if (!reports || reports.length === 0) {
    return (
      <div className="cricket-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <p className="text-gray-500">No performance reports available.</p>
      </div>
    )
  }

  return (
    <div className="cricket-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        <Link href="/reports" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {reports.map((report) => {
          const player = report.metadata.player;
          const playerName = player?.metadata?.player_name || player?.title || 'Unknown Player';
          
          return (
            <div key={report.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <Link href={`/reports/${report.slug}`} className="block">
                  <h3 className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">
                    {report.metadata.report_title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {playerName} • {format(new Date(report.metadata.report_date), 'MMM d, yyyy')}
                  </p>
                  {report.metadata.overall_score && (
                    <div className="mt-1">
                      <span className="text-xs text-gray-500">Score: </span>
                      <span className="text-sm font-medium text-green-600">
                        {report.metadata.overall_score}/10
                      </span>
                    </div>
                  )}
                </Link>
              </div>
              
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          );
        })}
      </div>
    </div>
  )
}