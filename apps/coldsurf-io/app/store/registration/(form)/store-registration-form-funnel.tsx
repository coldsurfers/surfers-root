'use client';

import { AnimatedFormSuccess } from '@/shared/ui/animated-form';
import { AnimatePresence } from 'framer-motion';
import { FormNav } from './form-nav';
import { StoreRegistrationContactForm } from './store-registration-contact-form';
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
      {step === 'success' && (
        <AnimatedFormSuccess
          key="success"
          title="신청해 주셔서 감사합니다."
          message={
            '입력해주신 내용을 바탕으로 빠른 시일 내에 연락드릴게요.\n신청해주셔서 다시 한번 감사합니다.'
          }
        />
      )}
    </AnimatePresence>
  );
};
