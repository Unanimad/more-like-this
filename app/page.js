"use client";
import { useState, useEffect } from "react";
import LeftMenu from "@/components/LeftMenu";
import SimilarityConfig from "@/components/SimilarityConfig";
import Samples from "@/components/Samples";
import SimilarityResults from "@/components/SimilarityResults";
import useSimilarityConfig from "@/hooks/useSimilarityConfig";
import api from "@/services/instance";
import { useSamples } from "@/context/SampleContext";

export default function Home() {
  const { config: configSimilarity, setConfig: setSimilarityConfig } = useSimilarityConfig();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [similarityResults, setSimilarityResults] = useState([]);
  const { samples } = useSamples();

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
          samples: selectSamples,
          ...configSimilarity
        });
        setSimilarityResults(response.data);
      } catch (error) {
        console.error('Error fetching similarity results:', error);
      }
    };

    if (selectedIndex !== null && selectedColumns.length > 0 && selectSamples.length > 0) {
      fetchSimilarityResults();
    }
  }, [selectedIndex, selectedColumns, selectSamples, configSimilarity]);

  return (
    <div className="flex flex-col min-h-[82vh]">
      <div className="flex flex-row flex-grow gap-4">
        <div className="w-1/4">
          <LeftMenu isOpen={true} setSelectedIndex={setSelectedIndex}
            setSelectedColumns={setSelectedColumns} />
        </div>
        <div className="flex-2">
          <div>
            <SimilarityConfig
              config={configSimilarity}
              setConfigValue={handleSetConfigValue}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row flex-grow gap-4">
              <div className="flex-auto mt-3">
                <Samples index={selectedIndex} columns={selectedColumns} />
              </div>
              <div className="flex-auto">
                <SimilarityResults />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
