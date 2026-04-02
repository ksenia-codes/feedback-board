# Feedback Board

A community shout-out board built with Next.js, TypeScript, and Supabase.

## Features

- Submit anonymous or named shout-outs
- Admin approval system
- Responsive design
- Real-time updates

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ksenia-codes/feedback-board.git
cd feedback-board
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Set up the database:
Run this SQL in your Supabase SQL editor:
```sql
create extension if not exists "pgcrypto";

create table shoutouts (
  id uuid default gen_random_uuid() primary key,
  author_name text,
  message text not null,
  likes_count integer default 0,
  created_at timestamptz default now(),
  approved boolean default false
);
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Admin Panel

Access the admin panel at `/admin` to approve or reject submitted shout-outs.

## Deployment to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set the following build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18
4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
app/
├── api/
│   ├── admin/          # Admin API routes
│   └── shoutouts/      # Shout-out submission API
├── admin/              # Admin dashboard page
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Home page

components/
├── FeedbackCard.tsx    # Individual shout-out display
├── FeedbackForm.tsx    # Shout-out submission form
└── index.ts            # Component exports

lib/
└── supabaseClient.ts   # Supabase client configuration
```
