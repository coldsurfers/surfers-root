import { formatCurrency } from '@/utils/format-currency'
import { Button } from '@coldsurfers/ocean-road'
import { TicketPrice } from 'src/__generated__/graphql'
import {
  StyledTicketPriceItemContainer,
  StyledTicketPriceItemPrice,
  StyledTicketPriceItemTitle,
} from './ticket-price-list-item.styled'

export const TicketPriceListItem = ({ item }: { item: TicketPrice }) => {
  return (
    <StyledTicketPriceItemContainer>
      <StyledTicketPriceItemTitle as="h4">{item.title}</StyledTicketPriceItemTitle>
      <StyledTicketPriceItemPrice>{formatCurrency(item.price, item.priceCurrency)}</StyledTicketPriceItemPrice>
      <Button theme={'transparent'} style={{ marginLeft: 'auto' }}>
        ❌
      </Button>
    </StyledTicketPriceItemContainer>
  )
}
