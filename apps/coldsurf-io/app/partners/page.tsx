import { PartnersContactForm, PartnersIntro, PartnersPageLayout } from './(ui)';

export default function PartnersPage() {
  return (
    <PartnersPageLayout leftContent={<PartnersIntro />} rightContent={<PartnersContactForm />} />
  );
}
