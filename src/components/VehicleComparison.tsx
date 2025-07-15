import React from "react";

interface Vehicle {
  uuid: string;
  make: string;
  model: string;
  type: string;
  msrp_gbp: number;
  lease_monthly: number | null;
  max_range: number | null;
  battery_size: number | null;
  efficiency_mpkwh: number | null;
  efficiency_mpg: number | null;
  segment: string;
  depreciation_3yr_percent: number | null;
  maintenance_gbp_per_year: number;
  fuel_type: string;
  image_url: string | null;
}

interface VehicleComparisonProps {
  vehicle1: Vehicle | null;
  vehicle2: Vehicle | null;
}

const VehicleComparison: React.FC<VehicleComparisonProps> = ({
  vehicle1,
  vehicle2,
}) => {
  const formatValue = (
    value: any,
    isCurrency: boolean = false,
    isPercentage: boolean = false
  ): string => {
    if (value === null || value === undefined) return "N/A";

    if (isCurrency) {
      return `£${value.toLocaleString()}`;
    }

    if (isPercentage) {
      return `${value}%`;
    }

    if (typeof value === "number") {
      return value.toLocaleString();
    }

    return String(value);
  };

  const getVehicleValue = (
    vehicle: Vehicle | null,
    attribute: keyof Vehicle
  ): string => {
    if (!vehicle) return "Not selected";

    const value = vehicle[attribute];

    switch (attribute) {
      case "msrp_gbp":
        return formatValue(value, true);
      case "lease_monthly":
        return formatValue(value, true);
      case "maintenance_gbp_per_year":
        return formatValue(value, true);
      case "depreciation_3yr_percent":
        return formatValue(value, false, true);
      case "max_range":
        return value ? `${value} miles` : "N/A";
      case "battery_size":
        return value ? `${value} kWh` : "N/A";
      case "efficiency_mpkwh":
        return value ? `${value} mi/kWh` : "N/A";
      case "efficiency_mpg":
        return value ? `${value} mpg` : "N/A";
      default:
        return formatValue(value);
    }
  };

  const attributes: { key: keyof Vehicle; label: string }[] = [
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "type", label: "Type" },
    { key: "msrp_gbp", label: "MSRP" },
    { key: "lease_monthly", label: "Monthly Lease" },
    { key: "max_range", label: "Range" },
    { key: "efficiency_mpkwh", label: "Efficiency (mi/kWh)" },
    { key: "efficiency_mpg", label: "Efficiency (mpg)" },
    { key: "fuel_type", label: "Fuel Type" },
    { key: "segment", label: "Segment" },
  ];

  return (
    <div className='w-full overflow-x-auto mb-4 md:mb-6'>
      <table className='w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm'>
        <thead>
          <tr className='bg-gray-50'>
            <th className='border border-gray-300 px-3 py-2 md:px-4 md:py-3 text-left font-semibold text-gray-700'>
              Attribute
            </th>
            <th className='border border-gray-300 px-3 py-2 md:px-4 md:py-3 text-left font-semibold text-gray-700'>
              Vehicle 1
            </th>
            <th className='border border-gray-300 px-3 py-2 md:px-4 md:py-3 text-left font-semibold text-gray-700'>
              Vehicle 2
            </th>
          </tr>
        </thead>
        <tbody>
          {attributes.map(({ key, label }) => (
            <tr key={key} className='hover:bg-gray-50'>
              <td className='border border-gray-300 px-3 py-2 md:px-4 md:py-3 font-medium text-gray-700'>
                {label}
              </td>
              <td className='border border-gray-300 px-3 py-2 md:px-4 md:py-3 text-gray-600'>
                {getVehicleValue(vehicle1, key)}
              </td>
              <td className='border border-gray-300 px-3 py-2 md:px-4 md:py-3 text-gray-600'>
                {getVehicleValue(vehicle2, key)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default VehicleComparison;
