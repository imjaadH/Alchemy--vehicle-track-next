import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Sidebar>
      <Navbar />
      <div className='max-w-screen-2xl mx-auto overflow-x-auto h-[90%] '>
        {children}
      </div>
    </Sidebar>
  )
}
