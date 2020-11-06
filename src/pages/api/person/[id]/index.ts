import {NextApiRequest, NextApiResponse} from 'next'
import apiRoutesHandler from '@/src/middlewares/apiRoutesHandler'
import withDb from '@utils/dbConnect'
import {PersonModel} from '@models'


interface IGetPersonByIdNextApiRequest extends NextApiRequest {
  query: {
    id: string
  },
  body: {
    name: string,
    email: string,
    password: string
  }
}

export default apiRoutesHandler(
  withDb({
    PUT: async (req: IGetPersonByIdNextApiRequest, res: NextApiResponse) => {
      const {id} = req.query
      const {name, email, password} = req.body
      const person = await PersonModel.findByIdAndUpdate()
      return res.json(person)
    }
  })
)