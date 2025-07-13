'use client';

import {
  ProfileDetailEventListItem,
  type ProfileDetailEventListItemProps,
} from '../profile-detail-event-list-item';
import {
  StyledArtistDetailEventListContainer,
  StyledArtistDetailEventListTitleText,
} from './profile-detail-event-list.styled';

type Props = {
  title: string;
  data: ProfileDetailEventListItemProps[];
};

export function ProfileDetailEventList({ title, data }: Props) {
  return (
    <>
      <StyledArtistDetailEventListTitleText as="h3">{title}</StyledArtistDetailEventListTitleText>
      <StyledArtistDetailEventListContainer>
        {data.map((itemProps) => {
          return <ProfileDetailEventListItem key={itemProps.href} {...itemProps} />;
        })}
      </StyledArtistDetailEventListContainer>
    </>
  );
}
