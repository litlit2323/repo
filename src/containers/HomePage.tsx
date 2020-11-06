import Table from '@components/Table'
import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <>
      <Link href='/people'>
        <a>People</a>
      </Link>
      {process.env.API_URL}
    </>
  )
}
