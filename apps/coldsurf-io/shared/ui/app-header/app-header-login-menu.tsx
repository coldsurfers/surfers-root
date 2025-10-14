'use client';

import { KeySquare as KeySquareIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { GlobalLink } from '../global-link';
import { HeaderMenuItem } from '../header-menu-item';
import { createStyledIcon } from './app-header.styled';

export const AppHeaderLoginMenu = ({
  onClickMobileLogout,
}: {
  onClickMobileLogout: () => void;
}) => {
  // const queryClient = useQueryClient();
  const pathname = usePathname();

  // const { isPending: isLogoutPending } = useMutation({
  //   mutationFn: () => authUtils.localLogout(),
  //   onSuccess: () => {
  //     queryClient.removeQueries({ queryKey: apiClient.user.queryKeys.me });
  //     onClickMobileLogout();
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });

  const LoginIcon = createStyledIcon(KeySquareIcon);

  return (
    <GlobalLink href={'/login'} onClick={onClickMobileLogout}>
      <HeaderMenuItem isCurrent={pathname.includes('/login')} icon={<LoginIcon />}>
        로그인
      </HeaderMenuItem>
    </GlobalLink>
  );
};
