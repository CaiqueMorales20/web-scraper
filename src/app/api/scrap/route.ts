import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return new NextResponse('URL parameter is missing', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  const res = await fetch(url)
  const html = await res.text()
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
