import { Button } from '@/components/ui/button'
import { LayoutDashboard, Home, Receipt, Settings } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard Overview', icon: LayoutDashboard },
  { name: 'My Property', icon: Home },
  { name: 'Transaction', icon: Receipt },
  { name: 'Settings', icon: Settings },
]

export default function Sidebar({ selectedMenu, setSelectedMenu }:{selectedMenu: string, setSelectedMenu: (menu: string) => void}) {
  return (
    <aside className="w-64 p-4 overflow-y-auto flex flex-col absolute left-0 top-0 bottom-0 bg-background border-r z-0">
      <h2 className="text-lg font-semibold mb-4">Dashboard Menus</h2>
      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            variant={selectedMenu === item.name ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              selectedMenu === item.name ? 'bg-primary text-primary-foreground hover:bg-primary' : ''
            }`}
            onClick={() => setSelectedMenu(item.name)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
    </aside>
  )
}

