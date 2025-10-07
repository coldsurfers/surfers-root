// @TODO: same name with coldsurf-io
export const getEventCategoryUIName = (originalName: string) => {
  switch (originalName) {
    case 'Gigs':
      return '콘서트';
    case 'Theatre':
      return '연극 / 뮤지컬';
    case 'Dance':
      return '무용';
    default:
      return originalName;
  }
};
