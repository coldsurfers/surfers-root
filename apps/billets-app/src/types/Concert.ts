export interface Concert {
  concertCategory: ConcertCategory;
  artist: string;
  date: string;
  id: number;
  posters: ConcertPoster[] | null;
  tickets: ConcertTicket[] | null;
  title: string;
  createdAt: string;
  updatedAt: string | null;
  html: string | null;
}

export interface ConcertCategory {
  id: number;
  title: string;
}

export interface ConcertPoster {
  id: number;
  imageURL: string;
}

export interface ConcertTicketPrice {
  id: number;
  title: string;
  price: number;
  priceCurrency: string;
}

export interface ConcertTicket {
  id: number | null;
  openDate: string | null;
  seller: string | null;
  sellingURL: string | null;
  ticketPrices: ConcertTicketPrice[];
}

export interface RecentConcertListItem {
  id: number;
  title: string;
  concerts: Concert[];
}
