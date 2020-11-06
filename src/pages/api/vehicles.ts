import { NextApiRequest, NextApiResponse } from 'next'
import { VehicleModel } from '@models'
import apiRoutesHandler from '@/src/middlewares/apiRoutesHandler'
import withDb, { withDbMiddleware } from '@utils/dbConnect'
import apiHandler from '@/src/utils/apiHandler'

// export default apiRoutesHandler(
//   withDb({
//     GET: async (req: NextApiRequest, res: NextApiResponse) => {
//       try {
//         const vehicle = await VehicleModel.find()

//         return res.json(vehicle)
//       } catch (e) {
//         return res.status(500).json({ message: 'Server error' })
//       }
//     },
//   })
// )

export default apiHandler
  .use(withDbMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const vehicle = await VehicleModel.find()
    return res.json(vehicle)
  })
