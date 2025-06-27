import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Prompt Refiner",
  description: "Turn any text blob into a razor-sharp system prompt in under 30 seconds",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}