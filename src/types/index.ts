export interface Vehicle {
  uuid: string;
  make: string;
  model: string;
  type: string;
  msrp_gbp: number;
  lease_monthly: number;
  max_range: number;
  battery_size: number;
  efficiency_mpkwh: number;
  efficiency_mpg: number;
  segment: string;
  depreciation_band: string; // "high" or "low"
  maintenance_gbp_per_year: number;
  fuel_type: string;
  image_url?: string;
}
