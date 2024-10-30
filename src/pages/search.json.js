import { getCollection } from 'astro:content'
async function getPost() {
  const posts = (await getCollection('blog')).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  )
  console.log(posts)
  return posts.map((v) => ({
    slug: v.slug,
    title: v.data.title,
    description: v.data.description,
    date: v.data.pubDate
  }))
}
export async function GET({}) {
  return new Response(JSON.stringify(await getPost()), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
