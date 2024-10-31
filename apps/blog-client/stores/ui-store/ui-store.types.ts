type ActiveTab = 'techlog' | 'surflog' | 'main' | 'writers'

type UIStoreState = {
  activeTab: ActiveTab
}
type UIStoreActions = {
  setActiveTab: (tab: ActiveTab) => void
}
export type UIStore = UIStoreState & UIStoreActions
