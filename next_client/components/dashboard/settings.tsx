'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Profile from './setting/profile'
import Notification from './setting/notification'
import Security from './setting/security'
import Privacy from './setting/privacy'
import Accessibility from './setting/accessibility'
import { User, Bell, Shield, Lock, AccessibilityIcon } from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notification', label: 'Notification', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'accessibility', label: 'Accessibility', icon: AccessibilityIcon },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />
      case 'notification':
        return <Notification />
      case 'security':
        return <Security />
      case 'privacy':
        return <Privacy />
      case 'accessibility':
        return <Accessibility />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="p-4">
            <nav className="flex flex-col space-y-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {renderContent()}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

