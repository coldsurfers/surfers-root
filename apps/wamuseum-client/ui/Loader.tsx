import { palette } from '@coldsurfers/hotsurf'
import { PulseLoader } from 'react-spinners'
import styled from 'styled-components'

const Loader = () => null
// (
//   <Background>
//     <Pulse color={palette.pink} />
//   </Background>
// )

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
`

const Pulse = styled(PulseLoader)`
  z-index: 2;
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(-50%, -50%);
`

export default Loader
