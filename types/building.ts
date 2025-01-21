export type Building = {
  bldg_id: number;
  bldg_geom: {
    type: 'MultiPolygon';
    coordinates: [number, number][][][]; // GeoJSON 구조를 반영
  };
};