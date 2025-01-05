import { redirect } from 'next/navigation'

export default function BrowseCityGatewayPage() {
  // @todo: implement server api by detecting validate city
  // otherwise, redirect to 404
  return redirect('/browse/seoul')
}
