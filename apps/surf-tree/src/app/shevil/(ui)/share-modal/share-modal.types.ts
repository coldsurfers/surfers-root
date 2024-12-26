import { Link } from '../../(data)/data.types'

export type ShareModalProps = {
  visible: boolean
  onClose: () => void
  sharedLink: Link | null
}
