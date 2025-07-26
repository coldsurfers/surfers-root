import { COMMON_META_DESCRIPTION, COMMON_META_TITLE } from '@/libs/constants';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export function generateMetadata(): Metadata {
  return {
    title: COMMON_META_TITLE,
    description: COMMON_META_DESCRIPTION,
  };
}

export default function BrowseCityGatewayPage() {
  // @todo: implement server api by detecting validate city
  // otherwise, redirect to 404
  return redirect('/browse/seoul');
}
