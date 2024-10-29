import {useQuery} from '@tanstack/react-query';
import {RecentConcertListItem} from '../../../types/Concert';
import {getRecentConcertList} from '../../api/concert';

export default function useRecentConcertListQuery() {
  return useQuery<Array<RecentConcertListItem>>({
    queryKey: useRecentConcertListQuery.extractKey(),
    queryFn: async () => {
      const res = await getRecentConcertList();
      return res.data;
    },
  });
}

useRecentConcertListQuery.extractKey = () => ['get_recent_concert_list'];
