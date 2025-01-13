import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function Privacy() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Privacy Settings</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile Visibility</h3>
        <RadioGroup defaultValue="public">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public">Public</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="friends" id="friends" />
            <Label htmlFor="friends">Friends Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private">Private</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Data Usage</h3>
        <div className="flex items-center space-x-2">
          <Switch id="analytics" />
          <Label htmlFor="analytics">Allow analytics tracking</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="personalized-ads" />
          <Label htmlFor="personalized-ads">Allow personalized ads</Label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Third-Party Integrations</h3>
        <div className="flex items-center space-x-2">
          <Switch id="social-sharing" />
          <Label htmlFor="social-sharing">Allow social media sharing</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="third-party-cookies" />
          <Label htmlFor="third-party-cookies">Accept third-party cookies</Label>
        </div>
      </div>

      <Button>Save Privacy Settings</Button>
    </div>
  )
}

