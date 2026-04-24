import BlindBoxGame from "./components/BlindBoxGame";
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function BlindBoxGamePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <main>
      <BlindBoxGame bagId={id} />
    </main>
  );
}
