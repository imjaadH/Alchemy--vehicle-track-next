import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const query = searchParams.get('query')

  const mapboxKey = process.env.MAPBOX_TOKEN
  const sessionToken = 'c466c41b-2050-4fe5-9708-ee11127efc3e'
  const basePath = 'https://api.mapbox.com/search/geocode/v6'

  if (!query?.length) return Response.json({ data: [], status: 400 })
  const res = await fetch(
    `${basePath}/forward?q=${query}&access_token=${mapboxKey}&session_token=[${sessionToken}]&autocomplete=true`,
  )

  const data = await res.json()

  return Response.json({
    data: data.features?.map((item: any) => item.properties) ?? [],
    status: 200,
  })
}
