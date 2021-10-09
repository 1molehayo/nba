import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PdfReader = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ val }) => {
    setNumPages(val);
  };

  const goToPage = (dir) => {
    if (dir === 'next') {
      return setPageNumber(pageNumber + 1);
    }

    return setPageNumber(pageNumber - 1);
  };

  return (
    <div className="w-100">
      <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="d-flex align-items-center justify-content-between">
        <p>
          Page {pageNumber} of {numPages}
        </p>

        <div>
          <button
            disabled={pageNumber === 1}
            className="button button--primary mr-2"
            onClick={() => goToPage('prev')}
          >
            Prev
          </button>
          <button
            disabled={pageNumber === numPages}
            className="button button--primary"
            onClick={() => goToPage('next')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
