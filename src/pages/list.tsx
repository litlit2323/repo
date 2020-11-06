import React from 'react'
import Link from 'next/link'
import {IVehiclePerson} from '../interfaces/VehiclePerson'


interface IListProps {
  ownerList: IVehiclePerson[] | undefined
}

export default function List({ownerList}: IListProps) {
  return (
    <>
      {ownerList?.map(({v, p, id}) => (
        <p key={id}>
          <Link as={`/${v}/${p}`} href={'/[vehicle]/[person]'}>
            <a>{v} of {p}</a>
          </Link>
        </p>
      ))}

      <h1>Detail</h1>
    </>
  )
}


export async function getServerSideProps() {
  const res = await fetch('http://localhost:4200/ownerList')
  const ownerList: IVehiclePerson[] | undefined = await res.json()
  return {props: {ownerList}}
}