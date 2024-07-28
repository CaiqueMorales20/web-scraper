'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ScrapContent } from '@/@types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { scrap } from '@/utils/scrap'

const scrapInputSchema = z.object({
  url: z.string().min(1, 'Please insert a url').url(),
})

type ScrapInputType = z.infer<typeof scrapInputSchema>

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScrapInputType>({
    resolver: zodResolver(scrapInputSchema),
  })

  const [content, setContent] = useState<ScrapContent | undefined>()

  async function handleScrap({ url }: ScrapInputType) {
    const data = await scrap(url)

    setContent(data)
    reset()
  }

  return (
    <main className="mx-auto flex w-[80vw] flex-col">
      <ThemeToggle />

      <div className="mb-6 mt-20 space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          Web Scraper
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Easily extract data from any website with our powerful web scraping
          tool.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleScrap)} className="mb-10 flex gap-4">
        <div className="w-full space-y-2">
          <Input {...register('url')} placeholder="Enter a URL to scrap" />
          {errors.url && (
            <span className="block text-red-400">{errors.url.message}</span>
          )}
        </div>
        <Button>Scrap</Button>
      </form>

      <section className="space-y-10 rounded-md border p-6">
        {content ? (
          <>
            <div>
              <h2 className="title">Page Title</h2>
              <p className="text-muted-foreground">{content.title}</p>
            </div>

            <div>
              <h2 className="title">Page Description</h2>
              <p className="text-sm text-muted-foreground md:text-base">
                {content.description}
              </p>
            </div>

            <div>
              <h2 className="title">Links</h2>
              <div className="grid grid-cols-2 gap-10 md:grid-cols-4 xl:grid-cols-6">
                {content.links.map((link) => (
                  <a
                    className="w-max text-wrap text-sm underline md:text-base"
                    key={link.url}
                    href={link.url}
                    target="_blank"
                  >
                    {link.url.length > 20
                      ? link.url.substring(0, 14).concat('...')
                      : link.url}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="title">Images</h2>
              <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                {content.images.map((image) =>
                  image.startsWith('https://') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={image}
                      src={image}
                      width={400}
                      height={400}
                      alt=""
                    />
                  ) : null,
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-foreground/60">
            No content has been scraped yet. Please initiate a scrape to see the
            results.
          </p>
        )}
      </section>
    </main>
  )
}
