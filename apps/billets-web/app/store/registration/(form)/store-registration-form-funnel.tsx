'use client';

import { AnimatePresence } from 'framer-motion';
import { StoreRegistrationContactForm } from './store-registration-contact-form';
import { StoreRegistrationUserVoiceForm } from './store-registration-user-voice-form';

type Props = {
  step: 'contact' | 'user-voice';
};

export const StoreRegistrationFormFunnel = ({ step }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {step === 'contact' && <StoreRegistrationContactForm />}
      {step === 'user-voice' && <StoreRegistrationUserVoiceForm />}
    </AnimatePresence>
  );
};
