import api from '@/services/instance';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SampleContext = createContext();

const SampleProvider = ({ children }) => {
    const [configSimilarity, setSimilarityConfig] = useState({
        // threshold: 0.5,
        min_term_freq: 1,
        max_query_terms: 25,
        min_doc_freq: 1,
        // max_doc_freq: 100,
        min_word_length: 0,
        // max_word_length: 0,
        // stop_words: []
    });
    const [samples, setSamples] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [similarityResults, setSimilarityResults] = useState([]);

    const handleSetConfigValue = (id, value) => {
        setSimilarityConfig((prevConfig) => ({
            ...prevConfig,
            [id]: value,
        }));
    };

    useEffect(() => {
        const fetchSimilarityResults = async () => {
            try {
                const response = await api.post('/search_engine/more-like-this', {
                    index: selectedIndex,
                    fields: selectedColumns,
                    doc_ids: samples,
                    ...configSimilarity,
                });

                setSimilarityResults(response.data);
            } catch (error) {
                setSimilarityResults(null);
                console.error('Error fetching similarity results:', error);
            }
        };

        if (selectedIndex !== null && selectedColumns.length > 0 && samples !== null) {
            fetchSimilarityResults();
        }
        console.log("FETCHING")
    }, [selectedIndex, selectedColumns, samples, configSimilarity]);

    return (
        <SampleContext.Provider value={{
            samples,
            setSamples,
            configSimilarity,
            setSimilarityConfig,
            selectedIndex,
            setSelectedIndex,
            selectedColumns,
            setSelectedColumns,
            similarityResults,
            setSimilarityResults,
            handleSetConfigValue
        }}>
            {children}
        </SampleContext.Provider>
    );
};

const useSamples = () => {
    const context = useContext(SampleContext)

    if (context === undefined) {
        throw new Error('useSample must be used within a SampleProvider')
    }

    return context
}

export { SampleContext, SampleProvider, useSamples };
