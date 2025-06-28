import { validateCityParam } from '@/libs/utils/utils.city';
import { validateEventCategoryParam } from '@/libs/utils/utils.event-category';
import { redirect } from 'next/navigation';
import { ConcertList } from '../(components)/concert-list/concert-list';

export default async function BrowseByCityEventCategoryPage(props: {
  params: Promise<{
    city: string;
    'event-category': string;
  }>;
}) {
  const params = await props.params;
  const cityValidation = await validateCityParam(params.city);
  if (!cityValidation.isValid) {
    return redirect('/404');
  }
  const eventCategoryValidation = await validateEventCategoryParam(params['event-category']);
  if (!eventCategoryValidation.isValid) {
    return redirect('/404');
  }
  return (
    <ConcertList
      cityData={cityValidation.data}
      eventCategoryName={eventCategoryValidation.data.name}
    />
  );
}
