"use client"

import Head from "next/head"

export default function GoogleSearchConsole() {
  const verificationCode = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

  if (!verificationCode) {
    return null
  }

  return (
    <Head>
      <meta name="google-site-verification" content={verificationCode} />
    </Head>
  )
}
