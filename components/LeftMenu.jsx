"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import CustomSelect from './Select';
import { IoMenu, IoClose } from "react-icons/io5";
import api from '@/services/instance';

const LeftMenu = ({ isOpen: initialIsOpen, setSelectedIndex, setSelectedColumns }) => {
    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const [indices, setIndices] = useState([]);
    const [mappings, setMappings] = useState([]);

    const handleSelectColumns = (selectedOptions) => {
        setSelectedColumns(selectedOptions);
    };

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
        <div className={`${isOpen ? 'w-[19rem]' : 'max-w-[0]'} block transition-all duration-300 ease-in-out shadow-md fixed z-20 inset-0 left-[max(0px,calc(10%-45rem))] right-aut pb-10 bg-white`}>
            <div className='flex items-center justify-between p-2 pt-4'>
                <div className="text-xl font-bold pl-6" onClick={() => setIsOpen(!isOpen)}>
                    More-like-this
                </div>
                <div className='flex items-center'>
                    <button className='relative' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoClose size={30} /> : <></>}
                    </button>
                </div>
            </div>
            <div
                className={cn(
                    `overflow-hidden overflow-y-auto transition-all duration-300 ease-in-out h-full pt-10`
                )}
            >
                <div className='pl-8 pr-6 border-b-2'>
                    <h1 className="text-1xl font-bold">Search Engine</h1>
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

        </div>
    );
};

export default LeftMenu;
