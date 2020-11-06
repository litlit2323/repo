import { NextPageContext } from 'next'

export default async function getPrivateDataFromApi(
  url: string,
  ctx: NextPageContext
) {
  const cookie = ctx.req?.headers.cookie

  const res = await fetch(`http://localhost:3000/api/${url}`, {
    headers: {
      cookie: cookie!,
    },
  })

  if (res.status === 401) {
    if (ctx.res) {
      ctx.res.setHeader('location', '/login')
      ctx.res.statusCode = 302
      return { props: {} }
    }
  }

  return await res.json()
}
