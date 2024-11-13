type ActiveTab = 'techlog' | 'surflog' | 'writers' | null

type UIStoreState = {
  activeTab: ActiveTab
}
type UIStoreActions = {
  setActiveTab: (tab: ActiveTab) => void
}
export type UIStore = UIStoreState & UIStoreActions
