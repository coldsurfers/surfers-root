export const shareTwitter = ({
  text,
  url,
  hashtags,
  via,
}: {
  text: string;
  url: string;
  hashtags: string[];
  via: string;
}) => {
  const shareUrl = new URL('https://twitter.com/intent/tweet');
  shareUrl.searchParams.set('text', text);
  shareUrl.searchParams.set('url', url);
  if (hashtags.length > 0) shareUrl.searchParams.set('hashtags', hashtags.join(','));
  if (via) shareUrl.searchParams.set('via', via);

  window.open(shareUrl.toString(), '_blank', 'noopener,noreferrer,width=600,height=400');
};
