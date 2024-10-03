export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex h-screen justify-center items-center'>
      {children}
    </main>
  )
}
