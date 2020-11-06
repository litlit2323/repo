import { NextApiRequest, NextApiResponse } from 'next'
import { PersonModel } from '@models'
import apiRoutesHandler from '@/src/middlewares/apiRoutesHandler'
import withDb, { withDbMiddleware } from '@utils/dbConnect'
import { authenticated } from '@/src/middlewares'
import apiHandler from '@/src/utils/apiHandler'

export default apiHandler
  .use(withDbMiddleware)
  .use(authenticated)
  .get(async (req, res) => {
    console.log('user.id', req.user.id)

    const people = await PersonModel.find().select('-password')

    return res.json(people)
  })
  .post(async (req, res) => {
    const pF = {
      name: req.body.name,
      email: req.body.email,
    }
    const p = new PersonModel(pF)
    await p.save()
    return res.json({ p })
  })
