# Prompt Refiner

Turn any text blob into a razor-sharp system prompt in under 30 seconds.

## Features

- **Instant Refinement**: Paste blob → press ⌘/Ctrl-↵ → polished prompt appears, auto-copied
- **Shareable URLs**: Each refined prompt gets a unique URL with encoded input/output
- **Diff View**: See exactly what changed between your input and the refined version
- **Token & Cost Estimation**: Know the cost before you spend a cent
- **Keyboard Shortcuts**: 
  - `/` to focus input
  - `⌘/Ctrl + Enter` to generate

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **OpenAI GPT-4o-mini** for prompt refinement
- **localStorage** for history tracking
- **URL params** for sharing

## Usage

1. Paste your raw text/prompt into the left textarea
2. Press `⌘/Ctrl + Enter` or click "Refine Prompt"
3. Your refined prompt appears on the right and is automatically copied
4. Share the URL to save/share the prompt pair
5. Toggle diff view to see what changed

Built with minimal dependencies for sub-second response times.