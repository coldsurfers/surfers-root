type ActiveTab = 'techlog' | 'surflog' | 'main'

type UIStoreState = {
  activeTab: ActiveTab
}
type UIStoreActions = {
  setActiveTab: (tab: ActiveTab) => void
}
export type UIStore = UIStoreState & UIStoreActions
