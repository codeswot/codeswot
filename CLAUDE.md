# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun dev` - Start development server (Next.js)
- `bun run build` - Build production application
- `bun start` - Start production server
- `bun run lint` - Run linting checks
- `bun add <package>` - Install packages (uses Bun instead of npm)

## Project Architecture

This is a Next.js 15 portfolio website for Mubarak Ibrahim (Codeswot) built with TypeScript, Tailwind CSS, and Radix UI components.

### Tech Stack

- **Framework**: Next.js 15 with App Router  
- **Language**: TypeScript
- **Package Manager**: Bun (instead of npm/yarn)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Font**: Source Code Pro (Google Fonts)
- **State Management**: React hooks (useState, useEffect)
- **Backend**: Firebase (Firestore, Analytics, Auth, Storage)

### Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/sections/` - Main portfolio sections (Home, About, Experience, Projects, Contact, Chat, Navigation)
- `components/ui/` - Reusable UI components based on shadcn/ui
- `components/ContactForm.tsx` - Firebase-integrated contact form component
- `hooks/` - Custom React hooks including Firebase analytics
- `lib/` - Utility functions including Firebase configuration and Firestore helpers
- `public/` - Static assets including favicon and images
- `styles/` - Global CSS files

### Key Features

- **Single-page application** with smooth scrolling navigation
- **Keyboard navigation** - Press 0-5 keys to navigate between sections
- **Responsive design** with mobile-first approach
- **Accessibility features** including screen reader support
- **Interactive chat widget** with mobile expansion
- **Intersection Observer** for scroll animations
- **Theme system** using CSS custom properties
- **Firebase integration** for analytics, contact forms, and data persistence
- **Project view tracking** - Each portfolio project tracks user engagement
- **Contact form** with Firebase Firestore backend and validation

### Component Architecture
- Main page component (`app/page.tsx`) manages all state and coordinates section components
- Section components receive refs and visibility state for animations
- Navigation component handles both desktop and mobile menu states
- Chat component has collapsible/expandable states
- All components use TypeScript interfaces for props

### Styling Approach
- Tailwind CSS with custom color system using CSS variables
- Design system extends default Tailwind with custom colors, fonts, and animations
- Components use `cn()` utility for conditional classes
- Responsive breakpoints: mobile-first with `md:` prefix for desktop

### State Management Patterns

- Section visibility tracking using Intersection Observer
- Mobile/desktop responsive state management
- Chat and navigation overlay state handling
- Keyboard navigation state with visual feedback

### Firebase Integration

- **Configuration**: Environment variables in `.env.local` (see `.env.local.example`)
- **Firestore Collections**:
  - `contacts` - Contact form submissions with timestamps and read status
  - `visitors` - Page visit analytics with user agent and referrer data
  - `project_views` - Individual project engagement tracking
- **Analytics**: Automatic page visit tracking and project interaction metrics
- **Contact Form**: Real-time form submission with validation and success/error states
- **Security**: Firebase rules should be configured in Firebase Console for production

### Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Add your Firebase project configuration values
3. Configure Firebase Security Rules in Firebase Console
4. Enable Firestore, Analytics, and other required services in Firebase Console