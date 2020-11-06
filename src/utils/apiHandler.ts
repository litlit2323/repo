import { SECRET } from '@/config'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

type TUser = { id?: string | null }
type TToken = { userId: string | null; iat: number; exp: number }
export interface NextApiRequestExtended extends NextApiRequest {
  user: TUser
}

export default nextConnect<NextApiRequestExtended, NextApiResponse>({
  onError(error, _, res) {
    res
      .status(500)
      .json({ message: `Something went wrong: '${error.message}'` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  },
}).use((req: NextApiRequestExtended, res: NextApiResponse, next) => {
  const user: TUser = {}
  const { auth } = req.cookies
  if (auth) {
    try {
      const token = <TToken>verify(auth, SECRET!)
      user.id = token.userId
    } catch (e) {
      return res.status(401).json({ message: 'No token' })
    }
  }
  req.user = user
  next()
})
