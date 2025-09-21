# Cricket Analysis Platform

![App Preview](https://imgix.cosmicjs.com/eddf5450-a044-11ed-81f2-f50e185dd248-rAHEjUB-L6c.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive cricket analysis web application built with Next.js and Cosmic CMS. This platform allows users to upload match videos, analyze batting technique, track performance metrics, and generate detailed reports with professional comparisons.

## Features

- 📹 **Video Analysis** - Upload and analyze match videos with detailed shot tracking
- 🏏 **Shot Analysis** - Track ball speed, spin rate, bat angle, and footwork metrics  
- 📊 **Performance Reports** - Generate comprehensive monthly and session reports
- 👥 **Player Profiles** - Manage player statistics and career data
- 🎯 **Professional Comparisons** - Compare techniques with professional examples
- 📈 **Performance Trends** - Visualize improvement over time with charts
- 🎨 **Responsive Design** - Optimized for desktop and mobile viewing
- 🔐 **Content Management** - Full CRUD operations powered by Cosmic CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68cfef94d7c81076a7d6c05e&clone_repository=68cff4fdd7c81076a7d6c078)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a cricket analysis web application that allows users to upload match videos, automatically track ball trajectories, simulate alternative shots with different angles, and provide visual overlays highlighting shot impact zones. Include analysis features for footwork, bat angle, ball speed, and spin. Allow users to compare their shots with professional examples and generate detailed performance reports. The design should be user-friendly, with intuitive controls and clear visualizations, supporting both mobile and desktop access."

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Content Management:** Cosmic CMS
- **Language:** TypeScript
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React
- **Image Optimization:** Imgix integration
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cricket-analysis-platform
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Performance Reports
```typescript
const reports = await cosmic.objects
  .find({ type: 'performance-reports' })
  .depth(1)

console.log(reports.objects)
```

### Getting Shot Analyses
```typescript
const shotAnalyses = await cosmic.objects
  .find({ type: 'shot-analyses' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Player Profile Data
```typescript
const player = await cosmic.objects
  .findOne({ type: 'player-profiles', slug: playerSlug })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with the following Cosmic object types:

- **Match Videos** - Video files and metadata for analysis
- **Shot Analyses** - Detailed technical analysis of individual shots
- **Player Profiles** - Player information, stats, and career data
- **Performance Reports** - Monthly and periodic performance summaries
- **Professional Examples** - Reference videos and analysis from professional players

All content is managed through your Cosmic dashboard and automatically synced with the application.

## Deployment Options

### Vercel (Recommended)
```bash
bun run build
vercel --prod
```

### Netlify
```bash
bun run build
netlify deploy --prod --dir=.next
```

Environment variables must be configured in your deployment platform's dashboard.

<!-- README_END -->