import { NextApiRequest, NextApiResponse } from 'next'
import apiRoutesHandler from '@/src/middlewares/apiRoutesHandler'
import withDb from '@utils/dbConnect'
import { PersonModel } from '@models'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { SECRET } from '@/config'
import cookie from 'cookie'

interface ILoginNextApiRequest extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

function checkIfNotExists(smth: any) {
  if (!smth) {
    throw 403
  }
}

async function comparePasswords(plainPassword: string, hashedPassword: string) {
  if (!(await compare(plainPassword, hashedPassword))) {
    throw 403
  }
}

export default apiRoutesHandler(
  withDb({
    POST: async (req: ILoginNextApiRequest, res: NextApiResponse) => {
      try {
        const { email, password } = req.body

        const person = await PersonModel.findOne({ email })
        checkIfNotExists(person)
        await comparePasswords(password, person.password)

        const tokenData = { userId: person.id }
        const token = sign(tokenData, <string>SECRET, { expiresIn: '1h' })
        const responsePersonData = {
          id: person.id,
          token,
        }
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
          })
        )
        return res.json(responsePersonData)
      } catch (e) {
        if (typeof e === 'number') {
          const errors: { [k: number]: void } = {
            403: res.status(403).json({ message: 'Invalid email or password' }),
          }
          return errors[e]
        }
        return res.status(500).json({ message: e.message })
      }
    },
  })
)
