export default function pickFile(onChange: (e: Event) => void | Promise<void>) {
  const input = document.createElement('input');
  input.type = 'file';
  input.click();
  input.onchange = async (e) => {
    await onChange(e);
    input.remove();
  };
}
