import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function Accessibility() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Accessibility Settings</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Visual Preferences</h3>
        <div>
          <Label htmlFor="theme">Color Theme</Label>
          <Select>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="high-contrast">High Contrast</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="font-size">Font Size</Label>
          <Slider
            id="font-size"
            defaultValue={[16]}
            max={24}
            min={12}
            step={1}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Reading Preferences</h3>
        <div className="flex items-center space-x-2">
          <Switch id="screen-reader" />
          <Label htmlFor="screen-reader">Enable Screen Reader Support</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="dyslexic-font" />
          <Label htmlFor="dyslexic-font">Use Dyslexia-Friendly Font</Label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Navigation Preferences</h3>
        <div className="flex items-center space-x-2">
          <Switch id="keyboard-navigation" />
          <Label htmlFor="keyboard-navigation">Enable Keyboard Navigation</Label>
        </div>
        <div>
          <Label htmlFor="animation-speed">Animation Speed</Label>
          <Select>
            <SelectTrigger id="animation-speed">
              <SelectValue placeholder="Select animation speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="reduced">Reduced</SelectItem>
              <SelectItem value="off">Off</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button>Save Accessibility Settings</Button>
    </div>
  )
}

