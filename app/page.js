"use client";
import { useState, useEffect } from "react";
import LeftMenu from "@/components/LeftMenu";
import SimilarityConfig from "@/components/SimilarityConfig";
import Samples from "@/components/Samples";
import SimilarityResults from "@/components/SimilarityResults";
import api from "@/services/instance";
import { useSamples } from "@/context/SampleContext";

export default function Home() {
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

  return (
    <div className="flex flex-col min-h-[82vh]">
      <div className="flex flex-row flex-grow gap-4">
        <div className="w-1/5">
          <LeftMenu />
        </div>
        <div className="flex-1 pr-9">
          <div className="flex flex-col">
            <div className="flex flex-row flex-grow gap-4">
              <div className="flex-auto mt-3">
                <Samples index={selectedIndex} columns={selectedColumns} />
              </div>

            </div>
            <div>
              <SimilarityResults data={similarityResults} columns={selectedColumns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
