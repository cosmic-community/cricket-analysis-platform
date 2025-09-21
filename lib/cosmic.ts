import { createBucketClient } from '@cosmicjs/sdk';
import { 
  PlayerProfile, 
  MatchVideo, 
  ShotAnalysis, 
  PerformanceReport, 
  ProfessionalExample,
  CosmicResponse 
} from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all player profiles
export async function getPlayerProfiles(): Promise<PlayerProfile[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'player-profiles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as PlayerProfile[]).sort((a, b) => 
      a.metadata.player_name.localeCompare(b.metadata.player_name)
    );
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch player profiles');
  }
}

// Fetch single player profile
export async function getPlayerProfile(slug: string): Promise<PlayerProfile | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'player-profiles', slug })
      .depth(1);
    
    return response.object as PlayerProfile;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch player profile');
  }
}

// Fetch performance reports
export async function getPerformanceReports(): Promise<PerformanceReport[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'performance-reports' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as PerformanceReport[]).sort((a, b) => {
      const dateA = new Date(a.metadata.report_date || '').getTime();
      const dateB = new Date(b.metadata.report_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch performance reports');
  }
}

// Fetch single performance report
export async function getPerformanceReport(slug: string): Promise<PerformanceReport | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'performance-reports', slug })
      .depth(1);
    
    return response.object as PerformanceReport;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch performance report');
  }
}

// Fetch shot analyses
export async function getShotAnalyses(): Promise<ShotAnalysis[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'shot-analyses' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as ShotAnalysis[]).sort((a, b) => {
      const scoreA = a.metadata.analysis_score || 0;
      const scoreB = b.metadata.analysis_score || 0;
      return scoreB - scoreA; // Highest score first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch shot analyses');
  }
}

// Fetch single shot analysis
export async function getShotAnalysis(slug: string): Promise<ShotAnalysis | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'shot-analyses', slug })
      .depth(1);
    
    return response.object as ShotAnalysis;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch shot analysis');
  }
}

// Fetch professional examples
export async function getProfessionalExamples(): Promise<ProfessionalExample[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'professional-examples' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as ProfessionalExample[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch professional examples');
  }
}

// Fetch match videos
export async function getMatchVideos(): Promise<MatchVideo[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'match-videos' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as MatchVideo[]).sort((a, b) => {
      const dateA = new Date(a.metadata.match_date || '').getTime();
      const dateB = new Date(b.metadata.match_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch match videos');
  }
}

// Fetch single match video
export async function getMatchVideo(slug: string): Promise<MatchVideo | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'match-videos', slug })
      .depth(1);
    
    return response.object as MatchVideo;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch match video');
  }
}