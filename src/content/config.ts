/*
 * @Author: xujiajun xujiajun@vchangyi.com
 * @Date: 2024-10-28 21:37:20
 * @LastEditTime: 2024-10-31 10:35:00
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/src/content/config.ts
 */
import { defineCollection, z } from 'astro:content'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'
/* const blog = defineCollection({
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
}) */

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({ type: 'data', schema: i18nSchema() })
}
