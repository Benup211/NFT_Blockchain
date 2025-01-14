'use client'

import { useState,useEffect } from 'react'
import Sidebar from '@/components/dashboard/sidebar'
import DashboardOverview from '@/components/dashboard/dashboard-overview'
import MyProperty from '@/components/dashboard/my-property'
import Transaction from '@/components/dashboard/transaction'
import Settings from '@/components/dashboard/settings'
import Evaluate from '@/components/dashboard/evaluate'
import { useAuthStore } from '@/state/auth-state'

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard Overview')

  const {getUser}=useAuthStore();

  useEffect(()=>{
    getUser()
  },[])

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard Overview':
        return <DashboardOverview />
      case 'My Property':
        return <MyProperty />
      case 'Transaction':
        return <Transaction />
      case 'Evaluate Property':
        return <Evaluate />
      case 'Settings':
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  return (
      <div className="flex min-h-full relative">
        <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <main className="flex-1 overflow-y-auto p-6 ml-64">
          {renderContent()}
        </main>
      </div>
  )
}

