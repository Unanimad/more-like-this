import { useSamples } from "@/context/SampleContext";
import { useState } from 'react';
import cx from 'clsx';
import { ScrollArea, Table } from '@mantine/core';

const SimilarityResults = ({ data, columns }) => {
    const { selectedIndex, selectedColumns, similarityResults } = useSamples();
    const [scrolled, setScrolled] = useState(false);
    console.log('SimilarityResults:', data, columns);

    const hits = data && data.hits ? data.hits.hits : [];

    const parsedHits = hits.map(hit => {
        return columns.map(column => {
            const value = hit._source[column];
            console.log(typeof value === 'object' ? JSON.stringify(value) : { value, column });
            return typeof value === 'object' ? JSON.stringify(value) : { value, column };
        });
    });

    function formatString(input) {
        // Substitui os underscores por espaços
        let formatted = input.replace(/_/g, ' ');
        // Deixa apenas a primeira letra maiúscula
        formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
        return formatted;
    }

    const rows = parsedHits?.map((parsedHit, index) => (
        <Table.Tr key={index}>
            {parsedHit.map((value, colIndex) => (
                <Table.Td key={colIndex}>{value.value}</Table.Td>
            ))}
        </Table.Tr>
    ));

    return (
        <>
            {parsedHits.length > 0 && selectedIndex && selectedColumns && similarityResults && (

                <ScrollArea h={700} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                    <Table miw={700}>
                        <Table.Thead className={cx('header', { ['scrolled']: scrolled })}>
                            <Table.Tr>
                                {columns.map((value, colIndex) => (
                                    <>
                                        <Table.Th>{formatString(value)}</Table.Th>
                                    </>

                                ))}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </ScrollArea>
            )}
            {/* {parsedHits.length > 0 && selectedIndex && selectedColumns && similarityResults && (
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
            )} */}
        </>
    );
}

export default SimilarityResults;