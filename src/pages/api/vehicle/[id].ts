import {NextApiRequest, NextApiResponse} from 'next'
import {IVehicle} from '@models/Vehicle'
import FetchData from '@utils/fetchData'
import {API_URL} from '@/config'


interface IGetVehicleByIdNextApiRequest extends NextApiRequest {
  query: {
    id: string
  }
}

export default async function getVehicleById(req: IGetVehicleByIdNextApiRequest, res: NextApiResponse) {
  const vehicle: IVehicle = await FetchData.get(`${API_URL}/vehicles/${req.query.id}`)
  res.json(vehicle)
}