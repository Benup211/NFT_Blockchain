import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { propertyId } = await request.json()

  // Simulate a delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate a successful purchase most of the time
  const success = Math.random() < 0.9

  if (success) {
    return NextResponse.json({ success: true, message: 'Property purchased successfully' })
  } else {
    return NextResponse.json({ success: false, message: 'Purchase failed. Please try again.' }, { status: 400 })
  }
}

