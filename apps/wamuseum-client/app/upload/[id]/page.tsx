import FillConcertForm from './components/FillConcertForm';

interface PageProps {
  params: Promise<{ id: string }>; // Define the type for params
}

const UploadIdPage = async (props: PageProps) => {
  const params = await props.params;
  const { id: concertId } = params;

  return <FillConcertForm concertId={concertId} />;
};

export default UploadIdPage;
