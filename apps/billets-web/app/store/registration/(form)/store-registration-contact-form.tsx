'use client';

import { appSessionStorage } from '@/libs/utils';
import { Button, Text, TextInput, colors } from '@coldsurfers/ocean-road';
import { tryParse } from '@coldsurfers/shared-utils';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AnimatedForm } from './animated-form';
import type { StoreRegistrationContactFormType } from './types';

const StyledLabel = styled(Text)`
  margin-top: 20px;
  margin-bottom: 10px;
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
`;

function isValidEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidKR010(s: string) {
  return /^010-\d{4}-\d{4}$/.test(s);
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('010')) {
    if (digits.length <= 3) return digits;
    // biome-ignore lint/style/useTemplate: <explanation>
    if (digits.length <= 7) return digits.slice(0, 3) + '-' + digits.slice(3);
    // biome-ignore lint/style/useTemplate: <explanation>
    return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    if (digits.length <= 3) return digits;
    // biome-ignore lint/style/useTemplate: <explanation>
    if (digits.length <= 6) return digits.slice(0, 3) + '-' + digits.slice(3);
    // biome-ignore lint/style/useTemplate: <explanation>
    return digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6, 10);
  }
}

export const StoreRegistrationContactForm = () => {
  const storedData = useMemo(() => {
    return appSessionStorage?.get<StoreRegistrationContactFormType>(
      '@coldsurf-io/user-voice-contact'
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StoreRegistrationContactFormType>({
    mode: 'onChange',
    defaultValues: {
      email: storedData?.email ?? '',
      phone: storedData?.phone ?? '',
    },
  });
  const router = useRouter();

  const onSubmit = (data: StoreRegistrationContactFormType) => {
    appSessionStorage?.set('@coldsurf-io/user-voice-contact', JSON.stringify(data));
    router.push('/store/registration/user-voice');
  };

  return (
    <AnimatedForm onSubmit={handleSubmit(onSubmit)} title="연락처를 입력해주세요">
      {/* @ts-ignore */}
      <TextInput
        label="이메일"
        {...register('email', {
          validate: (value) => {
            if (!isValidEmail(value)) {
              return '이메일 형식이 올바르지 않습니다';
            }
            return true;
          },
        })}
        id="email"
        name="email"
        placeholder="johndoe@example.com"
        isError={!!errors.email}
        required
      />
      {errors.email && (
        <Text as="p" style={{ color: colors.oc.red[7].value }}>
          {errors.email.message}
        </Text>
      )}
      {/* @ts-ignore */}
      <StyledLabel as="label" htmlFor="phone">
        전화번호
      </StyledLabel>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: false,
          validate: (value) => {
            if (!value) return true;
            if (!isValidKR010(value)) {
              return '전화번호 형식이 올바르지 않습니다';
            }
            return true;
          },
        }}
        render={({ field }) => {
          return (
            <TextInput
              {...field}
              id="phone"
              name="phone"
              placeholder="010-1234-5678"
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                field.onChange(formatted); // react-hook-form에 반영
              }}
              isError={!!errors.phone}
            />
          );
        }}
      />
      {errors.phone && (
        <Text as="p" style={{ color: colors.oc.red[7].value }}>
          {errors.phone.message}
        </Text>
      )}
      <StyledButton type="submit">다음</StyledButton>
    </AnimatedForm>
  );
};
