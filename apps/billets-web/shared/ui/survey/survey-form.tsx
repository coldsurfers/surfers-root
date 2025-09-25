'use client';

import { apiClient } from '@/libs/openapi-client';
import { useLocalStorage } from '@/libs/utils/utils.storage';
import { Button, Text, TextArea, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { AnimatedText } from 'app/store/registration/(ui)/animated-text';
import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';

const Container = styled.div`
  width: auto;
  height: auto;
  background-color: ${semantics.color.background[3]};
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-bottom: 1rem;

  min-height: 231px;
  min-width: 429px;

  ${media.medium(css`
    max-width: 100%;
    min-width: 100%;
    width: 100%;
  `)}
`;

const StyledAnimTitle = styled(Text)`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${semantics.color.foreground[1]};
`;

const StyledAnimText = styled(Text)`
  font-size: 1.05rem;
  color: ${semantics.color.foreground[1]};
`;

const FunnelIntro = ({ onClickCTA }: { onClickCTA: () => void }) => {
  return (
    <>
      <AnimatedText
        text="COLDSURF, 잘 쓰고 계신가요?"
        renderComponent={(text) => <StyledAnimTitle>{text}</StyledAnimTitle>}
      />
      <div style={{ height: '1rem' }} />
      <AnimatedText
        text="안녕하세요, COLDSURF의 메이커 Paul입니다"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.65}
      />
      <div style={{ height: '0.5rem' }} />
      <AnimatedText
        text={
          'COLDSURF를 이용해주시는 여러분께\n몇 가지 궁금한점이 있어서 이렇게 찾아뵙게 되었어요'
        }
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.85}
      />
      <div style={{ height: '0.5rem' }} />
      <AnimatedText
        text={'잠깐만 시간을 내주시면, 많은 부분을 채워드릴 수 있을 거예요'}
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.95}
      />
      <div style={{ height: '0.75rem' }} />
      <AnimatedText
        text="그럼 이제 질문을 시작할게요!"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={1.05}
      />
      <div style={{ height: '0.75rem' }} />
      <Button
        theme="border"
        onClick={(e) => {
          e.stopPropagation();
          onClickCTA();
        }}
      >
        답변하기
      </Button>
    </>
  );
};

