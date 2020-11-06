import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import { SECRET } from '@/config'
import { NextApiRequestExtended } from '../utils/apiHandler'

// const authenticated = fn => async (
//   req: NextApiRequestExtended,
//   res: NextApiResponse
// ) => {
//   try {
//     verify(req.cookies.auth!, SECRET!)
//     return await fn(req, res)
//   } catch (e) {
//     return res.status(401).json({ message: 'No token' })
//   }
// }

const authenticated = (
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: any
) => {
  try {
    verify(req.cookies.auth!, SECRET!)
    return next()
  } catch (e) {
    return res.status(401).json({ message: 'No token' })
  }
}

export default authenticated
