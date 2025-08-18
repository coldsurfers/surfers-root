import type { Options } from 'html2pdf.js';

export const generatePDF = async () => {
  // Set options for html2pdf
  const options: Options = {
    margin: 0.25,
    filename: 'website_screenshot.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1.5 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' },
  };

  // Select the element to capture
  const element = document.body;

  const { default: html2pdf } = await import('html2pdf.js');
  // Generate PDF
  html2pdf()
    .from(element)
    .set({
      ...options,
    })
    .save();
};
