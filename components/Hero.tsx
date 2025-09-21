import Link from 'next/link'
import { TrendingUp, Video, BarChart3 } from 'lucide-react'

export default function Hero() {
  return (
    <div className="bg-cricket-field relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cricket-green/90 to-green-600/80" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Advanced Cricket
            <span className="block text-green-200">Analysis Platform</span>
          </h1>
          
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Upload match videos, track ball trajectories, analyze batting technique, 
            and generate comprehensive performance reports with professional comparisons.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/players"
              className="cricket-button bg-white text-cricket-green hover:bg-gray-100"
            >
              View Players
            </Link>
            <Link 
              href="/analyses"
              className="cricket-button bg-green-600 hover:bg-green-700"
            >
              Shot Analysis
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Video Analysis</h3>
            <p className="text-green-100">Upload and analyze match footage with advanced tracking</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Performance Metrics</h3>
            <p className="text-green-100">Track ball speed, spin rate, bat angle, and footwork</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Progress Tracking</h3>
            <p className="text-green-100">Monitor improvement with detailed reports and insights</p>
          </div>
        </div>
      </div>
    </div>
  )
}