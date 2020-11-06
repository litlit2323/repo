import {useRouter} from 'next/router'
import {IVehiclePerson} from '@interfaces/VehiclePerson'
import Link from 'next/link'
import {API_URL} from '@/config'


interface IPersonProps {
  ownerList?: IVehiclePerson[]
}

export default function Person({ownerList}: IPersonProps) {
  const router = useRouter()

  return (
    <>
      <Link href="/list"><a>List</a></Link>
      <ul>
        {ownerList?.map(({id, v, p}) => (
          <li key={id}>{v} of {p}</li>
        ))}
      </ul>
    </>
  )
}

interface IPersonNextPageContext {
  query: {
    vehicle: string,
    person: string
  }
}

export async function getServerSideProps({query}: IPersonNextPageContext) {
  const q = `?v=${query.vehicle}&p=${query.person}`
  const res = await fetch(`${API_URL}/ownerList${q}`)
  const ownerList: IVehiclePerson[] | undefined = await res.json()
  return {
    props: {ownerList}
  }
}