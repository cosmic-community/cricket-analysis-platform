'use client'

import { useState } from 'react'
import { Upload, Video, FileText, Activity, Target, BarChart3, CheckCircle } from 'lucide-react'

const shotTypes = [
  'Drive',
  'Cut', 
  'Pull',
  'Hook',
  'Sweep',
  'Flick',
  'Defensive Shot'
]

const analysisMetrics = {
  'Drive': {
    ballSpeed: 135,
    spinRate: 2200,
    batAngle: 42,
    analysisScore: 8.5,
    impactZone: { x: 125, y: 85, zone: 'good_length', quality: 'optimal' },
    footwork: { position: 'well_forward', balance: 'good', transfer: 'complete' },
    trajectory: { launchAngle: 15, exitVelocity: 89, distance: 45, direction: 'cover_region' }
  },
  'Cut': {
    ballSpeed: 140,
    spinRate: 1800,
    batAngle: 65,
    analysisScore: 7.8,
    impactZone: { x: 140, y: 75, zone: 'short_of_length', quality: 'good' },
    footwork: { position: 'back_foot', balance: 'excellent', transfer: 'partial' },
    trajectory: { launchAngle: 8, exitVelocity: 95, distance: 38, direction: 'point_region' }
  },
  'Pull': {
    ballSpeed: 145,
    spinRate: 1500,
    batAngle: 85,
    analysisScore: 7.2,
    impactZone: { x: 120, y: 65, zone: 'short', quality: 'good' },
    footwork: { position: 'back_foot', balance: 'good', transfer: 'complete' },
    trajectory: { launchAngle: 25, exitVelocity: 98, distance: 52, direction: 'mid_wicket' }
  },
  'Hook': {
    ballSpeed: 150,
    spinRate: 1200,
    batAngle: 95,
    analysisScore: 6.8,
    impactZone: { x: 115, y: 60, zone: 'bouncer', quality: 'challenging' },
    footwork: { position: 'back_foot', balance: 'moderate', transfer: 'quick' },
    trajectory: { launchAngle: 35, exitVelocity: 92, distance: 48, direction: 'fine_leg' }
  },
  'Sweep': {
    ballSpeed: 125,
    spinRate: 2800,
    batAngle: 35,
    analysisScore: 8.0,
    impactZone: { x: 130, y: 90, zone: 'full_length', quality: 'optimal' },
    footwork: { position: 'front_foot', balance: 'excellent', transfer: 'controlled' },
    trajectory: { launchAngle: 12, exitVelocity: 82, distance: 35, direction: 'square_leg' }
  },
  'Flick': {
    ballSpeed: 130,
    spinRate: 2000,
    batAngle: 55,
    analysisScore: 8.2,
    impactZone: { x: 135, y: 88, zone: 'good_length', quality: 'excellent' },
    footwork: { position: 'front_foot', balance: 'excellent', transfer: 'smooth' },
    trajectory: { launchAngle: 18, exitVelocity: 88, distance: 42, direction: 'mid_wicket' }
  },
  'Defensive Shot': {
    ballSpeed: 140,
    spinRate: 2100,
    batAngle: 25,
    analysisScore: 7.5,
    impactZone: { x: 128, y: 82, zone: 'good_length', quality: 'controlled' },
    footwork: { position: 'front_foot', balance: 'excellent', transfer: 'minimal' },
    trajectory: { launchAngle: 5, exitVelocity: 45, distance: 15, direction: 'defensive' }
  }
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedShotType, setSelectedShotType] = useState<string>('')
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setAnalysisComplete(false)
      setAnalysisResults(null)
    }
  }

  const handleShotTypeSelect = (shotType: string) => {
    setSelectedShotType(shotType)
    // Get analysis data for selected shot type
    const metrics = analysisMetrics[shotType as keyof typeof analysisMetrics]
    if (metrics) {
      setAnalysisResults(metrics)
    }
  }

  const simulateUploadAndAnalysis = async () => {
    if (!selectedFile || !selectedShotType) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Wait for upload to complete
    setTimeout(() => {
      setIsUploading(false)
      setAnalysisComplete(true)
      
      // Get a random shot type if none selected, but ensure it's defined
      const randomShotType = selectedShotType || shotTypes[Math.floor(Math.random() * shotTypes.length)]
      if (randomShotType && !selectedShotType) {
        setSelectedShotType(randomShotType)
        const metrics = analysisMetrics[randomShotType as keyof typeof analysisMetrics]
        if (metrics) {
          setAnalysisResults(metrics)
        }
      }
    }, 2500)
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setIsUploading(false)
    setUploadProgress(0)
    setAnalysisComplete(false)
    setSelectedShotType('')
    setAnalysisResults(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Cricket Video</h1>
        <p className="text-gray-600">Upload your match footage for advanced shot analysis and performance insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="cricket-card p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Video Upload</h2>
            
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">Choose a video file</p>
                  <p className="text-gray-500">Support for MP4, MOV, AVI formats up to 100MB</p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="mt-4"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Video className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={resetUpload}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                {/* Shot Type Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Shot Type (Optional)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {shotTypes.map((shotType) => (
                      <button
                        key={shotType}
                        onClick={() => handleShotTypeSelect(shotType)}
                        className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                          selectedShotType === shotType
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {shotType}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Uploading and analyzing...</span>
                      <span className="text-sm text-gray-500">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <button
                  onClick={simulateUploadAndAnalysis}
                  disabled={isUploading}
                  className={`w-full cricket-button ${
                    isUploading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Upload className="w-5 h-5 mr-2 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Upload & Analyze
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysisComplete && analysisResults && (
            <div className="cricket-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Analysis Complete</h2>
                  <p className="text-gray-600">Shot Type: {selectedShotType}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Analysis Score</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {analysisResults.analysisScore}/10
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Ball Speed</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {analysisResults.ballSpeed} km/h
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Bat Angle</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {analysisResults.batAngle}°
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Zone Analysis</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Zone:</span>
                        <p className="font-medium capitalize">{analysisResults.impactZone.zone.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Quality:</span>
                        <p className="font-medium capitalize">{analysisResults.impactZone.quality}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">X Position:</span>
                        <p className="font-medium">{analysisResults.impactZone.x}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Y Position:</span>
                        <p className="font-medium">{analysisResults.impactZone.y}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Footwork Analysis</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Position:</span>
                        <p className="font-medium capitalize">{analysisResults.footwork.position.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Balance:</span>
                        <p className="font-medium capitalize">{analysisResults.footwork.balance}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Weight Transfer:</span>
                        <p className="font-medium capitalize">{analysisResults.footwork.transfer}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Trajectory Data</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Launch Angle:</span>
                        <p className="font-medium">{analysisResults.trajectory.launchAngle}°</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Exit Velocity:</span>
                        <p className="font-medium">{analysisResults.trajectory.exitVelocity} km/h</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Distance:</span>
                        <p className="font-medium">{analysisResults.trajectory.distance}m</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Direction:</span>
                        <p className="font-medium capitalize">{analysisResults.trajectory.direction.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button className="cricket-button bg-primary-600 hover:bg-primary-700">
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Full Report
                </button>
                <button 
                  onClick={resetUpload}
                  className="cricket-button bg-gray-600 hover:bg-gray-700"
                >
                  Upload Another Video
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Features</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ball Tracking</p>
                  <p className="text-sm text-gray-600">Precise ball speed, spin rate, and trajectory analysis</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Technique Analysis</p>
                  <p className="text-sm text-gray-600">Footwork, bat angle, and body positioning assessment</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Performance Metrics</p>
                  <p className="text-sm text-gray-600">Comprehensive scoring and improvement recommendations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Guidelines</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Clear side-on angle preferred</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Good lighting conditions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Stable camera positioning</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Full shot execution visible</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Maximum file size: 100MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}