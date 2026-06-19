import { Link } from 'react-router'

export default function TestPage() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center pt-16 pb-4">
      <section>
        <h1>Hello World</h1>
      </section>
      <section>
        <Link to="/todos">Go to todos page</Link>
      </section>
      <section>
        <Link to="/">Go to login page</Link>
      </section>
    </main>
  )
}
