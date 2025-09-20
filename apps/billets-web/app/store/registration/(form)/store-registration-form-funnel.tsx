'use client';

import { AnimatePresence } from 'framer-motion';
import { FormNav } from './form-nav';
import { StoreRegistrationContactForm } from './store-registration-contact-form';
import { StoreRegistrationSuccess } from './store-registration-success';
import { StoreRegistrationUserVoiceForm } from './store-registration-user-voice-form';
import type { StoreRegistrationStep } from './types';

type Props = {
  step: StoreRegistrationStep;
};

export const StoreRegistrationFormFunnel = ({ step }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {step !== 'success' && <FormNav />}
      {step === 'contact' && <StoreRegistrationContactForm key="contact" />}
      {step === 'user-voice' && <StoreRegistrationUserVoiceForm key="user-voice" />}
      {step === 'success' && <StoreRegistrationSuccess key="success" />}
    </AnimatePresence>
  );
};
