'use client';

import { AnimatedFormSuccess } from '@/shared/ui/animated-form';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PartnersContactForm, PartnersIntro, PartnersPageLayout } from './(ui)';

export default function PartnersPage() {
  const [step, setStep] = useState<'contact' | 'success'>('contact');
  return (
    <AnimatePresence mode="wait">
      {step === 'contact' && (
        <PartnersPageLayout
          key="contact"
          topContent={<PartnersIntro />}
          bottomContent={
            <PartnersContactForm
              onSuccess={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
                setStep('success');
              }}
            />
          }
        />
      )}
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
}
