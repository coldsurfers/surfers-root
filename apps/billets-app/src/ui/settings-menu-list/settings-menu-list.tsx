import { apiClient } from '@/lib/api/openapi-client';
import { REMOTE_APPS, REMOTE_APP_BUNDLE_HOST_URL } from '@/lib/constants';
import { AuthContext } from '@/lib/contexts/auth-context';
import { useColorScheme } from '@coldsurfers/ocean-road/native';
import { loadAsyncScript } from '@coldsurfers/react-native-esbuild-deploy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LogOut, UserRoundX } from 'lucide-react-native';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, type ListRenderItem, type TextProps, View } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import pkg from '../../../package.json';
import { StyledMenuItem, StyledText } from './settings-menu-list.styled';

export const SettingsMenuList = ({ onLogoutSuccess }: { onLogoutSuccess: () => void }) => {
  const { semantics } = useColorScheme();
  const { logout } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { data: manifest } = useQuery({
    queryKey: apiClient.app.queryKeys.remoteAppManifest,
    queryFn: () => apiClient.app.getRemoteAppManifest(),
  });

  const [VersionText, setVersionText] = useState<React.FC<TextProps> | null>(null);

  const versionInfoText = `native: ${getVersion()} (${getBuildNumber()}) ota: ${pkg.version}`;

  const { mutate: deactivateUser } = useMutation({
    mutationFn: apiClient.user.deactivate,
    onSuccess: () => {
      logout();
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
          title: 'Log out',
          icon: <LogOut color={semantics.foreground[1]} />,
          onPress: onLogout,
        },
        {
          title: 'Delete account',
          icon: <UserRoundX color={semantics.foreground[1]} />,
          onPress: onDeactivateUser,
        },
      ] as const,
    [onDeactivateUser, onLogout, semantics.foreground]
  );

  const renderItem = useCallback<ListRenderItem<(typeof data)[number]>>(
    (info) => {
      return (
        <StyledMenuItem
          onPress={info.item.onPress}
          style={{
            borderBottomColor: semantics.border[1],
          }}
        >
          {info.item.icon}
          <StyledText style={{ color: semantics.foreground[1] }}>{info.item.title}</StyledText>
        </StyledMenuItem>
      );
    },
    [semantics.border, semantics.foreground]
  );

  useEffect(() => {
    if (!manifest) {
      return;
    }
    const {
      settings: { latestVersion },
    } = manifest;

    async function loadScript() {
      const path = `${REMOTE_APPS.SETTINGS.PATH}/v${latestVersion}/index.bundle.js`;
      const settingsRemoteApp = await loadAsyncScript<{ VersionText: React.FC<TextProps> }>({
        path,
        bundleHostUrl: REMOTE_APP_BUNDLE_HOST_URL,
      });
      setVersionText(() => settingsRemoteApp.VersionText);
    }
    loadScript();
  }, [manifest]);

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
          {VersionText ? (
            <VersionText style={{ color: semantics.foreground[4] }}>{versionInfoText}</VersionText>
          ) : null}
        </View>
      }
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
    />
  );
};
