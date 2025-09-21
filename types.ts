// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail?: string;
}

// Player Profile interface
export interface PlayerProfile extends CosmicObject {
  type: 'player-profiles';
  metadata: {
    player_name: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    age?: number;
    playing_role?: {
      key: string;
      value: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
    };
    batting_style?: {
      key: string;
      value: 'Right-handed' | 'Left-handed';
    };
    team?: string;
    career_stats?: {
      matches: number;
      runs: number;
      average: number;
      centuries: number;
      fifties: number;
      highest_score: number;
    };
    strengths?: string;
    improvement_areas?: string;
  };
}

// Match Video interface
export interface MatchVideo extends CosmicObject {
  type: 'match-videos';
  metadata: {
    video_title: string;
    video_file: {
      url: string;
      imgix_url: string;
    };
    match_date: string;
    teams?: string;
    match_type?: {
      key: string;
      value: 'Test Match' | 'One Day International' | 'T20' | 'Practice Session' | 'Domestic Match';
    };
    player?: string | PlayerProfile;
    video_notes?: string;
  };
}

// Shot Analysis interface
export interface ShotAnalysis extends CosmicObject {
  type: 'shot-analyses';
  metadata: {
    shot_name: string;
    related_video?: string | MatchVideo;
    player?: string | PlayerProfile;
    ball_speed?: number;
    spin_rate?: number;
    bat_angle?: number;
    shot_type?: {
      key: string;
      value: 'Drive' | 'Cut' | 'Pull' | 'Hook' | 'Sweep' | 'Flick' | 'Defensive Shot';
    };
    impact_zone?: {
      x: number;
      y: number;
      zone: string;
      impact_quality: string;
    };
    footwork_analysis?: {
      front_foot_position: string;
      balance: string;
      weight_transfer: string;
      stance_width: string;
    };
    trajectory_data?: {
      launch_angle: number;
      exit_velocity: number;
      distance: number;
      direction: string;
    };
    analysis_score?: number;
    recommendations?: string;
  };
}

// Performance Report interface
export interface PerformanceReport extends CosmicObject {
  type: 'performance-reports';
  metadata: {
    report_title: string;
    player?: string | PlayerProfile;
    report_date: string;
    analysis_period?: string;
    overall_score?: number;
    shot_analyses?: (string | ShotAnalysis)[];
    key_insights?: string;
    performance_trends?: {
      batting_average_trend: number[];
      shot_accuracy_trend: number[];
      footwork_scores: number[];
      timing_scores: number[];
    };
    recommendations?: string;
    comparison_data?: {
      vs_professional: {
        drive_technique: number;
        footwork: number;
        timing: number;
        shot_selection: number;
      };
      peer_comparison: {
        rank: number;
        total_players: number;
        percentile: number;
      };
    };
  };
}

// Professional Example interface
export interface ProfessionalExample extends CosmicObject {
  type: 'professional-examples';
  metadata: {
    example_title: string;
    professional_player: string;
    example_video?: {
      url: string;
      imgix_url: string;
    };
    shot_type?: {
      key: string;
      value: 'Drive' | 'Cut' | 'Pull' | 'Hook' | 'Sweep' | 'Flick' | 'Defensive Shot';
    };
    technical_analysis?: string;
    key_metrics?: {
      bat_speed: number;
      impact_angle: number;
      follow_through_angle: number;
      footwork_rating: number;
      timing_score: number;
    };
    learning_points?: string;
  };
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type literals for select-dropdown values
export type ShotType = 'Drive' | 'Cut' | 'Pull' | 'Hook' | 'Sweep' | 'Flick' | 'Defensive Shot';
export type PlayingRole = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
export type BattingStyle = 'Right-handed' | 'Left-handed';
export type MatchType = 'Test Match' | 'One Day International' | 'T20' | 'Practice Session' | 'Domestic Match';

// Helper type guards
export function isPlayerProfile(player: string | PlayerProfile | undefined): player is PlayerProfile {
  return typeof player === 'object' && player !== null && 'metadata' in player;
}

export function isShotAnalysis(analysis: string | ShotAnalysis | undefined): analysis is ShotAnalysis {
  return typeof analysis === 'object' && analysis !== null && 'metadata' in analysis;
}

export function isMatchVideo(video: string | MatchVideo | undefined): video is MatchVideo {
  return typeof video === 'object' && video !== null && 'metadata' in video;
}