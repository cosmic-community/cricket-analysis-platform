'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Target, Activity, Zap, Eye } from 'lucide-react'

interface MetricData {
  name: string
  current: number
  previous: number
  trend: 'up' | 'down' | 'neutral'
  unit: string
  description: string
  icon: React.ComponentType<any>
}

interface PerformanceMatrixProps {
  playerName: string
  analysisDate: string
  metrics?: MetricData[]
}

const defaultMetrics: MetricData[] = [
  {
    name: 'Analysis Score',
    current: 8.5,
    previous: 7.8,
    trend: 'up',
    unit: '/10',
    description: 'Overall technical performance rating',
    icon: Target
  },
  {
    name: 'Ball Speed',
    current: 135,
    previous: 130,
    trend: 'up',
    unit: 'km/h',
    description: 'Average speed of balls faced',
    icon: Zap
  },
  {
    name: 'Bat Angle',
    current: 42,
    previous: 45,
    trend: 'down',
    unit: '°',
    description: 'Optimal angle maintained during shot',
    icon: Activity
  },
  {
    name: 'Exit Velocity',
    current: 89,
    previous: 85,
    trend: 'up',
    unit: 'km/h',
    description: 'Speed of ball after contact',
    icon: TrendingUp
  },
  {
    name: 'Launch Angle',
    current: 15,
    previous: 18,
    trend: 'down',
    unit: '°',
    description: 'Angle at which ball left the bat',
    icon: Eye
  },
  {
    name: 'Distance',
    current: 45,
    previous: 42,
    trend: 'up',
    unit: 'm',
    description: 'Distance the ball traveled',
    icon: Target
  }
]

export default function PerformanceMatrix({ 
  playerName, 
  analysisDate, 
  metrics = defaultMetrics 
}: PerformanceMatrixProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getTrendChange = (current: number, previous: number) => {
    const change = current - previous
    const percentage = ((change / previous) * 100).toFixed(1)
    return {
      absolute: Math.abs(change).toFixed(1),
      percentage: Math.abs(parseFloat(percentage)).toFixed(1)
    }
  }

  return (
    <div className="cricket-card p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Matrix</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">{playerName}</p>
          <p className="text-sm text-gray-500">{analysisDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon
          const change = getTrendChange(metric.current, metric.previous)
          const isSelected = selectedMetric === metric.name

          return (
            <div
              key={metric.name}
              onClick={() => setSelectedMetric(isSelected ? null : metric.name)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <IconComponent className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">{metric.name}</span>
                </div>
                {getTrendIcon(metric.trend)}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {metric.current}
                    </span>
                    <span className="text-sm text-gray-500">{metric.unit}</span>
                  </div>
                  
                  <div className={`text-xs ${getTrendColor(metric.trend)} flex items-center space-x-1 mt-1`}>
                    <span>
                      {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}
                      {change.absolute}
                    </span>
                    <span>({change.percentage}%)</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500">Previous</div>
                  <div className="text-sm font-medium text-gray-700">
                    {metric.previous}{metric.unit}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed View for Selected Metric */}
      {selectedMetric && (
        <div className="border-t pt-6">
          {(() => {
            const metric = metrics.find(m => m.name === selectedMetric)
            if (!metric) return null

            const change = getTrendChange(metric.current, metric.previous)
            const IconComponent = metric.icon

            return (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {metric.current}{metric.unit}
                    </div>
                    <div className="text-sm text-gray-600">Current Value</div>
                  </div>

                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${getTrendColor(metric.trend)}`}>
                      {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}
                      {change.absolute}
                    </div>
                    <div className="text-sm text-gray-600">Change</div>
                  </div>

                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${getTrendColor(metric.trend)}`}>
                      {change.percentage}%
                    </div>
                    <div className="text-sm text-gray-600">Improvement</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Analysis Insight</h4>
                  <p className="text-sm text-gray-700">
                    {metric.trend === 'up' && 
                      `Great improvement in ${metric.name.toLowerCase()}! Your technique is showing positive progress with a ${change.percentage}% increase from your previous session.`
                    }
                    {metric.trend === 'down' && 
                      `Your ${metric.name.toLowerCase()} has decreased by ${change.percentage}%. This might indicate fatigue or a technical adjustment - review your form and consider focused practice.`
                    }
                    {metric.trend === 'neutral' && 
                      `Your ${metric.name.toLowerCase()} remains consistent. Focus on maintaining this level while working on other aspects of your game.`
                    }
                  </p>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Performance Summary */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {metrics.filter(m => m.trend === 'up').length}
            </div>
            <div className="text-sm text-green-700">Improved</div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {metrics.filter(m => m.trend === 'down').length}
            </div>
            <div className="text-sm text-red-700">Declined</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">
              {metrics.filter(m => m.trend === 'neutral').length}
            </div>
            <div className="text-sm text-gray-700">Stable</div>
          </div>
        </div>
      </div>
    </div>
  )
}