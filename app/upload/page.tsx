'use client'

import { useState } from 'react'
import { Upload, FileText, Video, Activity, Target, User, Calendar } from 'lucide-react'

const shotTypes = [
  'Drive',
  'Cut', 
  'Pull',
  'Hook',
  'Sweep',
  'Flick',
  'Defensive Shot'
] as const

const matchTypes = [
  'Test Match',
  'One Day International', 
  'T20',
  'Practice Session',
  'Domestic Match'
] as const

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadType, setUploadType] = useState<'video' | 'report'>('video')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    playerName: '',
    matchDate: '',
    teams: '',
    matchType: '',
    shotType: '',
    videoNotes: '',
    reportData: ''
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getRandomShotType = () => {
    const randomIndex = Math.floor(Math.random() * shotTypes.length)
    return shotTypes[randomIndex]
  }

  const simulateUpload = async () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    // Generate random data for demonstration
    const randomShotType = getRandomShotType()
    
    // Fix TypeScript errors with proper null checks
    const safeRandomShotType = randomShotType || 'Drive' // Provide default value
    const safeTitle = formData.title || `Analysis - ${safeRandomShotType}` // Provide default if empty

    console.log('Upload completed:', {
      file: selectedFile?.name,
      type: uploadType,
      title: safeTitle,
      shotType: safeRandomShotType,
      formData
    })

    // Reset form after successful upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadProgress(0)
      setSelectedFile(null)
      setFormData({
        title: '',
        playerName: '',
        matchDate: '',
        teams: '',
        matchType: '',
        shotType: '',
        videoNotes: '',
        reportData: ''
      })
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Content</h1>
        <p className="text-gray-600">Upload match videos or performance reports for analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Form */}
        <div className="lg:col-span-2">
          <div className="cricket-card p-6">
            {/* Upload Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setUploadType('video')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                    uploadType === 'video'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span>Match Video</span>
                </button>
                <button
                  onClick={() => setUploadType('report')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                    uploadType === 'report'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Performance Report</span>
                </button>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {uploadType === 'video' ? 'Video File' : 'Report File'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="mb-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-primary-600 hover:text-primary-700 font-medium">
                        Choose a file
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept={uploadType === 'video' ? 'video/*' : '.pdf,.doc,.docx'}
                        onChange={handleFileSelect}
                      />
                    </label>
                    <span className="text-gray-600"> or drag and drop</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {uploadType === 'video' 
                      ? 'MP4, MOV, AVI up to 500MB'
                      : 'PDF, DOC, DOCX up to 50MB'
                    }
                  </p>
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Uploading...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={uploadType === 'video' ? 'Match vs Team A - Cover Drive Practice' : 'Monthly Performance Report - Player Name'}
                />
              </div>

              {/* Player Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Player Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.playerName}
                  onChange={(e) => handleInputChange('playerName', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter player name"
                />
              </div>

              {uploadType === 'video' ? (
                <>
                  {/* Match Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Match Date</label>
                    <input
                      type="date"
                      value={formData.matchDate}
                      onChange={(e) => handleInputChange('matchDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  {/* Teams */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teams</label>
                    <input
                      type="text"
                      value={formData.teams}
                      onChange={(e) => handleInputChange('teams', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Team A vs Team B"
                    />
                  </div>

                  {/* Match Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Match Type</label>
                    <select
                      value={formData.matchType}
                      onChange={(e) => handleInputChange('matchType', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select match type</option>
                      {matchTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Shot Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Shot Type</label>
                    <select
                      value={formData.shotType}
                      onChange={(e) => handleInputChange('shotType', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select shot type</option>
                      {shotTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Video Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Notes</label>
                    <textarea
                      value={formData.videoNotes}
                      onChange={(e) => handleInputChange('videoNotes', e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Additional context, conditions, or observations about this video..."
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Report Data */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Summary
                    </label>
                    <textarea
                      value={formData.reportData}
                      onChange={(e) => handleInputChange('reportData', e.target.value)}
                      rows={6}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Brief summary of the performance report content, key findings, and recommendations..."
                    />
                  </div>
                </>
              )}
            </div>

            {/* Upload Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={simulateUpload}
                disabled={!selectedFile || isUploading || !formData.title || !formData.playerName}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload {uploadType === 'video' ? 'Video' : 'Report'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upload Guidelines */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Guidelines</h3>
            
            {uploadType === 'video' ? (
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <Video className="w-4 h-4 mt-0.5 text-primary-600" />
                  <p>Videos should focus on specific shots or techniques for best analysis results</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Target className="w-4 h-4 mt-0.5 text-primary-600" />
                  <p>Ensure clear view of player's stance, footwork, and bat position</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Activity className="w-4 h-4 mt-0.5 text-primary-600" />
                  <p>Multiple angles of the same shot provide better analysis</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <FileText className="w-4 h-4 mt-0.5 text-primary-600" />
                  <p>Reports should include performance metrics and observations</p>
                </div>
                <div className="flex items-start space-x-2">
                  <User className="w-4 h-4 mt-0.5 text-primary-600" />
                  <p>Include player statistics and improvement areas</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 mt-0.5 text-primary-600" />
                  <p>Date range and context help with progress tracking</p>
                </div>
              </div>
            )}
          </div>

          {/* Upload Statistics */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Videos</span>
                <span className="font-medium text-gray-900">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reports</span>
                <span className="font-medium text-gray-900">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">This Month</span>
                <span className="font-medium text-green-600">12</span>
              </div>
            </div>
          </div>

          {/* File Requirements */}
          <div className="cricket-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">File Requirements</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {uploadType === 'video' ? (
                <>
                  <p><strong>Formats:</strong> MP4, MOV, AVI</p>
                  <p><strong>Max Size:</strong> 500MB</p>
                  <p><strong>Resolution:</strong> 720p or higher recommended</p>
                  <p><strong>Duration:</strong> 30 seconds to 10 minutes</p>
                </>
              ) : (
                <>
                  <p><strong>Formats:</strong> PDF, DOC, DOCX</p>
                  <p><strong>Max Size:</strong> 50MB</p>
                  <p><strong>Content:</strong> Performance data, analysis, recommendations</p>
                  <p><strong>Structure:</strong> Clear sections and metrics</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}