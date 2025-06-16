import React from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const FilterPanel = ({ filters, setFilters }) => {
  const handleCheckboxChange = (category, value) => {
    const updatedFilters = { ...filters };
    updatedFilters[category] = updatedFilters[category] !== value ? value : '';
    setFilters(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Work Mode</h4>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.workMode === 'work-from-office'}
                onChange={() =>
                  handleCheckboxChange('workMode', 'work-from-office')
                }
              />
            }
            label="Work from Office"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.workMode === 'remote'}
                onChange={() => handleCheckboxChange('workMode', 'remote')}
              />
            }
            label="Remote"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.workMode === 'hybrid'}
                onChange={() => handleCheckboxChange('workMode', 'hybrid')}
              />
            }
            label="Hybrid"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default FilterPanel;
