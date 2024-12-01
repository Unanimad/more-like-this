'use client';
import React from 'react';

const SimilarityConfig = ({ config, setConfigValue }) => {
    if (!config) {
        return null
    }

    const configFields = [
        // { id: 'threshold', label: 'Threshold', value: config.threshold, type: 'number', min: 0, max: 1, step: 0.01 },
        { id: 'min_term_freq', label: 'Min Term Frequency', value: config.min_term_freq, type: 'number', min: 1 },
        { id: 'max_query_terms', label: 'Max Query Terms', value: config.max_query_terms, type: 'number', min: 1 },
        { id: 'min_doc_freq', label: 'Min Document Frequency', value: config.min_doc_freq, type: 'number', min: 1 },
        // { id: 'max_doc_freq', label: 'Max Document Frequency', value: config.max_doc_freq, type: 'number', min: 1 },
        { id: 'min_word_length', label: 'Min Word Length', value: config.min_word_length, type: 'number', min: 0 },
        // { id: 'max_word_length', label: 'Max Word Length', value: config.max_word_length, type: 'number', min: 0 },
        // { id: 'stop_words', label: 'Stopwords (comma separated)', value: config.stop_words, type: 'text' }
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
