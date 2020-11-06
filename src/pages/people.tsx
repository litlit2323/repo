import { GetServerSideProps, NextPageContext } from 'next'
import getPrivateDataFromApi from '@utils/getPrivateDataFromApi'
import { PersonModel } from '@models'
import withDb from '../utils/dbConnect'
import React from 'react'
import Link from 'next/link'

type TPeople = { name: string; email: string; password: string }

export interface PeopleProps {
  people: TPeople
}

export default function People({ people }: PeopleProps) {
  return (
    <>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <pre>{JSON.stringify(people, null, 4)}</pre>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const getPeople: () => TPeople[] = withDb(async () => {
    const people = await PersonModel.find().lean()

    return JSON.parse(JSON.stringify(people))
  })
  const people = await getPeople()

  await new Promise(resolve => {
    setTimeout(resolve, 2000)
  })

  return { props: { people } }
}
