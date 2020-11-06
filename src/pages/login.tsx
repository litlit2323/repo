import { useRef, MouseEvent, useState } from 'react'

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<any>(null)

  async function handleLogin(e: MouseEvent<HTMLButtonElement>) {
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const json = await res.json()
    setMessage(json)
  }

  return (
    <>
      <input type='email' placeholder='email' ref={emailRef} />
      <input type='password' placeholder='password' ref={passwordRef} />
      <button onClick={handleLogin}>Login</button>
      <pre>{JSON.stringify(message, null, 4)}</pre>
    </>
  )
}
