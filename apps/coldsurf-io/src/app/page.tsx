import { LandingImage, LandingSection, LandingText, LandingYoutube } from './(ui)'

export default function Home() {
  return (
    <div>
      <LandingSection>
        <LandingText
          bigTitle={'Everything you need to live an artistic life.'}
          smallTitle={
            'No local venues anymore? You cannot grow your bands grown up in your locals?\nAfraid of disapearing artistic life?\nWe make products to support artists to live their own life.\nI am dedicated to contributing to the diversity of the music industry.\nMy mission is to help revitalize local-based performances and support generating revenue through music.'
          }
        />
        <LandingImage />
      </LandingSection>
      <LandingSection reversed withoutInitialPaddingTop>
        <LandingText
          bigTitle={'Watch this video to understand why I created COLDSURF.'}
          smallTitle={`Rick Beato's youtube video - Why Are Bands Mysteriously Disappearing?`}
        />
        <LandingYoutube />
      </LandingSection>
    </div>
  )
}
