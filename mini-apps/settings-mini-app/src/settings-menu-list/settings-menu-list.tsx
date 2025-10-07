import { useColorScheme } from '@coldsurfers/ocean-road/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { Alert, FlatList, type ListRenderItem, View } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { apiClient } from '../api-client';
import { MenuItem } from '../menu-item';
import { VersionText } from '../version-text';

type Props = {
  pkgVersion: string;
  onLogoutSuccess: () => void;
  logout: () => Promise<void> | void;
};

export const SettingsMenuList = ({ pkgVersion, onLogoutSuccess, logout }: Props) => {
  const { semantics } = useColorScheme();
  const queryClient = useQueryClient();

  const versionInfoText = `native: ${getVersion()} (${getBuildNumber()}) ota: ${pkgVersion}`;

  const { mutate: deactivateUser } = useMutation({
    mutationFn: apiClient.user.deactivate,
    onSuccess: async () => {
      await logout();
      onLogoutSuccess();
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: apiClient.user.queryKeys.me });
      await queryClient.setQueryData(apiClient.user.queryKeys.me, null);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: apiClient.user.queryKeys.me });
    },
  });

  const onLogout = useCallback(
    () =>
      Alert.alert('로그아웃', '로그아웃 하시겠어요?', [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          onPress: () => {
            logout();
            onLogoutSuccess();
          },
        },
      ]),
    [logout, onLogoutSuccess]
  );

  const onDeactivateUser = useCallback(() => {
    Alert.alert('회원탈퇴', '회원탈퇴를 하면 더 이상 해당 계정으로 로그인 할 수 없어요', [
      {
        style: 'destructive',
        text: '탈퇴하기',
        onPress: () => deactivateUser(),
      },
      {
        style: 'cancel',
        text: '취소',
      },
    ]);
  }, [deactivateUser]);

  const data = useMemo(
    () =>
      [
        {
          type: 'logout',
          onPress: onLogout,
        },
        {
          type: 'delete-account',
          onPress: onDeactivateUser,
        },
      ] as const,
    [onLogout, onDeactivateUser]
  );

  const renderItem = useCallback<ListRenderItem<(typeof data)[number]>>((info) => {
    return <MenuItem type={info.item.type} onPress={info.item.onPress} />;
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={{
        backgroundColor: semantics.background[3],
        flex: 1,
      }}
      ListFooterComponent={
        <View>
          <VersionText style={{ color: semantics.foreground[4] }}>{versionInfoText}</VersionText>
        </View>
      }
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
    />
  );
};
