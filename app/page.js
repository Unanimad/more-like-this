"use client";
import { useState, useEffect } from "react";
import LeftMenu from "@/components/LeftMenu";
import SimilarityConfig from "@/components/SimilarityConfig";
import useSimilarityConfig from "@/hooks/useSimilarityConfig";
import api from "@/services/instance";

export default function Home() {
  const { config: configSimilarity, setConfig: setSimilarityConfig } = useSimilarityConfig();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectSample, setSample] = useState([]);
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
          selectedIndex,
          selectedColumns,
          sample: selectSample,
          ...configSimilarity
        });
        setSimilarityResults(response.data);
      } catch (error) {
        console.error('Error fetching similarity results:', error);
      }
    };

    if (selectedIndex !== null && selectedColumns.length > 0 && selectSample.length > 0) {
      fetchSimilarityResults();
    }
  }, [selectedIndex, selectedColumns, selectSample, configSimilarity]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-grow gap-4">
        <div className="w-1/4">
          <LeftMenu isOpen={true} setSelectedIndex={setSelectedIndex}
            setSelectedColumns={setSelectedColumns} />
        </div>
        <div className="flex-2">
          <div>
            <SimilarityConfig
              selectedIndex={selectedIndex}
              selectedColumns={selectedColumns}
              sample={selectSample}
              config={configSimilarity}
              setConfigValue={handleSetConfigValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
