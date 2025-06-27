# Prompt Refiner 🚀

Transform messy, rambling text into crystal-clear AI prompts in seconds. No more wrestling with half-baked prompts or cleaning up verbose LLM responses.

## The Problem This Solves

Ever spent 10-20 minutes trying to craft the perfect prompt, only to get a rambling answer that still needs editing? This tool instantly converts any text blob into a structured, effective prompt that gets better results from AI models.

## What It Does

**Input:** Your rough ideas, brain dumps, or poorly structured prompts  
**Output:** A polished, production-ready system prompt optimized for AI comprehension

The tool uses GPT-4o-mini to analyze your text and restructure it following prompt engineering best practices:
- Extracts core intent and requirements
- Adds clear sections and structure
- Uses specific, actionable language
- Removes ambiguity and redundancy
- Formats for maximum LLM comprehension

## Features

### ⚡ Lightning Fast
- **One-click refinement**: Paste text → press ⌘/Ctrl+↵ → done
- **Auto-copy**: Refined prompt automatically copied to clipboard
- **Sub-second responses**: Using GPT-4o-mini for speed

### 💰 Cost Transparent
- **Live token counting**: See exactly how many tokens your prompt uses
- **Cost estimation**: Know the price before you click ($0.15/1M input tokens)
- **No surprises**: Estimates include both input and output costs

### 🔗 Shareable & Diffable
- **Unique URLs**: Every refinement gets a shareable link
- **Diff view**: Toggle to see exactly what changed (additions/deletions)
- **History tracking**: Last 10 prompts saved locally

### ⌨️ Keyboard First
- `/` - Focus input textarea
- `⌘/Ctrl + Enter` - Generate refined prompt
- All actions optimized for speed

## Live Demo

🌐 **Try it now:** [Your Vercel URL here]

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohunvora/llmmaxxing.git
   cd llmmaxxing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohunvora%2Fllmmaxxing&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key&project-name=prompt-refiner&repository-name=prompt-refiner)

1. Click the button above
2. Add your `OPENAI_API_KEY` as an environment variable
3. Deploy!

### Manual Deployment

The app is configured for easy deployment on:
- **Vercel**: Just import the repo and add env vars
- **Railway**: Auto-deploys with env configuration
- **Netlify**: Use included `netlify.toml` configuration

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI**: OpenAI GPT-4o-mini
- **State**: React hooks + localStorage
- **Deploy**: Vercel/Railway/Netlify ready

## Example Transformation

**Before:**
```
so basically i need a prompt that makes the ai act like a senior dev who 
reviews code but not in an annoying way like it should be helpful and point 
out actual issues not nitpick about formatting and stuff also it should 
explain why something is bad not just say its bad
```

**After:**
```
You are a senior software developer conducting code reviews. Follow these guidelines:

## Review Approach
- Focus on substantial issues that impact functionality, performance, or maintainability
- Ignore minor formatting or style preferences
- Be constructive and helpful, not pedantic

## For Each Issue Found
1. Clearly identify what the problem is
2. Explain WHY it's problematic (performance, security, maintainability, etc.)
3. Provide a specific solution or improvement
4. Include code examples when helpful

## Tone
- Professional but friendly
- Educational rather than critical
- Acknowledge good practices when you see them
```

## Security Notes

- API keys are only stored in environment variables
- No data is logged or persisted on the server
- All prompt history is stored locally in your browser
- Consider implementing rate limiting for production use

## Contributing

Feel free to open issues or submit PRs! This is a minimal implementation by design, but improvements are welcome.

## License

MIT - Use it however you want!

---

Built to solve a real problem: turning rough ideas into polished prompts in seconds, not minutes.