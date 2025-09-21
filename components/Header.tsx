import Link from 'next/link'
import { Activity, Users, Video, FileText, Trophy } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Cricket Analysis</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/players" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Players</span>
            </Link>
            
            <Link 
              href="/reports" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </Link>
            
            <Link 
              href="/analyses" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Activity className="w-4 h-4" />
              <span>Shot Analysis</span>
            </Link>
            
            <Link 
              href="/videos" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Videos</span>
            </Link>
            
            <Link 
              href="/professional" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Pro Examples</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}