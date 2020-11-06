import {NextApiRequest, NextApiResponse} from 'next'
import FetchData from '@utils/fetchData'
import {IVehicle} from '@models/Vehicle'
import {API_URL} from '@/config'


interface IGetAllVehiclesByPersonIdNextApiRequest extends NextApiRequest {
  query: {
    id: string
  }
}

export default async function getAllVehiclesByPersonId(req: IGetAllVehiclesByPersonIdNextApiRequest, res: NextApiResponse) {
  const vehicles: IVehicle[] = await FetchData.get(`${API_URL}/vehicles?owner=${req.query.id}`)
  res.json(vehicles)
}