export const getZoomLevel = (latitudeDelta: number): number => {
  const calculatedZoomLevel = Math.round(Math.log(360 / latitudeDelta) / Math.LN2)
  return calculatedZoomLevel
}
