import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'

export default function SearchItemTextThumbnail({ text }: { text: string }) {
  // @todo: replace thumbnail with "ProfileThumbnail" from ocean-road
  return <ProfileThumbnail size="md" emptyBgText={text} />
}
