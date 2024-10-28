import FillConcertForm from './components/FillConcertForm'

interface PageProps {
  params: { id: string } // Define the type for params
}

const UploadIdPage = ({ params }: PageProps) => {
  const { id: concertId } = params

  return <FillConcertForm concertId={concertId} />
}

export default UploadIdPage
