// https://stackoverflow.com/questions/51504506/too-many-react-context-providers
// Compose.tsx

interface Props {
  registries: Array<React.JSXElementConstructor<React.PropsWithChildren<unknown>>>
  children: React.ReactNode
}

export default function RegistryProvider(props: Props) {
  const { registries = [], children } = props

  return (
    <>
      {registries.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children,
      )}
    </>
  )
}
