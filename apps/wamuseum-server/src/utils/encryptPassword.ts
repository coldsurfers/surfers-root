import CryptoJS from 'crypto-js'

const encryptPassword = ({
  plain,
  originalSalt,
}: {
  plain: string
  originalSalt?: string
}) => {
  const salt =
    originalSalt ||
    CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex)

  const iterations = 10000

  const key = CryptoJS.PBKDF2(plain, CryptoJS.enc.Hex.parse(salt), {
    keySize: 512 / 32,
    iterations,
  })

  return {
    encrypted: key.toString(CryptoJS.enc.Base64),
    salt,
  }
}

export default encryptPassword
