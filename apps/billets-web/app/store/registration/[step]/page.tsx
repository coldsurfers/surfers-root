import { notFound } from 'next/navigation';
import { z } from 'zod';

const stepSchema = z.enum(['contact', 'user-voice']);

export default async function StepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;

  const stepValidation = stepSchema.safeParse(step);

  if (!stepValidation.success) {
    notFound();
  }

  return <div>StepPage</div>;
}
