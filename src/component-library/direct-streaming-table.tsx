import React, {useEffect, useRef, useState} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DirectStreamingTable = () => {
    const [data, setData] = useState<any[]>([]);
    const initialized = useRef(false)
    const columnDefs = [
        {headerName: "ID", field: "id"},
        {headerName: "Value", field: "value"},
    ]
    const gridRef = useRef<AgGridReact>(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/stream');

            if (!response.body) {
                throw new Error('ReadableStream not supported');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let partialData = ''; // Hold partial data between chunks

            const processStream = async () => {
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) {
                        console.log("Stream finished.");
                        break;
                    }

                    const chunk = decoder.decode(value, {stream: true});
                    partialData += chunk;

                    // Split on newline characters to process complete lines
                    const lines = partialData.split('\n');

                    // The last element might be a partial line, so save it
                    partialData = lines.pop() ?? '';

                    // Parse and add complete JSON lines
                    const parsedObjects = lines.map(line => JSON.parse(line));

                    gridRef.current?.api.applyTransaction({ add: parsedObjects });
                }

                // Process any remaining partial data after the stream ends
                if (partialData) {
                    try {
                        const parsedObject = JSON.parse(partialData);
                        gridRef.current?.api.applyTransaction({ add: [parsedObject] });
                    } catch (e) {
                        console.error("Failed to parse remaining partial data", e);
                    }
                }

                reader.releaseLock(); // Release the reader lock when done
            };

            await processStream();
        } catch (err) {

        }
    };

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            fetchData();
        }
    }, []);

    return (
        <div>
            <h1>Streaming Data</h1>
            <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={50}
                />
            </div>
        </div>
    );
};

export default DirectStreamingTable;