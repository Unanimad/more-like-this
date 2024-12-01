// useSimilarityConfig.js
import { useState } from 'react';

const useSimilarityConfig = () => {
  const [config, setConfig] = useState({
    // threshold: 0.5,
    min_term_freq: 1,
    max_query_terms: 25,
    min_doc_freq: 1,
    // max_doc_freq: 100,
    min_word_length: 0,
    // max_word_length: 0,
    // stop_words: []
  });

  return { config, setConfig };
};

export default useSimilarityConfig;
