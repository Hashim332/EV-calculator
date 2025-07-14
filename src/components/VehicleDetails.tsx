import React from 'react';

interface Vehicle {
  uuid: string;
  make: string;
  model: string;
  type: string;
  msrp_gbp: number;
  lease_monthly: number;
  max_range: number;
  battery_size: number;
  efficiency: number;
  efficiency_mpg: number;
  segment: string;
  depreciation_3yr_percent: number;
  maintenance_gbp_per_year: number;
  fuel_type: string;
  image_url?: string;
}

interface VehicleDetailsProps {
  vehicle?: Vehicle | null;
  type: 'ev' | 'ice';
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle, type }) => {
  if (!vehicle) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <div className="w-64 h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
          <span className="text-lg">Select a {type === 'ev' ? 'EV' : 'ICE Car'}</span>
        </div>
      </div>
    );
  }

  // Calculations based on new schema
  const lease = vehicle.lease_monthly || 0;
  const maintenanceMonthly = vehicle.maintenance_gbp_per_year ? Math.round(vehicle.maintenance_gbp_per_year / 12) : 0;
  const purchase = vehicle.msrp_gbp || 0;
  const depreciationPercent = vehicle.depreciation_3yr_percent || 0;
  const resale = Math.round(purchase * (1 - depreciationPercent / 100));
  // For ICE, you may want to estimate fuel cost based on efficiency_mpg, but we'll leave as 0 for now unless you provide a formula.
  const fuel = 0;

  let totalCost = 0;
  let costDetails = null;

  if (type === 'ev') {
    totalCost = lease * 36 + maintenanceMonthly * 36; // 3 years
    costDetails = (
      <>
        <li>Lease: £{lease}/mo</li>
        <li>Maintenance: £{maintenanceMonthly}/mo</li>
      </>
    );
  } else {
    totalCost = (purchase - resale) + fuel * 36 + maintenanceMonthly * 36;
    costDetails = (
      <>
        <li>Purchase Price: £{purchase}</li>
        <li>Resale (3yr): £{resale}</li>
        <li>Fuel: £{fuel}/mo</li>
        <li>Maintenance: £{maintenanceMonthly}/mo</li>
      </>
    );
  }

  return (
    <>
      <div className="w-64 h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
        <img
          src={vehicle.image_url || (type === 'ev' ? 'https://via.placeholder.com/240x120?text=EV' : 'https://via.placeholder.com/240x120?text=ICE')}
          alt={vehicle.make + ' ' + vehicle.model}
          className="object-contain h-full"
        />
      </div>
      <div className="text-center mb-3">
        <div className="font-semibold text-lg">{vehicle.make} {vehicle.model}</div>
        <div className="text-sm text-gray-500">
          {type === 'ev' && vehicle.max_range ? `Range: ${vehicle.max_range} miles` : null}
          {type === 'ice' && vehicle.efficiency_mpg ? `MPG: ${vehicle.efficiency_mpg}` : null}
        </div>
      </div>
      <ul className="text-base text-gray-700 space-y-1 mb-4">
        {costDetails}
      </ul>
      <div className={`w-full rounded p-3 text-center mt-auto ${type === 'ev' ? 'bg-violet-100' : 'bg-orange-100'}`}>
        <div className="font-semibold">3-Year Total Cost</div>
        <div className={`text-xl font-bold ${type === 'ev' ? 'text-violet-700' : 'text-orange-700'}`}>£{totalCost.toLocaleString()}</div>
        <div className="text-xs text-gray-500">
          {type === 'ev' ? '(Lease + Maintenance)' : '(Depreciation + Fuel + Maintenance)'}
        </div>
      </div>
    </>
  );
};

export default VehicleDetails; 