import {NextApiRequest, NextApiResponse} from 'next'
import apiRoutesHandler from '@/src/middlewares/apiRoutesHandler'
import withDb from '@utils/dbConnect'
import {PersonModel} from '@models'
import {hash} from 'bcrypt'


interface ISignUpNextApiRequest extends NextApiRequest {
  body: {
    name: string,
    email: string,
    password: string
  }
}

export default apiRoutesHandler(
  withDb({
    POST: async (req: ISignUpNextApiRequest, res: NextApiResponse) => {
      const {name, email, password} = req.body

      const user = await PersonModel.countDocuments({email})
      if (user) {
        return res.status(403).json({message: 'User with this email already exists'})
      }
      const personFields = {
        name, email, password: await hash(password, 10)
      }
      const person = new PersonModel(personFields)
      await person.save()
      return res.json(person)
    }
  })
)