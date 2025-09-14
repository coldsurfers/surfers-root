'use client';

import { AnimatePresence } from 'framer-motion';
import { StoreRegistrationContactForm } from './store-registration-contact-form';

type Props = {
  step: 'contact' | 'user-voice';
};

export const StoreRegistrationFormFunnel = ({ step }: Props) => {
  return (
    <AnimatePresence>{step === 'contact' && <StoreRegistrationContactForm />}</AnimatePresence>
  );
};
