'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Calendar, TrendingUp, Target, BarChart3 } from 'lucide-react'

interface ProgressData {
  date: string
  analysisScore: number
  ballSpeed: number
  battingAverage: number
  shotAccuracy: number
  footworkScore: number
  timingScore: number
}

interface ProgressTrackerProps {
  playerName: string
  data?: ProgressData[]
}

const defaultData: ProgressData[] = [
  {
    date: '2024-01-01',
    analysisScore: 7.2,
    ballSpeed: 125,
    battingAverage: 42,
    shotAccuracy: 7.2,
    footworkScore: 7.5,
    timingScore: 7.8
  },
  {
    date: '2024-01-08',
    analysisScore: 7.5,
    ballSpeed: 128,
    battingAverage: 44,
    shotAccuracy: 7.5,
    footworkScore: 7.8,
    timingScore: 8.0
  },
  {
    date: '2024-01-15',
    analysisScore: 7.8,
    ballSpeed: 132,
    battingAverage: 46,
    shotAccuracy: 7.8,
    footworkScore: 8.0,
    timingScore: 8.1
  },
  {
    date: '2024-01-22',
    analysisScore: 8.1,
    ballSpeed: 135,
    battingAverage: 48,
    shotAccuracy: 8.1,
    footworkScore: 8.2,
    timingScore: 8.3
  },
  {
    date: '2024-01-29',
    analysisScore: 8.5,
    ballSpeed: 138,
    battingAverage: 47,
    shotAccuracy: 8.5,
    footworkScore: 8.4,
    timingScore: 8.6
  }
]

const metricConfig = {
  analysisScore: {
    label: 'Analysis Score',
    color: '#10B981',
    unit: '/10',
    description: 'Overall technical performance rating'
  },
  ballSpeed: {
    label: 'Ball Speed',
    color: '#3B82F6',
    unit: 'km/h',
    description: 'Average speed of balls faced'
  },
  battingAverage: {
    label: 'Batting Average',
    color: '#8B5CF6',
    unit: '',
    description: 'Statistical batting performance'
  },
  shotAccuracy: {
    label: 'Shot Accuracy',
    color: '#F59E0B',
    unit: '/10',
    description: 'Precision and placement of shots'
  },
  footworkScore: {
    label: 'Footwork',
    color: '#EF4444',
    unit: '/10',
    description: 'Quality of foot movement and positioning'
  },
  timingScore: {
    label: 'Timing',
    color: '#06B6D4',
    unit: '/10',
    description: 'Bat-ball contact timing accuracy'
  }
}

export default function ProgressTracker({ 
  playerName, 
  data = defaultData 
}: ProgressTrackerProps) {
  const [selectedMetric, setSelectedMetric] = useState<keyof typeof metricConfig>('analysisScore')
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | 'all'>('all')

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getLatestValue = (metric: keyof typeof metricConfig) => {
    const latest = data[data.length - 1]
    return latest ? latest[metric] : 0
  }

  const getPreviousValue = (metric: keyof typeof metricConfig) => {
    const previous = data[data.length - 2]
    return previous ? previous[metric] : 0
  }

  const getChange = (metric: keyof typeof metricConfig) => {
    const latest = getLatestValue(metric)
    const previous = getPreviousValue(metric)
    const change = latest - previous
    const percentage = previous !== 0 ? ((change / previous) * 100) : 0
    return { absolute: change, percentage }
  }

  const getFilteredData = () => {
    if (timeRange === 'all') return data
    
    const now = new Date()
    const months = {
      '1m': 1,
      '3m': 3,
      '6m': 6
    }
    
    const cutoffDate = new Date(now.setMonth(now.getMonth() - months[timeRange]))
    return data.filter(d => new Date(d.date) >= cutoffDate)
  }

  const currentMetric = metricConfig[selectedMetric]
  const change = getChange(selectedMetric)
  const filteredData = getFilteredData()

  return (
    <div className="cricket-card p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Progress Tracker</h2>
            <p className="text-gray-600">{playerName} - Performance Over Time</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Metric Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(metricConfig).map(([key, config]) => {
            const isSelected = selectedMetric === key
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key as keyof typeof metricConfig)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Current Metric Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Current</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {getLatestValue(selectedMetric).toFixed(1)}{currentMetric.unit}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className={`w-4 h-4 ${change.absolute >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm font-medium text-gray-600">Change</span>
            </div>
            <div className={`text-2xl font-bold ${change.absolute >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change.absolute >= 0 ? '+' : ''}{change.absolute.toFixed(1)}{currentMetric.unit}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className={`w-4 h-4 ${change.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm font-medium text-gray-600">Improvement</span>
            </div>
            <div className={`text-2xl font-bold ${change.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change.percentage >= 0 ? '+' : ''}{change.percentage.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                labelFormatter={(value) => formatDate(value as string)}
                formatter={(value: number) => [
                  `${value.toFixed(1)}${currentMetric.unit}`, 
                  currentMetric.label
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={currentMetric.color}
                strokeWidth={3}
                fill={`url(#gradient-${selectedMetric})`}
                dot={{ fill: currentMetric.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentMetric.color, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Performance Insight</h3>
        <p className="text-sm text-gray-700">
          {currentMetric.description}. 
          {change.absolute >= 0 
            ? ` Your ${currentMetric.label.toLowerCase()} has improved by ${Math.abs(change.percentage).toFixed(1)}% since your last session, showing consistent progress in this area.`
            : ` Your ${currentMetric.label.toLowerCase()} has decreased by ${Math.abs(change.percentage).toFixed(1)}% since your last session. Consider focusing on this area in upcoming practice sessions.`
          }
        </p>
      </div>
    </div>
  )
}