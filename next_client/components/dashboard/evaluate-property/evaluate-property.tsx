'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { usePredictionStore } from '@/state/prediction-state'

const formSchema = z.object({
  Area_Sqft: z.number().min(1, "Area must be greater than 0"),
  City: z.enum(["Kathmandu", "Bhaktapur", "Lalitpur"]),
  Place: z.string().min(1, "Place is required"),
  Property_Type: z.enum(["House", "Bungalow", "Other", "Flat", "Apartment"]),
  Bedroom: z.number().min(0, "Number of bedrooms must be 0 or more"),
  Bathroom: z.number().min(0, "Number of bathrooms must be 0 or more"),
  Parking: z.number().min(0, "Number of parking spaces must be 0 or more"),
  Year_Built: z.number().min(1800, "Year built must be after 1800").max(new Date().getFullYear(), "Year built cannot be in the future"),
})

export default function EvaluateProperty() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const {isloading,getPredictions}=usePredictionStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Area_Sqft: 0,
      City: "Kathmandu",
      Place: "",
      Property_Type: "House",
      Bedroom: 0,
      Bathroom: 0,
      Parking: 0,
      Year_Built: new Date().getFullYear(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPrediction(null)
    try {
      const predictionInput = {
        Area_Sqft: values.Area_Sqft,
        City: values.City,
        Place: values.Place,
        Property_Type: values.Property_Type,
        Bedroom: values.Bedroom,
        Bathroom: values.Bathroom,
        Parking: values.Parking,
        Year_Built: values.Year_Built,
      }
      const { success, predictions } = await getPredictions(predictionInput)
      if (!success) {
        throw new Error("Failed to get prediction")
      }
      setPrediction(predictions)
      toast({
        title: "Prediction Complete",
        description: "Your property value prediction has been calculated.",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "There was a problem calculating the prediction. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Property Value Prediction</CardTitle>
        <CardDescription>Enter the details of the property to get an estimated value prediction.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Area_Sqft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (Sq ft)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="City"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                        <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
                        <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Specific area or neighborhood</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Property_Type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Bungalow">Bungalow</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Flat">Flat</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Bedroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Bathroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} step="0.5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Parking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parking Spaces</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Year_Built"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Built</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isloading}>
              {isloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                'Predict Value'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {prediction && (
          <div className="text-center w-full">
            <h3 className="text-lg font-semibold">Estimated Property Value:</h3>
            <p className="text-3xl font-bold text-green-600">Rs {prediction.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">This is an estimated value based on the provided information. Actual property values may vary.</p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

