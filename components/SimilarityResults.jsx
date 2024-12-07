const SimilarityResults = ({ data, columns }) => {
    const hits = data && data.hits ? data.hits.hits : [];

    const parsedHits = hits.map(hit => {
        return columns.map(column => {
            const value = hit._source[column];
            return typeof value === 'object' ? JSON.stringify(value) : value;
        });
    });

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Results</h1>
            {parsedHits.map((parsedHit, index) => (
                <div key={index}>
                    {parsedHit.map((value, colIndex) => (
                        <p key={colIndex}>{value}</p>
                    ))}
                </div>
            ))}
        </>
    );
}

export default SimilarityResults;