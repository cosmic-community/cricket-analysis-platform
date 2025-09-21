'use client'

import { useState } from 'react'
import { Upload, FileVideo, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const shotTypes = ['Drive', 'Cut', 'Pull', 'Hook', 'Sweep', 'Flick', 'Defensive Shot'] as const
const matchTypes = ['Test Match', 'One Day International', 'T20', 'Practice Session', 'Domestic Match'] as const

type ShotType = typeof shotTypes[number]
type MatchType = typeof matchTypes[number]

interface UploadData {
  title: string
  videoFile: File | null
  shotType: ShotType
  matchType: MatchType
  teams: string
  notes: string
}

export default function UploadPage() {
  const [uploadData, setUploadData] = useState<UploadData>({
    title: '',
    videoFile: null,
    shotType: 'Drive',
    matchType: 'Practice Session',
    teams: '',
    notes: ''
  })
  
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [dragActive, setDragActive] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find(file => file.type.startsWith('video/'))
    
    if (videoFile) {
      setUploadData(prev => ({ ...prev, videoFile }))
      if (!uploadData.title) {
        setUploadData(prev => ({ ...prev, title: videoFile.name.replace(/\.[^/.]+$/, '') }))
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setUploadData(prev => ({ ...prev, videoFile: file }))
      if (!uploadData.title) {
        setUploadData(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, '') }))
      }
    }
  }

  const generateSampleData = () => {
    // Fixed: Ensure array access returns defined values with proper fallbacks
    const randomShotType = shotTypes[Math.floor(Math.random() * shotTypes.length)]
    const randomMatchType = matchTypes[Math.floor(Math.random() * matchTypes.length)]
    
    // Additional safety check to ensure values are defined
    const safeShotType = randomShotType || 'Drive'
    const safeMatchType = randomMatchType || 'Practice Session'
    
    setUploadData(prev => ({
      ...prev,
      title: `Sample Analysis - ${safeShotType} Practice`,
      shotType: safeShotType,
      matchType: safeMatchType,
      teams: 'Practice Session',
      notes: `Sample ${safeShotType.toLowerCase()} analysis with focus on technique and timing.`
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!uploadData.videoFile) {
      setUploadStatus('error')
      return
    }

    setUploading(true)
    setUploadStatus('idle')

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Here you would integrate with your actual upload service
      // For now, we'll just simulate success
      setUploadStatus('success')
      
      // Reset form after successful upload
      setTimeout(() => {
        setUploadData({
          title: '',
          videoFile: null,
          shotType: 'Drive',
          matchType: 'Practice Session',
          teams: '',
          notes: ''
        })
        setUploadStatus('idle')
      }, 2000)
      
    } catch (error) {
      setUploadStatus('error')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Video for Analysis</h1>
        <p className="text-gray-600">Upload match or practice videos for detailed cricket shot analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Video Upload Section */}
        <div className="cricket-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Upload</h2>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary-500 bg-primary-50' 
                : uploadData.videoFile
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploadData.videoFile ? (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">{uploadData.videoFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {formatFileSize(uploadData.videoFile.size)} • {uploadData.videoFile.type}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadData(prev => ({ ...prev, videoFile: null }))}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <FileVideo className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drag and drop your video file here
                  </p>
                  <p className="text-sm text-gray-600">or click to browse</p>
                </div>
                <div className="flex items-center justify-center">
                  <label className="cursor-pointer bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    <span>Choose Video File</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Details Section */}
        <div className="cricket-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Video Details</h2>
            <button
              type="button"
              onClick={generateSampleData}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Generate Sample Data
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                required
                value={uploadData.title}
                onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Cover Drive Practice Session"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shot Type *
              </label>
              <select
                required
                value={uploadData.shotType}
                onChange={(e) => setUploadData(prev => ({ ...prev, shotType: e.target.value as ShotType }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                {shotTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Match Type *
              </label>
              <select
                required
                value={uploadData.matchType}
                onChange={(e) => setUploadData(prev => ({ ...prev, matchType: e.target.value as MatchType }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                {matchTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teams/Opponent
              </label>
              <input
                type="text"
                value={uploadData.teams}
                onChange={(e) => setUploadData(prev => ({ ...prev, teams: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Mumbai vs Delhi or Practice Session"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={uploadData.notes}
              onChange={(e) => setUploadData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Any specific focus areas or context for this video analysis..."
            />
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {uploadStatus === 'success' && (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Upload successful!</span>
              </>
            )}
            {uploadStatus === 'error' && (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Upload failed. Please try again.</span>
              </>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!uploadData.videoFile || uploading}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload for Analysis</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}