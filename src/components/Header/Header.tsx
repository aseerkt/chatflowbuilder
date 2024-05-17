export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className='flex h-[90px] items-center justify-between border-b bg-orange-50 px-6'>
      <h1 className='text-2xl font-bold'>Chat Flow Builder</h1>
      {children}
    </header>
  )
}
