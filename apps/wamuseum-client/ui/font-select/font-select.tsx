// Exo_2,
//   Audiowide,
//   Orbitron,
//   Pacifico,
//   Lobster,
//   Amatic_SC,
//   Archivo_Black,
//   Roboto,
//   Montserrat,
//   Work_Sans,
//   Lato,
//   Dancing_Script,
//   Shadows_Into_Light,
//   Sacramento,
//   Patrick_Hand,

import type { NextFont } from '@next/font/dist/types';
import {
  Anton,
  Bebas_Neue,
  Bona_Nova,
  Cinzel,
  Cormorant_Garamond,
  Merriweather,
  Oswald,
  Playfair_Display,
  Poppins,
  Raleway,
  Rancho,
  Rock_Salt,
} from 'next/font/google';
import { type ChangeEvent, useCallback } from 'react';
import { StyledOption, StyledSelect } from './font-select.styled';

const bonaNova = Bona_Nova({ subsets: ['latin'], weight: '400' });
const rockSalt = Rock_Salt({ subsets: ['latin'], weight: '400' });
const rancho = Rancho({ subsets: ['latin'], weight: '400' });
const oswald = Oswald({ subsets: ['latin'] });
const anton = Anton({ subsets: ['latin'], weight: '400' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' });
const poppins = Poppins({ subsets: ['latin'], weight: ['500'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: '500' });
const merriweather = Merriweather({ subsets: ['latin'], weight: '400' });
const cinzel = Cinzel({ subsets: ['latin'], weight: '500' });
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: '500' });
const raleway = Raleway({ subsets: ['latin'], weight: '500' });

const fonts = {
  bonaNova,
  rockSalt,
  oswald,
  anton,
  bebasNeue,
  poppins,
  playfairDisplay,
  merriweather,
  cinzel,
  cormorantGaramond,
  raleway,
  rancho,
};

export const FontSelect = ({
  onChange,
}: {
  onChange: (font: { name: keyof typeof fonts; value: NextFont }) => void;
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as keyof typeof fonts;
      const targetFont = fonts[value];
      onChange({
        name: value,
        value: targetFont,
      });
    },
    [onChange]
  );
  return (
    <StyledSelect onChange={handleChange}>
      {Object.keys(fonts).map((fontKey) => (
        <StyledOption key={fontKey} value={fontKey} label={fontKey}>
          {fontKey}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};
