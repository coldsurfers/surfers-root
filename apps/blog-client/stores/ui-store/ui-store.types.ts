type ActiveTab = 'techlog' | 'surflog' | 'main' | 'writers' | null

type UIStoreState = {
  activeTab: ActiveTab
}
type UIStoreActions = {
  setActiveTab: (tab: ActiveTab) => void
}
export type UIStore = UIStoreState & UIStoreActions
