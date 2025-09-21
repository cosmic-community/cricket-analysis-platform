import { getPlayerProfiles, getPerformanceReports, getShotAnalyses, getProfessionalExamples } from '@/lib/cosmic'
import StatsOverview from '@/components/StatsOverview'
import RecentReports from '@/components/RecentReports'
import TopPerformers from '@/components/TopPerformers'
import ProfessionalShowcase from '@/components/ProfessionalShowcase'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [players, reports, shotAnalyses, professionalExamples] = await Promise.all([
    getPlayerProfiles(),
    getPerformanceReports(),
    getShotAnalyses(),
    getProfessionalExamples()
  ])

  return (
    <div className="space-y-12">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsOverview 
          totalPlayers={players.length}
          totalReports={reports.length}
          totalAnalyses={shotAnalyses.length}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <RecentReports reports={reports.slice(0, 5)} />
          <TopPerformers shotAnalyses={shotAnalyses.slice(0, 5)} />
        </div>
        
        <ProfessionalShowcase examples={professionalExamples} />
      </div>
    </div>
  )
}