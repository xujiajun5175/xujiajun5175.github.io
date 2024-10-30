/*
 * @Author: xujiajun xujiajun@vchangyi.com
 * @Date: 2024-10-28 21:37:20
 * @LastEditTime: 2024-10-29 23:31:38
 * @LastEditors: xujiajun xujiajun@vchangyi.com
 * @Description:
 * @FilePath: \my-astro\src\content\config.ts
 */
import { defineCollection, z } from 'astro:content'
import { docsSchema } from '@astrojs/starlight/schema'
const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional()
  })
})

export const collections = {
  docs: defineCollection({ schema: docsSchema() })
}
