# 🚀 Deploy to Vercel in 2 Minutes

## Option 1: One-Click Deploy (Easiest!)

Just click this button and follow the prompts:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohunvora%2Fllmmaxxing&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key%20from%20.env.local&project-name=prompt-refiner&repository-name=prompt-refiner)

### What happens when you click:
1. It opens Vercel's import page
2. You'll see your GitHub repo already selected
3. It asks for your OpenAI API key
4. Click "Deploy" and wait ~1 minute
5. Your app is live! 🎉

---

## Option 2: Manual Deploy (Step by Step)

### Step 1: Go to Vercel
Open [vercel.com](https://vercel.com) in your browser

### Step 2: Sign In
Click "Sign Up" or "Log In" → Choose "Continue with GitHub"

### Step 3: Import Your Project
1. Click the "Add New..." button (top right)
2. Select "Project"
3. You'll see "Import Git Repository"
4. Find `rohunvora/llmmaxxing` in the list
5. Click "Import"

### Step 4: Add Your API Key
When you see "Configure Project":

1. Scroll to "Environment Variables"
2. Add these values:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** *(Copy your API key from your .env.local file)*
3. Click "Add"

### Step 5: Deploy
1. Click "Deploy" button
2. Wait about 60 seconds
3. You'll see "Congratulations! Your project has been successfully deployed"

### Step 6: Visit Your App
Click "Continue to Dashboard" then click the preview image or URL to see your live app!

Your URL will be something like:
- `prompt-refiner.vercel.app`
- `llmmaxxing.vercel.app` 
- `llmmaxxing-username.vercel.app`

---

## 🚨 After Deployment

### IMPORTANT: Regenerate Your API Key
Since your API key was visible in the code, you should:

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Delete the current key
3. Create a new one
4. Update it in Vercel:
   - Go to your Vercel dashboard
   - Click on your project
   - Go to "Settings" → "Environment Variables"
   - Update the `OPENAI_API_KEY` value

### Optional: Custom Domain
In Vercel dashboard:
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow their DNS instructions

---

## Troubleshooting

**"Import Git Repository" doesn't show my repo?**
- Make sure you're logged into Vercel with the same GitHub account
- Try refreshing the page
- Click "Import Third-Party Git Repository" and paste: `https://github.com/rohunvora/llmmaxxing`

**Deploy failed?**
- Check that your API key is correct
- Make sure you added it as an environment variable
- Check the build logs for specific errors

**App deployed but not working?**
- Check browser console for errors
- Verify your API key is active on OpenAI
- Make sure you have credits on your OpenAI account

---

## Need Help?

- Vercel Status: [status.vercel.com](https://status.vercel.com)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Open an issue: [github.com/rohunvora/llmmaxxing/issues](https://github.com/rohunvora/llmmaxxing/issues)

---

That's it! Your prompt refiner should be live in under 2 minutes. 🚀