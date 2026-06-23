import type { MetadataRoute } from 'next'
import { branchData } from './data/branches'
import { siteConfig } from './lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const branchEntries = Object.keys(branchData).map((id) => ({
    url: `${base}/pobocka/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/pobocky`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...branchEntries,
  ]
}
