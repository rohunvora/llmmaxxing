'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Copy, Check, Info, FileText, GitCompare } from 'lucide-react'
import { countTokens } from 'gpt-tokenizer'
import * as Diff from 'diff'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [refinedPrompt, setRefinedPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState('')
  const [tokenCount, setTokenCount] = useState(0)
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [showDiff, setShowDiff] = useState(false)
  const [previousPrompts, setPreviousPrompts] = useState<Array<{input: string, output: string}>>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputText) {
      const tokens = countTokens(inputText)
      setTokenCount(tokens)
      // GPT-4o-mini pricing: $0.15 per 1M input tokens, $0.60 per 1M output tokens
      // Estimate output as ~2x input length
      const inputCost = (tokens / 1_000_000) * 0.15
      const outputCost = ((tokens * 2) / 1_000_000) * 0.60
      setEstimatedCost(inputCost + outputCost)
    } else {
      setTokenCount(0)
      setEstimatedCost(0)
    }
  }, [inputText])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to generate
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !isLoading) {
        e.preventDefault()
        handleRefine()
      }
      // / to focus textarea
      if (e.key === '/' && document.activeElement !== textareaRef.current) {
        e.preventDefault()
        textareaRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inputText, isLoading])

  const handleRefine = async () => {
    if (!inputText.trim() || isLoading) return

    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        throw new Error('Failed to refine prompt')
      }

      const data = await response.json()
      setRefinedPrompt(data.refinedPrompt)
      
      // Store in history
      const newPrompt = { input: inputText, output: data.refinedPrompt }
      const updatedHistory = [...previousPrompts, newPrompt].slice(-10) // Keep last 10
      setPreviousPrompts(updatedHistory)
      localStorage.setItem('promptHistory', JSON.stringify(updatedHistory))
      
      // Auto-copy to clipboard
      await navigator.clipboard.writeText(data.refinedPrompt)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
      
      // Update URL with encoded prompt
      const params = new URLSearchParams()
      params.set('input', inputText)
      params.set('output', data.refinedPrompt)
      window.history.replaceState({}, '', `?${params.toString()}`)
      
    } catch (err) {
      setError('Failed to refine prompt. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!refinedPrompt) return
    
    await navigator.clipboard.writeText(refinedPrompt)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Load from URL and localStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const input = params.get('input')
    const output = params.get('output')
    
    if (input) setInputText(input)
    if (output) setRefinedPrompt(output)
    
    // Load history from localStorage
    const savedHistory = localStorage.getItem('promptHistory')
    if (savedHistory) {
      setPreviousPrompts(JSON.parse(savedHistory))
    }
  }, [])

  const renderDiff = () => {
    if (!inputText || !refinedPrompt) return null
    
    const changes = Diff.diffWords(inputText, refinedPrompt)
    
    return (
      <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm overflow-auto max-h-[400px]">
        {changes.map((part, index) => {
          if (part.added) {
            return <span key={index} className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">{part.value}</span>
          }
          if (part.removed) {
            return <span key={index} className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 line-through">{part.value}</span>
          }
          return <span key={index}>{part.value}</span>
        })}
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Prompt Refiner</h1>
        <p className="text-muted-foreground">
          Turn any text blob into a razor-sharp system prompt in under 30 seconds
        </p>
        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs border rounded">⌘/Ctrl</kbd>+
            <kbd className="px-2 py-1 text-xs border rounded">↵</kbd>
            Generate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs border rounded">/</kbd>
            Focus input
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Input</h2>
            {tokenCount > 0 && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{tokenCount} tokens</span>
                <span>≈${estimatedCost.toFixed(4)}</span>
                <Info className="h-3 w-3" />
              </div>
            )}
          </div>
          <Textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your raw text here..."
            className="min-h-[400px] font-mono text-sm"
          />
          <Button
            onClick={handleRefine}
            disabled={!inputText.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refining...
              </>
            ) : (
              'Refine Prompt'
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Refined Prompt</h2>
            {refinedPrompt && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDiff(!showDiff)}
                  className="h-8"
                >
                  <GitCompare className="mr-2 h-4 w-4" />
                  {showDiff ? 'Hide' : 'Show'} Diff
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
          {showDiff && refinedPrompt ? (
            renderDiff()
          ) : (
            <Textarea
              value={refinedPrompt}
              readOnly
              placeholder="Your refined prompt will appear here..."
              className="min-h-[400px] font-mono text-sm bg-muted/50"
            />
          )}
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
      </div>
    </main>
  )
}