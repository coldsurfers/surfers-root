import saveAs from 'file-saver';
import { toJpeg } from 'html-to-image';

export const exportBanner = async (
  element: HTMLElement,
  options: {
    size: {
      width: number;
      height: number;
    };
  }
) => {
  const {
    size: { width, height },
  } = options;
  try {
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      canvasWidth: width,
      canvasHeight: height,
    });
    saveAs(dataUrl, 'banner.jpeg');
  } catch (error) {
    console.error('Error exporting banner:', error);
  }
};
