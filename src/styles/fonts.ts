// src/styles/fonts.ts
import localFont from 'next/font/local'
import { Space_Grotesk } from 'next/font/google'

export const satoshi = localFont({
  src: [
    {
      path: '../assets/fonts/Satoshi-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-VariableItalic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})
