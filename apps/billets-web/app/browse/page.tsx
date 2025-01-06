import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export function generateMetadata(): Metadata {
  return {
    title: 'Billets | Discover shows around the world',
    description:
      'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
  }
}

export default function BrowseCityGatewayPage() {
  // @todo: implement server api by detecting validate city
  // otherwise, redirect to 404
  return redirect('/browse/seoul')
}
