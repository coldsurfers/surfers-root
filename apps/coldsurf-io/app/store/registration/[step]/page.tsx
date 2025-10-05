import { notFound } from 'next/navigation';
import { z } from 'zod';
import { StoreRegistrationFormFunnel } from '../(form)';
import { stepSchema } from '../(form)/types';

const useContactForm = true;

export default async function StoreRegistrationStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;

  const stepValidation = stepSchema.safeParse(step);

  if (!useContactForm) {
    notFound();
  }

  if (!stepValidation.success) {
    notFound();
  }

  return <StoreRegistrationFormFunnel step={stepValidation.data} />;
}
