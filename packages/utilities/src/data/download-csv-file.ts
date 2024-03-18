import { downloadFile } from './download-file';

export const COLUMN_NAMES_ERROR = 'The number of column names provided does not match the number of data columns.';

/**
 * Download a CSV file with the provided data.
 *
 * If column names are provided, they will be included as the first row.
 */
export function downloadCsvFile(csvData: string[], fileName: string, columnNames?: string[]) {
  const normCsvData = [...csvData];
  let csvDataString = '';

  if (csvData.length) {
    if (columnNames && columnNames.length) {
      if (csvData[0] && columnNames.length !== csvData[0].split(',').length) {
        console.error(COLUMN_NAMES_ERROR);
      } else {
        normCsvData.unshift(columnNames.join(','));
      }
    }

    csvDataString = normCsvData.join('\n');
  }

  const csvFileName = sanitizeFileName(fileName);
  downloadFile(csvDataString, csvFileName, 'text');
}

//
//
// helpers
//
//

function sanitizeFileName(fileName: string) {
  //  /:*?"<>|
  let sanitizedFileName = fileName.replace(/[\\%$#/:*?"<>|\s]/g, '_');
  if (!sanitizedFileName.endsWith('.csv')) {
    sanitizedFileName += '.csv';
  }
  return sanitizedFileName.toLowerCase();
}
