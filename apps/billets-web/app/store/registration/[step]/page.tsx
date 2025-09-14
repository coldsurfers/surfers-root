import { notFound } from 'next/navigation';
import { z } from 'zod';
import { StoreRegistrationFormFunnel } from '../(form)';

const stepSchema = z.enum(['contact', 'user-voice']);

export default async function StoreRegistrationStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;

  const stepValidation = stepSchema.safeParse(step);

  if (!stepValidation.success) {
    notFound();
  }

  return <StoreRegistrationFormFunnel step={stepValidation.data} />;
}
