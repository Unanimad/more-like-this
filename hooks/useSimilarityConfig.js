// hooks/useSimilarityConfig.js
import { useState } from 'react';

const useSimilarityConfig = () => {
  const [config, setConfig] = useState({
    threshold: 0.5,
    maxResults: 10,
    minTermFreq: 1,
    maxQueryTerms: 25,
    minDocFreq: 1,
    maxDocFreq: 100,
    minWordLength: 0,
    maxWordLength: 0,
    stopwords: ''
  });

  const setConfigValue = (key, value) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      [key]: value
    }));
  };

  return {
    config,
    setConfigValue
  };
};

export default useSimilarityConfig;
