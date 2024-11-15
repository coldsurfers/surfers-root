import { Button } from '@coldsurfers/ocean-road'
import { StyledUpdateConcertPosterUIThumbnail } from './update-concert-poster-ui.styled'

interface Props {
  imageURL: string
  onClickUpdate?: () => void
}

export const UpdateConcertPosterUI = ({ imageURL, onClickUpdate }: Props) => (
  <>
    <StyledUpdateConcertPosterUIThumbnail src={imageURL} />
    <Button onClick={onClickUpdate} style={{ marginTop: 12 }}>
      포스터 변경하기
    </Button>
  </>
)
