"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import CustomSelect from './Select';
import { IoMenu, IoClose, IoChevronDownOutline } from "react-icons/io5";
import api from '@/services/instance';
import SimilarityConfig from './SimilarityConfig';
import { useSamples } from '@/context/SampleContext';
import SimilarityResults from './SimilarityResults';

const LeftMenu = () => {
    const {
        configSimilarity,
        setSimilarityConfig,
        samples,
        selectedIndex,
        setSelectedIndex,
        selectedColumns,
        setSelectedColumns,
        similarityResults,
        handleSetConfigValue,
    } = useSamples()
    const [isOpen, setIsOpen] = useState(true);
    const [indices, setIndices] = useState([]);
    const [mappings, setMappings] = useState([]);
    const [colapsed, setColapsed] = useState(false);

    const handleSelectColumns = (selectedOptions) => {
        setSelectedColumns(selectedOptions);
    };

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
        <div id="more-like-this" className={`${isOpen ? 'w-[19rem]' : 'max-w-[0]'} block transition-all duration-300 ease-in-out shadow-md fixed z-20 inset-0 left-[max(0px,calc(10%-45rem))] right-aut pb-10 bg-white`}>
            <div className='flex items-center justify-between p-2 pt-4  border-b-[1px]'>
                <div className="text-xl text-zinc-950 font-bold" onClick={() => setIsOpen(!isOpen)}>
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
                    `overflow-hidden overflow-y-auto transition-all duration-300 ease-in-out h-full pt-3`
                )}
            >
                <div className='px-2 border-b-[1px]'>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-1xl text-zinc-950 font-bold">Search Engine</h1>
                        <div className={`${colapsed ? '' : 'rotate-180'} rounded-full p-1 hover:bg-slate-600 hover:text-white cursor-pointer transition-all duration-100}`} onClick={() => setColapsed(!colapsed)}>
                            <IoChevronDownOutline size={23} />
                        </div>
                    </div>
                    <div className={`${colapsed ? 'max-h-full' : 'max-h-0 opacity-0'} pl-8 pr-6 transition-all duration-150`}>
                        <div>
                            <CustomSelect
                                isLoading={indices.length === 0}
                                onSelect={fetchIndexMapping}
                                data={indices}
                                label="Select an index"
                            />
                        </div>
                        <div>
                            <CustomSelect
                                isLoading={mappings.length === 0}
                                data={mappings.map(mapping => ({ value: mapping, label: mapping }))}
                                label="Select column(s)"
                                multiple={true}
                                onSelect={handleSelectColumns}
                            />
                            <SimilarityConfig
                                config={configSimilarity}
                                setConfigValue={handleSetConfigValue}
                            />
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default LeftMenu;
