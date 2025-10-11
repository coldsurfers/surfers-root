'use client';

import { AnimatedForm } from '@/shared/ui/animated-form';
import { Button, Text, TextArea, TextInput, colors, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const StyledLabel = styled(Text)`
  margin-top: 20px;
  margin-bottom: 10px;
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const StyledSelect = styled.select`
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: ${semantics.color.background[2]};
  border: 0;
  border-bottom:1px solid ${semantics.color.border[2]};
  border-radius: 0;
  padding-bottom: 0.5rem;

  font-size: 1.25rem;
  color: ${semantics.color.foreground[1]};

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';

  &:invalid {
    color: ${semantics.color.foreground[4]};
  }
  option[value=''] {
    color: ${semantics.color.foreground[4]};
  }
`;

const StyledTextInput = styled(TextInput)`
  /* prevent mobile zoom autofocus, must be larger than 16px */
  font-size: 16px;
`;

const StyledTextArea = styled(TextArea)`
  height: 200px;
  /* prevent mobile zoom autofocus, must be larger than 16px */
  font-size: 16px;
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

type PartnersContactFormType = {
  name: string;
  email: string;
  company: string;
  phone: string;
  website: string;
  message: string;
  instagram: string;
  twitter: string;
  facebook: string;
  role: 'venue-owner' | 'event-promoter' | 'artist' | 'other';
};

export const PartnersContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PartnersContactFormType>({
    mode: 'onChange',
  });
  const router = useRouter();

  const onSubmit = (data: PartnersContactFormType) => {
    console.log(data);
    // router.push('/store/registration/user-voice');
  };

  return (
    <AnimatedForm onSubmit={handleSubmit(onSubmit)} title="같이 협업하고 싶으신가요?" delay={1.5}>
      {/* @ts-ignore */}
      <StyledSelect
        required
        {...register('role', {
          required: true,
        })}
        defaultValue=""
      >
        <option disabled selected value="">
          어떤 분이신가요?
        </option>
        <option value="venue-owner">공연장 운영 / 공연장에서 근무해요</option>
        <option value="event-promoter">공연 기획 / 티켓을 판매하고 있어요</option>
        <option value="artist">아티스트 / 직접적인 아티스트로 일하고 있어요</option>
        <option value="other">ETC / 그 외 다른 일을 하고 있어요</option>
      </StyledSelect>
      <StyledTextInput
        label="이름"
        {...register('name', {
          required: true,
        })}
        id="name"
        name="name"
        placeholder="편한 닉네임도 좋아요"
        isError={!!errors.name}
        required
      />
      {errors.name && (
        <Text as="p" style={{ color: colors.oc.red[7].value }}>
          {errors.name.message || '이름을 입력해주세요'}
        </Text>
      )}
      <StyledTextInput
        label="회사"
        {...register('company')}
        id="company"
        name="company"
        placeholder="소속된 회사가 있으시다면 알려주세요"
      />
      <StyledTextInput
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
        placeholder="회신드릴 이메일 주소를 알려주세요"
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
            <StyledTextInput
              {...field}
              id="phone"
              name="phone"
              placeholder="직접 통화나 문자를 원하시면 적어주세요"
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
      <StyledTextInput
        label="웹사이트"
        {...register('website')}
        id="website"
        name="website"
        placeholder="보유하신 웹사이트가 있다면 알려주세요"
      />
      <StyledTextArea
        noResize={false}
        label="여러분의 이야기를 들려주세요"
        placeholder={`저희가 도움을 드릴 수 있도록 최대한 자세하게 표현 해주시면 좋아요. ex) "저는 극단에서 일하고 있어요. 대학로 근처 공연장에서 주말마다 정기 공연이 있는데, 공연 티켓에 대한 판매 및 홍보를 원해요" or "저는 작은 펍을 운영중인데, 주말에 있을 정기 공연에 참여할 아티스트를 소개 받고 싶어요"`}
        maxLength={1000}
        {...register('message', {
          maxLength: 1000,
        })}
      />
      <StyledTextInput
        label="인스타그램 프로필"
        {...register('instagram')}
        id="instagram"
        name="instagram"
        placeholder="공유해주실 인스타그램 프로필이 있다면 알려주세요"
      />
      <StyledTextInput
        label="트위터 프로필"
        {...register('twitter')}
        id="twitter"
        name="twitter"
        placeholder="공유해주실 트위터 프로필이 있다면 알려주세요"
      />
      <StyledTextInput
        label="페이스북 프로필"
        {...register('facebook')}
        id="facebook"
        name="facebook"
        placeholder="공유해주실 페이스북 프로필이 있다면 알려주세요"
      />
      <StyledButton type="submit">제출하기</StyledButton>
    </AnimatedForm>
  );
};
