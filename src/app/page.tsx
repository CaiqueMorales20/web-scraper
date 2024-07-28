'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const scrapInputSchema = z.object({
  name: z.string().min(1, 'Please insert a url').url(),
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

  const text = 'https://v0.dev/r/SSB1T64v6sl'

  function handleScrap({ name }: ScrapInputType) {
    console.log(name)
    reset()
  }

  return (
    <main className="mx-auto flex w-[80vw] flex-col">
      <ThemeToggle />

      <div className="mb-6 mt-20 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Web Scraper</h1>
        <p className="text-muted-foreground">
          Easily extract data from any website with our powerful web scraping
          tool.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleScrap)} className="mb-10 flex gap-4">
        <div className="w-full space-y-2">
          <Input {...register('name')} placeholder="Enter a URL to scrap" />
          {errors.name && (
            <span className="block text-red-400">{errors.name.message}</span>
          )}
        </div>
        <Button>Scrap</Button>
      </form>

      <section className="space-y-10 rounded-md border p-6">
        <div>
          <h2 className="title">Page Title</h2>
          <p className="text-muted-foreground">
            The title of the scraped webpage.
          </p>
        </div>

        <div>
          <h2 className="title">Page Description</h2>
          <p className="text-muted-foreground">
            The title of the scraped webpage.
          </p>
        </div>

        <div>
          <h2 className="title">Links</h2>
          <div className="grid grid-cols-6 gap-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <a
                className="w-max text-wrap underline"
                key={i}
                href=""
                target="_blank"
              >
                {text.substring(0, 14).concat('...')}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="title">Images</h2>
          <div className="grid grid-cols-4 gap-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <Image
                key={i}
                src={'https://generated.vusercontent.net/placeholder.svg'}
                width={400}
                height={400}
                alt=""
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
