import { downloadCsvFile } from './download-csv-file';
import { COLUMN_NAMES_ERROR } from './download-csv-file';
import * as downloadFileMod from './download-file';

describe('downloadCsvFile', () => {
  const downloadFileMock = vi.fn();
  vi.spyOn(downloadFileMod, 'downloadFile').mockImplementation(downloadFileMock);

  afterEach(() => {
    downloadFileMock.mockClear();
  });

  it('should generate a CSV file with the provided data', () => {
    const csvData = ['1,John,Doe', '2,Jane,Smith'];
    const fileName = 'data.csv';
    const columnNames = ['ID', 'First Name', 'Last Name'];

    downloadCsvFile(csvData, fileName, columnNames);

    expect(downloadFileMock).toHaveBeenCalledWith(
      'ID,First Name,Last Name\n1,John,Doe\n2,Jane,Smith',
      'data.csv',
      'text'
    );
  });

  it('should sanitize the filename for generated CSV file', () => {
    const csvData = ['1,John,Doe', '2,Jane,Smith'];
    const fileName = 'data\\data%data$data#data/data:data*data?data<data>data|data!data data';
    const columnNames = ['ID', 'First Name', 'Last Name'];

    downloadCsvFile(csvData, fileName, columnNames);

    expect(downloadFileMock).toHaveBeenCalledWith(
      'ID,First Name,Last Name\n1,John,Doe\n2,Jane,Smith',
      'data_data_data_data_data_data_data_data_data_data_data_data!data_data.csv',
      'text'
    );
  });

  it('should handle empty data', () => {
    const csvData: string[] = [];
    const fileName = 'data.csv';

    downloadCsvFile(csvData, fileName);

    expect(downloadFileMock).toHaveBeenCalledWith('', 'data.csv', 'text');
  });

  it('should handle data without column names', () => {
    const csvData = ['1,John,Doe', '2,Jane,Smith'];
    const fileName = 'data.csv';

    downloadCsvFile(csvData, fileName);

    expect(downloadFileMock).toHaveBeenCalledWith('1,John,Doe\n2,Jane,Smith', 'data.csv', 'text');
  });

  it('should handle data with incorrect column names', () => {
    const csvData = ['1,John,Doe', '2,Jane,Smith'];
    const fileName = 'data.csv';
    const columnNames = ['ID', 'First Name'];

    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(vi.fn());

    downloadCsvFile(csvData, fileName, columnNames);

    expect(consoleErrorMock).toHaveBeenCalledWith(COLUMN_NAMES_ERROR);
    expect(downloadFileMock).toHaveBeenCalledWith('1,John,Doe\n2,Jane,Smith', 'data.csv', 'text');
  });
});
