import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ onSelect, data, label, multiple = false, ...props }) => {
    const handleSelect = (selectedOptions) => {
        const selectedValues = multiple
            ? selectedOptions.map(option => option.value)
            : selectedOptions.value;
        if (onSelect) {
            onSelect(selectedValues);
        }
    };

    return (
        <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">{label}</label>
            <div className="relative">
                <Select
                    {...props}
                    isMulti={multiple}
                    options={data}
                    onChange={handleSelect}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={{
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                        }),
                    }}
                />
            </div>
        </div>
    );
};

export default CustomSelect;
