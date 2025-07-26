import { apiClient } from '@/lib/api/openapi-client';
import commonStyles from '@/lib/common-styles';
import type { components } from '@/types/api';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Linking, StyleSheet, View } from 'react-native';

export const TicketItem = ({ ticket }: { ticket: components['schemas']['TicketDTOSchema'] }) => {
  const { semantics } = useColorScheme();
  const { sellerName, id: ticketId, openDate, url } = ticket;
  const { data: prices = [] } = useQuery({
    queryKey: apiClient.price.queryKeys.list({ ticketId }),
    queryFn: () => apiClient.price.getList({ ticketId }),
  });
  const cheapestPrice =
    prices.length > 0
      ? prices.reduce((min, current) => {
          return current.price < min.price ? current : min;
        }, prices[0])
      : null;
  const formattedPrice = cheapestPrice
    ? `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: cheapestPrice.currency,
      }).format(cheapestPrice.price)}`
    : '';
  return (
    <View style={[styles.ticketItemWrapper, { backgroundColor: semantics.background[4] }]}>
      <View style={styles.ticketItemTop}>
        <Text style={styles.ticketItemEmoji}>🎫</Text>
        <View style={styles.ticketItemPriceWrapper}>
          <Text style={[styles.ticketItemSeller, { color: semantics.foreground[2] }]}>
            {sellerName}
          </Text>
          <Text style={{ fontSize: 14, marginTop: 4, color: semantics.foreground[1] }}>
            최저가 {formattedPrice}
          </Text>
          <Text style={{ fontSize: 14, marginTop: 4, color: semantics.foreground[1] }}>
            {format(new Date(openDate), 'yyyy년 MM월 dd일 HH시 mm분 오픈')}
          </Text>
        </View>
      </View>
      <View style={styles.ticketItemBottom}>
        <Button
          onPress={() => {
            Linking.openURL(url);
          }}
          style={styles.ticketItemCTA}
        >
          <Text weight="medium" style={styles.ticketItemCTAText}>
            🔗 티켓찾기 - {formattedPrice}부터
          </Text>
        </Button>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  ticketItemWrapper: {
    marginHorizontal: 12,
    ...commonStyles.shadowBox,
    backgroundColor: colors.oc.white.value,
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
  },
  ticketItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.oc.gray[4].value,
    paddingBottom: 12,
  },
  ticketItemEmoji: { fontSize: 24 },
  ticketItemPriceWrapper: { marginLeft: 12 },
  ticketItemBottom: { marginTop: 12 },
  ticketItemCTA: {
    backgroundColor: colors.oc.cyan[8].value,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketItemCTAText: { color: colors.oc.white.value, fontSize: 14 },
  ticketItemSeller: {
    fontWeight: '600',
    fontSize: 14,
  },
});