const FunnelQuestionCommunity = ({
  onClickCTA,
}: { onClickCTA: (type: 'good' | 'bad') => void }) => {
  return (
    <>
      <AnimatedText
        text="첫 번째 질문이에요 (1/3)"
        renderComponent={(text) => <StyledAnimTitle>{text}</StyledAnimTitle>}
      />
      <div style={{ height: '1rem' }} />
      <AnimatedText
        text="공연 관련 커뮤니티, 어떻게 생각하시나요?"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.65}
      />
      <div style={{ height: '1rem' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Button
          theme="border"
          onClick={(e) => {
            e.stopPropagation();
            onClickCTA('good');
          }}
        >
          좋아요🎉
        </Button>
        <Button
          theme="border"
          onClick={(e) => {
            e.stopPropagation();
            onClickCTA('bad');
          }}
        >
          별로예요🥲
        </Button>
      </div>
    </>
  );
};

const FunnelQuestionManiac = ({ onClickCTA }: { onClickCTA: (type: 'good' | 'bad') => void }) => {
  return (
    <>
      <AnimatedText
        text="두 번째 질문이에요 (2/3)"
        renderComponent={(text) => <StyledAnimTitle>{text}</StyledAnimTitle>}
      />
      <div style={{ height: '1rem' }} />
      <AnimatedText
        text="COLDSURF에서 소규모 공연장의 공연을 직접 구매할 수 있다면?"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.65}
      />
      <div style={{ height: '1rem' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Button
          theme="border"
          onClick={(e) => {
            e.stopPropagation();
            onClickCTA('good');
          }}
        >
          구매할 생각 있어요🎉
        </Button>
        <Button
          theme="border"
          onClick={(e) => {
            e.stopPropagation();
            onClickCTA('bad');
          }}
        >
          구매할 생각 없어요🥲
        </Button>
      </div>
    </>
  );
};

const FunnelQuestionUI = ({ onClickCTA }: { onClickCTA: (type: 'good' | 'bad') => void }) => {
  return (
    <>
      <AnimatedText
        text="마지막 질문이에요 (3/3)"
        renderComponent={(text) => <StyledAnimTitle>{text}</StyledAnimTitle>}
      />
      <div style={{ height: '1rem' }} />
      <AnimatedText
        text="COLDSURF의 사용성은 어때요?"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.65}
      />
      <div style={{ height: '1rem' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Button
          theme="border"
          onClick={(e) => {
            e.stopPropagation();
            onClickCTA('good');
          }}
        >
          좋아요🎉
        </Button>
        <Button
          theme="border"
          onClick={(e) => {
            e.stopPropagation();
            onClickCTA('bad');
          }}
        >
          별로예요🥲
        </Button>
      </div>
    </>
  );
};

const StyledTextArea = styled(TextArea)`
  min-height: 15rem;
  width: 100%;
`;

const FunnelUserVoice = ({ onClickCTA }: { onClickCTA: (message: string) => void }) => {
  const [message, setMessage] = useState('');
  return (
    <>
      <AnimatedText
        text="전하고 싶은 의견이 있으면, 남겨주세요!"
        renderComponent={(text) => <StyledAnimTitle>{text}</StyledAnimTitle>}
      />
      <div style={{ height: '1rem' }} />
      <StyledTextArea
        placeholder="의견이 없으시면, 아래버튼으로 종료할 수 있어요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div style={{ height: '1rem' }} />
      <Button
        theme="border"
        onClick={(e) => {
          e.stopPropagation();
          onClickCTA(message);
        }}
      >
        제출하고, 마무리하기!
      </Button>
    </>
  );
};

const ContainerComponent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <Container ref={ref} {...props} />
);

const MotionContainer = motion.create(ContainerComponent);

export const SurveyForm = forwardRef<
  HTMLDivElement,
  {
    onClose: () => void;
  }
>(({ onClose }, ref) => {
  const [step, setStep] = useState<
    'intro' | 'question-community' | 'question-maniac' | 'question-user-interface' | 'user-voice'
  >('intro');

  const { mutate: sendUserVoice } = useMutation({
    mutationFn: apiClient.mailer.sendUserVoice,
  });

  const [, setSurveyCompleted] = useLocalStorage<'true'>('@coldsurf-io/survey-completed');

  return (
    <MotionContainer
      ref={ref}
      initial={{ opacity: 0, translateY: '2%' }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: '2%' }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {step === 'intro' && (
        <FunnelIntro
          onClickCTA={() => {
            setStep('question-community');
          }}
        />
      )}
      {step === 'question-community' && (
        <FunnelQuestionCommunity
          onClickCTA={(goodOrBad) => {
            sendUserVoice({
              email: 'imcoldsurf@gmail.com',
              message: `question-community: ${goodOrBad}`,
            });
            setStep('question-maniac');
          }}
        />
      )}
      {step === 'question-maniac' && (
        <FunnelQuestionManiac
          onClickCTA={(goodOrBad) => {
            sendUserVoice({
              email: 'imcoldsurf@gmail.com',
              message: `question-maniac: ${goodOrBad}`,
            });
            setStep('question-user-interface');
          }}
        />
      )}
      {step === 'question-user-interface' && (
        <FunnelQuestionUI
          onClickCTA={(goodOrBad) => {
            sendUserVoice({
              email: 'imcoldsurf@gmail.com',
              message: `question-user-interface: ${goodOrBad}`,
            });
            setStep('user-voice');
          }}
        />
      )}
      {step === 'user-voice' && (
        <FunnelUserVoice
          onClickCTA={(message) => {
            if (message.length) {
              sendUserVoice({
                email: 'imcoldsurf@gmail.com',
                message: `question-user-voice: ${message}`,
              });
            }
            setSurveyCompleted('true');
            onClose();
          }}
        />
      )}
    </MotionContainer>
  );
});
