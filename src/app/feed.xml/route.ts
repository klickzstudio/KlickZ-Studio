import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { BlogPost } from '@/types'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ainz.space'
  const posts: BlogPost[] = await client.fetch(blogPostsQuery)

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>AinZ Studio Blog</title>
        <link>${baseUrl}</link>
        <description>Wedding Photography &amp; Cinematography Inspiration from AinZ Studio</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
        ${posts
          .map((post) => {
            const url = `${baseUrl}/blog/${post.href.split('/').pop()}`
            return `
              <item>
                <title><![CDATA[${post.title}]]></title>
                <link>${url}</link>
                <guid isPermaLink="true">${url}</guid>
                <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
                <description><![CDATA[${post.excerpt}]]></description>
                <author>${post.author || 'AinZ Studio'}</author>
                <category>${post.category}</category>
              </item>
            `
          })
          .join('')}
      </channel>
    </rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'x-content-type-options': 'nosniff',
    },
  })
}
