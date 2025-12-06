import type React from "react"

interface MetaTagsProps {
  title: string
  description: string
  canonical: string
  image?: string
  type?: string
}

export default function MetaTags({
  title,
  description,
  canonical,
  image,
  type = "website",
}: MetaTagsProps): React.ReactNode {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={canonical} />
    </>
  )
}
