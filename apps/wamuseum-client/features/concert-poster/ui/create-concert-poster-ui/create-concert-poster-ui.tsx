import { Button } from '@coldsurfers/ocean-road'

export const CreateConcertPosterUI = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick} style={{ marginTop: 12 }}>
      포스터 등록하기
    </Button>
  )
}
