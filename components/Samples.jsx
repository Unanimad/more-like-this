'use client';
import { useEffect, useState } from "react";
import CustomSelect from './Select';
import api from '@/services/instance';
import { useSamples } from "@/context/SampleContext";

const Samples = ({ index, columns }) => {
    const { setSamples } = useSamples();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchSamples = async () => {
            if (!index || !columns) {
                console.log('Index or columns not provided, skipping fetch.');
                return;
            }
            try {
                const response = await api.post('/search_engine/search', {
                    url_path: `${index}/_search`,
                    body: {
                        "_source": columns
                    }
                });

                const data = await response.data;
                const options = data.hits.hits.map(hit => ({
                    value: hit._id,
                    label: hit._source.nome
                }));
                console.log(options)
                setSamplesState(options);
            } catch (error) {
                console.error('Error fetching indices or performing search:', error);
            }
        };
        fetchSamples();
    }, [index, columns]);

    return (
        <div>
            <CustomSelect options={samples} />
        </div>
    );
};

export default Samples;
