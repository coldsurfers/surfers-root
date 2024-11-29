import styled from '@emotion/styled'

export const StyledRecentListScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 125px;
  overflow-x: auto; // Enable horizontal scrolling
  scrollbar-width: none; // Hide scrollbar for Firefox
  -ms-overflow-style: none; // Hide scrollbar for Internet Explorer and Edge
  padding: 16px;
  scroll-snap-type: x mandatory;

  @media (max-width: 960px) {
    margin-top: 22px;
  }
`

export const StyledRecentListParagraph = styled.p`
  font-size: 14px;
  font-weight: 500;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0;
  margin-bottom: 0;
`

export const StyledRecentListBilletsConcertCard = styled.div<{ $isLoading: boolean }>`
  width: 180px;
  height: ${(props) => (props.$isLoading ? '180px' : '260px')};
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) =>
    props.$isLoading ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' : 'none'};
  background-size: 200% 100%;
  animation: ${(props) => (props.$isLoading ? 'loading 1.5s infinite' : 'none')};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`
