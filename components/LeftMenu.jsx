"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import CustomSelect from './Select';
import api from '@/services/instance';

const LeftMenu = ({ isOpen: initialIsOpen, setSelectedIndex, setSelectedColumns }) => {
    const handleSelectColumns = (selectedOptions) => {
        setSelectedColumns(selectedOptions);
    };

    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const [indices, setIndices] = useState([]);
    const [mappings, setMappings] = useState([]);

    useEffect(() => {
        setIsOpen(initialIsOpen);
    }, [initialIsOpen]);

    useEffect(() => {
        const fetchIndices = async () => {
            try {
                const response = await api.get('/search_engine/indices');
                const options = response.data.map(index => ({ value: index, label: index }));
                setIndices(options);
            } catch (error) {
                console.error('Error fetching indices:', error);
            }
        };
        fetchIndices();
    }, []);

    const fetchIndexMapping = async (selectedIndices) => {
        console.log('Selected indices:', selectedIndices);
        setSelectedIndex(selectedIndices);
        try {
            const response = await api.get('/search_engine/mappings', {
                params: { indices: selectedIndices }
            });
            const mappingsData = response.data;
            const extractedMappings = extractMappings(mappingsData);
            setMappings(extractedMappings);
        } catch (error) {
            console.error('Error fetching mappings:', error);
        }
    };

    const extractMappings = (mappingsData) => {
        const mappingsList = [];
        for (const index in mappingsData) {
            const properties = mappingsData[index][index].mappings.properties;
            for (const property in properties) {
                mappingsList.push(property);
            }
        }
        return mappingsList;
    };

    return (
        <div className='p-4 h-full max-w-[400px] shadow-md'>
            <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
            <div
                className={cn(
                    `${isOpen ? 'max-w-[400px]' : 'max-w-0'} overflow-hidden overflow-y-auto transition-all duration-300 ease-in-out h-full`
                )}
            >
                <div>
                    <CustomSelect
                        onSelect={fetchIndexMapping}
                        data={indices}
                        label="Select an index"
                    />
                </div>
                <div>
                    <CustomSelect
                        data={mappings.map(mapping => ({ value: mapping, label: mapping }))}
                        label="Select column(s)"
                        multiple={true}
                        onSelect={handleSelectColumns}
                    />
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;
