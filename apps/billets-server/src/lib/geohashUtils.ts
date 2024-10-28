import ngeohash from 'ngeohash'

const geohashUtils = {
  generate: (lat: number, lng: number, precision: number) => ngeohash.encode(lat, lng, precision),
}

export default geohashUtils
