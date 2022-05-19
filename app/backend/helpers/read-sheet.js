const XLSX = require('xlsx');
module.exports = (file) => {
  const workbook = XLSX.readFile(file);
  const sheet_name_list = workbook.SheetNames;
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
};
