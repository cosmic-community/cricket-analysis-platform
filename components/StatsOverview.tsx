import { Users, FileText, Activity } from 'lucide-react'

interface StatsOverviewProps {
  totalPlayers: number
  totalReports: number
  totalAnalyses: number
}

export default function StatsOverview({ totalPlayers, totalReports, totalAnalyses }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="stat-card">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div className="metric-label">Total Players</div>
        <div className="metric-value">{totalPlayers}</div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
          <FileText className="w-6 h-6 text-green-600" />
        </div>
        <div className="metric-label">Performance Reports</div>
        <div className="metric-value">{totalReports}</div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
          <Activity className="w-6 h-6 text-purple-600" />
        </div>
        <div className="metric-label">Shot Analyses</div>
        <div className="metric-value">{totalAnalyses}</div>
      </div>
    </div>
  )
}