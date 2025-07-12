import React from 'react'

interface Vehicle {
  uuid: string
  make: string
  model: string
  segment: string
}

interface VehicleDropdownProps {
  vehicles: Vehicle[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  label: string
  className?: string
}

const VehicleDropdown: React.FC<VehicleDropdownProps> = ({ 
  vehicles, 
  selectedId, 
  onSelect, 
  label, 
  className = '' 
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    onSelect(selectedValue === '' ? null : selectedValue)
  }

  // Group vehicles by segment
  const groupedVehicles = vehicles.reduce((groups, vehicle) => {
    const segment = vehicle.segment || 'Other'
    if (!groups[segment]) {
      groups[segment] = []
    }
    groups[segment].push(vehicle)
    return groups
  }, {} as Record<string, Vehicle[]>)

  return (
    <div className={`mb-6 ${className}`}>
      <label className='mb-3 font-medium text-lg block'>
        {label}
      </label>
      <select
        value={selectedId || ''}
        onChange={handleChange}
        className='p-3 rounded border w-full text-base'
        style={{ width: '200px' }}
      >
        <option value="">Select a vehicle</option>
        {vehicles && vehicles.length > 0 ? (
          Object.entries(groupedVehicles).map(([segment, segmentVehicles]) => (
            <optgroup key={segment} label={segment}>
              {segmentVehicles.map((vehicle) => (
                <option key={vehicle.uuid} value={vehicle.uuid}>
                  {vehicle.make} {vehicle.model}
                </option>
              ))}
            </optgroup>
          ))
        ) : null}
      </select>
    </div>
  )
}

export default VehicleDropdown 