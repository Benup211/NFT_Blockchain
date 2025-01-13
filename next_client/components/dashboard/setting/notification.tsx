import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Notification() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Notification Preferences</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Channels</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="email-notifications" />
            <Label htmlFor="email-notifications">Email Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="push-notifications" />
            <Label htmlFor="push-notifications">Push Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sms-notifications" />
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-app-notifications" />
            <Label htmlFor="in-app-notifications">In-App Notifications</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Frequency</h3>
        <RadioGroup defaultValue="realtime">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="realtime" id="realtime" />
            <Label htmlFor="realtime">Real-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily Digest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly Summary</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quiet Hours</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quiet-start">Start Time</Label>
            <Select>
              <SelectTrigger id="quiet-start">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(24)].map((_, i) => (
                  <SelectItem key={i} value={`${i}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quiet-end">End Time</Label>
            <Select>
              <SelectTrigger id="quiet-end">
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(24)].map((_, i) => (
                  <SelectItem key={i} value={`${i}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

