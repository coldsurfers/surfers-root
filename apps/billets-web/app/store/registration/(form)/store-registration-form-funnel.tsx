'use client';

import { AnimatePresence } from 'framer-motion';
import { FormNav } from './form-nav';
import { StoreRegistrationContactForm } from './store-registration-contact-form';
import { StoreRegistrationUserVoiceForm } from './store-registration-user-voice-form';

type Props = {
  step: 'contact' | 'user-voice';
};

export const StoreRegistrationFormFunnel = ({ step }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <FormNav />
      {step === 'contact' && <StoreRegistrationContactForm key="contact" />}
      {step === 'user-voice' && <StoreRegistrationUserVoiceForm key="user-voice" />}
    </AnimatePresence>
  );
};
