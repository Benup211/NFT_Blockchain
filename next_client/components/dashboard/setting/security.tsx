import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Security() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactor, setTwoFactor] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change
    console.log('Security settings updated:', { oldPassword, newPassword, confirmPassword, twoFactor, loginAlerts })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Change Password</h3>
        <div>
          <Label htmlFor="old-password">Old Password</Label>
          <Input
            id="old-password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="two-factor"
            checked={twoFactor}
            onCheckedChange={setTwoFactor}
          />
          <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
        </div>
        {twoFactor && (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select 2FA method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="app">Authenticator App</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Login Alerts</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="login-alerts"
            checked={loginAlerts}
            onCheckedChange={setLoginAlerts}
          />
          <Label htmlFor="login-alerts">Enable Login Alerts</Label>
        </div>
      </div>

      <Button type="submit">Update Security Settings</Button>
    </form>
  )
}

