'use client'

import { JSDOM } from 'jsdom'

import { ScrapContent } from '@/@types'

export async function scrap(url: string) {
  try {
    const res = await fetch(`/api/scrap?url=${encodeURIComponent(url)}`)
    const html = await res.text()

    const dom = new JSDOM(html)
    const document = dom.window.document

    const title = document.title
    const description = document
      .querySelector("meta[name='description']")
      ?.getAttribute('content')
    const links = Array.from(document.querySelectorAll('a')).map((link) => {
      return {
        text: link.textContent,
        url: link.href,
      }
    })
    const images = Array.from(document.querySelectorAll('img')).map(
      (image) => image.src,
    )

    return { title, description, links, images } as ScrapContent
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
