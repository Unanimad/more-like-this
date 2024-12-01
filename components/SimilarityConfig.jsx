'use client';
import React from 'react';

const SimilarityConfig = ({ config, setConfigValue }) => {
    if (!config) {
        return null
    }

    const configFields = [
        { id: 'threshold', label: 'Threshold', value: config.threshold, type: 'number', min: 0, max: 1, step: 0.01 },
        { id: 'maxResults', label: 'Max Results', value: config.maxResults, type: 'number', min: 1 },
        { id: 'minTermFreq', label: 'Min Term Frequency', value: config.minTermFreq, type: 'number', min: 1 },
        { id: 'maxQueryTerms', label: 'Max Query Terms', value: config.maxQueryTerms, type: 'number', min: 1 },
        { id: 'minDocFreq', label: 'Min Document Frequency', value: config.minDocFreq, type: 'number', min: 1 },
        { id: 'maxDocFreq', label: 'Max Document Frequency', value: config.maxDocFreq, type: 'number', min: 1 },
        { id: 'minWordLength', label: 'Min Word Length', value: config.minWordLength, type: 'number', min: 0 },
        { id: 'maxWordLength', label: 'Max Word Length', value: config.maxWordLength, type: 'number', min: 0 },
        { id: 'stopwords', label: 'Stopwords (comma separated)', value: config.stopwords, type: 'text' }
    ];

    return (
        <div className='p-2 shadow-md'>
            <h1 className="text-2xl font-bold mb-4">Similarity Configuration</h1>
            <div className="flex flex-wrap">
                {configFields.map(({ id, label, value, type, ...rest }) => (
                    <div key={id} className="mb-4 px-2 w-1/4">
                        <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}:</label>
                        <input
                            type={type}
                            id={id}
                            name={id}
                            value={value}
                            onChange={(e) => setConfigValue(id, type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                            className="w-full p-2 border rounded"
                            {...rest}
                        />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default SimilarityConfig;
