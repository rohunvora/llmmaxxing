#!/bin/bash

echo "🚀 Opening Vercel deployment page..."
echo ""
echo "This will open your browser to deploy your Prompt Refiner app."
echo ""
echo "When the page opens:"
echo "1. Sign in with GitHub"
echo "2. It will auto-detect your repo"
echo "3. Add your OpenAI API key when asked"
echo "4. Click Deploy!"
echo ""
echo "Press Enter to continue..."
read

# Open the Vercel import page with your repo pre-filled
open "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohunvora%2Fllmmaxxing&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key%20from%20.env.local&project-name=prompt-refiner&repository-name=prompt-refiner"

echo ""
echo "✅ Browser opened! Follow the steps on screen."
echo ""
echo "📝 When Vercel asks for your API key, copy it from your .env.local file"
echo ""
echo "After deployment, remember to regenerate your API key for security!"