import { Button } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

const Thumbnail = styled.img`
  width: 300px;
  height: 500px;
  border-radius: 8px;
  margin-top: 12px;
  object-fit: contain;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

interface Props {
  imageURL: string
  onClickUpdate?: () => void
}

const PosterUI = ({ imageURL, onClickUpdate }: Props) => (
  <>
    <Thumbnail src={imageURL} />
    <Button onClick={onClickUpdate} style={{ marginTop: 12 }}>
      포스터 변경하기
    </Button>
  </>
)

export default PosterUI
