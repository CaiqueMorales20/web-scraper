import { Link } from './link'

interface ScrapContent {
  title: string
  description?: string
  links: Link[]
  images: string[]
}

export type { ScrapContent }
