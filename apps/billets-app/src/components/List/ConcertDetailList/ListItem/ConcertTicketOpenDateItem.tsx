import {Text} from 'fstvllife-design-system';
import React from 'react';
import {format} from 'date-fns';
import {StyleSheet, View} from 'react-native';

interface Props {
  openDate: string;
  description: string;
}

const ConcertTicketOpenDateItem = ({openDate, description}: Props) => {
  return (
    <View>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>
        {format(new Date(openDate), 'yyyy-MM-dd HH시 mm분')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 12,
  },
});

export default ConcertTicketOpenDateItem;
