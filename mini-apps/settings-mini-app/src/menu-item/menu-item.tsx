import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import styled from '@emotion/native';
import { LogOut, UserRoundX } from 'lucide-react-native';
import { useMemo } from 'react';
import type { MenuItemProps } from '../types';

export const StyledMenuItem = styled.TouchableOpacity`
  height: 46px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
`;

export const StyledText = styled(Text)`
  font-size: 14px;
  margin-left: 20px;
`;

const MenuItemIcon = ({ type }: { type: MenuItemProps['type'] }) => {
  const { semantics } = useColorScheme();
  switch (type) {
    case 'logout':
      return <LogOut color={semantics.foreground[1]} />;
    case 'delete-account':
      return <UserRoundX color={semantics.foreground[1]} />;
    default:
      return null;
  }
};

export const MenuItem = ({ type, onPress }: MenuItemProps) => {
  const { semantics } = useColorScheme();

  const title = useMemo(() => {
    switch (type) {
      case 'logout':
        return 'Log out';
      case 'delete-account':
        return 'Delete account';
      default:
        return '';
    }
  }, [type]);

  return (
    <StyledMenuItem
      onPress={onPress}
      style={{
        borderBottomColor: semantics.border[1],
      }}
    >
      <MenuItemIcon type={type} />
      <StyledText style={{ color: semantics.foreground[1] }}>{title}</StyledText>
    </StyledMenuItem>
  );
};
