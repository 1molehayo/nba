import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';
import PropTypes from 'prop-types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PdfReader = ({ url }) => {
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const goToPage = (dir) => {
    if (dir === 'next') {
      return setPageNumber(pageNumber + 1);
    }

    return setPageNumber(pageNumber - 1);
  };

  const Loading = (
    <div className="pt-8 pb-8 w-100">
      <p className="text-center mb-0">Loading Book!!</p>
    </div>
  );

  return (
    <div className="w-100">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={Loading}
      >
        <Page pageNumber={pageNumber} className="react-pdf" />
      </Document>

      <div className="d-flex align-items-center justify-content-between">
        <p>
          Page {pageNumber} of {totalPages}
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
            disabled={pageNumber === totalPages}
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

PdfReader.propTypes = {
  url: PropTypes.string
};

export default PdfReader;
