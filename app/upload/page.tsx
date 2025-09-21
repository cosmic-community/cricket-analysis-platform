'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Play, User, Calendar, FileVideo, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface UploadFormData {
  videoTitle: string
  playerName: string
  matchDate: string
  teams: string
  matchType: string
  videoNotes: string
}

interface AnalysisResult {
  analysisId: string
  shotType: string
  analysisScore: number
  ballSpeed: number
  batAngle: number
  recommendations: string
}

export default function VideoUploadPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [formData, setFormData] = useState<UploadFormData>({
    videoTitle: '',
    playerName: '',
    matchDate: '',
    teams: '',
    matchType: 'Practice Session',
    videoNotes: ''
  })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const simulateVideoAnalysis = async (): Promise<AnalysisResult> => {
    // Simulate AI analysis with realistic cricket metrics
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const shotTypes = ['Drive', 'Cut', 'Pull', 'Hook', 'Sweep', 'Flick']
    const randomShotType = shotTypes[Math.floor(Math.random() * shotTypes.length)]
    const analysisScore = Number((Math.random() * 3 + 7).toFixed(1)) // Score between 7-10
    const ballSpeed = Math.floor(Math.random() * 40 + 120) // 120-160 km/h
    const batAngle = Math.floor(Math.random() * 30 + 30) // 30-60 degrees
    
    return {
      analysisId: `analysis_${Date.now()}`,
      shotType: randomShotType,
      analysisScore,
      ballSpeed,
      batAngle,
      recommendations: `<p><strong>Excellent ${randomShotType.toLowerCase()} technique!</strong> Your shot shows good fundamentals with proper footwork and bat positioning.</p><ul><li><strong>Strengths:</strong> Clean swing through the line, good head position, complete follow-through</li><li><strong>Areas for improvement:</strong> Consider getting your front foot slightly closer to the pitch of the ball for even better control</li><li><strong>Practice focus:</strong> Work on maintaining this technique against faster bowling</li></ul>`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile) {
      alert('Please select a video file')
      return
    }

    try {
      setIsUploading(true)
      
      // Simulate video upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      setUploadComplete(true)
      setIsUploading(false)
      
      // Start analysis
      setIsAnalyzing(true)
      const result = await simulateVideoAnalysis()
      setAnalysisResult(result)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      
    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
      setIsAnalyzing(false)
      alert('Upload failed. Please try again.')
    }
  }

  const handleViewAnalysis = () => {
    // In a real app, this would navigate to the actual analysis
    router.push('/analyses')
  }

  if (analysisComplete && analysisResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete!</h1>
          <p className="text-gray-600">Your video has been analyzed and performance metrics have been generated.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analysis Results */}
          <div className="cricket-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shot Analysis Results</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Shot Type:</span>
                <span className="font-semibold text-primary-600">{analysisResult.shotType}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Analysis Score:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">{analysisResult.analysisScore}</span>
                  <span className="text-gray-500">/10</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Ball Speed:</span>
                <span className="font-semibold">{analysisResult.ballSpeed} km/h</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Bat Angle:</span>
                <span className="font-semibold">{analysisResult.batAngle}°</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recommendations:</h3>
              <div 
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: analysisResult.recommendations }}
              />
            </div>
          </div>

          {/* Video Preview */}
          <div className="cricket-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Video</h2>
            
            <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-4">
              <video 
                src={previewUrl}
                className="w-full h-64 object-cover"
                controls
              />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Title:</span>
                <span className="font-medium">{formData.videoTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Player:</span>
                <span className="font-medium">{formData.playerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{formData.matchDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{formData.matchType}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Upload Another Video
          </button>
          <button
            onClick={handleViewAnalysis}
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            View All Analyses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Video for Analysis</h1>
        <p className="text-gray-600">Upload your cricket video to get detailed technical analysis and performance insights.</p>
      </div>

      {(isUploading || isAnalyzing) && (
        <div className="cricket-card p-8 text-center mb-8">
          <Loader2 className="w-12 h-12 text-primary-600 mx-auto mb-4 animate-spin" />
          {isUploading && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploading Video...</h3>
              <p className="text-gray-600">Please wait while your video is being uploaded.</p>
            </div>
          )}
          {isAnalyzing && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Performance...</h3>
              <p className="text-gray-600">Our AI is analyzing your batting technique and generating insights.</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <p>• Analyzing ball trajectory and impact zone</p>
                <p>• Evaluating footwork and body positioning</p>
                <p>• Measuring bat speed and angle</p>
                <p>• Generating personalized recommendations</p>
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Video Upload Section */}
        <div className="cricket-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileVideo className="w-5 h-5 mr-2 text-primary-600" />
            Video Upload
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {!selectedFile ? (
              <div>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="text-lg font-medium text-gray-900 mb-2">
                  Choose a video file
                </div>
                <p className="text-gray-600 mb-4">
                  Upload MP4, MOV, or AVI files up to 100MB
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Video
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div>
                <video 
                  src={previewUrl}
                  className="w-full max-w-md h-48 object-cover rounded-lg mx-auto mb-4"
                  controls
                />
                <p className="text-gray-900 font-medium">{selectedFile.name}</p>
                <p className="text-gray-500 text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null)
                    setPreviewUrl('')
                  }}
                  className="mt-2 text-primary-600 hover:text-primary-700 text-sm"
                >
                  Change video
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video Details */}
        <div className="cricket-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-primary-600" />
            Video Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                name="videoTitle"
                value={formData.videoTitle}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Cover Drive Practice Session"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player Name *
              </label>
              <input
                type="text"
                name="playerName"
                value={formData.playerName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter player name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Match/Session Date *
              </label>
              <input
                type="date"
                name="matchDate"
                value={formData.matchDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Match Type
              </label>
              <select
                name="matchType"
                value={formData.matchType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Practice Session">Practice Session</option>
                <option value="Test Match">Test Match</option>
                <option value="One Day International">One Day International</option>
                <option value="T20">T20</option>
                <option value="Domestic Match">Domestic Match</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teams/Opposition
              </label>
              <input
                type="text"
                name="teams"
                value={formData.teams}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Team A vs Team B or Practice Session"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Notes
              </label>
              <textarea
                name="videoNotes"
                value={formData.videoNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add any relevant notes about this video session..."
              />
            </div>
          </div>
        </div>

        {/* Analysis Features */}
        <div className="cricket-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Technical Analysis</p>
                <p className="text-sm text-gray-600">Detailed breakdown of batting technique and form</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Performance Metrics</p>
                <p className="text-sm text-gray-600">Ball speed, bat angle, and trajectory data</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Personalized Tips</p>
                <p className="text-sm text-gray-600">AI-powered recommendations for improvement</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Progress Tracking</p>
                <p className="text-sm text-gray-600">Compare with previous sessions and track improvement</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Professional Comparison</p>
                <p className="text-sm text-gray-600">See how your technique compares to professionals</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Detailed Report</p>
                <p className="text-sm text-gray-600">Comprehensive analysis report for your records</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedFile || isUploading || isAnalyzing}
            className="px-8 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isUploading || isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>
              {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Upload & Analyze'}
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}