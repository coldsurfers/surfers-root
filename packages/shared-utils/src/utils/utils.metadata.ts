type BaseData = {
  keywords: string[]
  icons: {
    icon: string
    shortcut: string
    apple: string
  }
  metadataBase: URL
  appLinks?: {
    ios?: {
      app_name: string
      app_store_id: string
      url: string
    }
  }
  twitter?: {
    app?: {
      id: {
        /**
         * app store id
         */
        iphone: string
      }
      name: string
      url: {
        /**
         * app store url
         */
        iphone: string
      }
    }
    card: 'app'
  }
}

export class NextMetadataGenerator {
  private baseData: BaseData
  constructor({ baseData }: { baseData: BaseData }) {
    this.baseData = baseData
  }

  public generateMetadata<T>(additionalMetadata: {
    keywords?: string[]
    title?: string
    description?: string
    other?: Record<string, unknown>
    openGraph?: Record<string, unknown>
  }): T {
    const { icons, metadataBase, appLinks, keywords, twitter } = this.baseData
    return {
      ...additionalMetadata,
      icons,
      metadataBase,
      appLinks,
      keywords: [...keywords, ...(additionalMetadata.keywords ?? [])],
      twitter,
    } as T
  }
}
