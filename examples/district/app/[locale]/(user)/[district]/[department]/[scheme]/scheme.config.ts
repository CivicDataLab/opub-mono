import { navigateEnd } from '@/lib/navigation';

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

export const schemes: {
  [key: string]: {
    title: string;
    logo: string;
  };
} = {
  mgnrega: {
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    logo: '/logo/mgnrega.webp',
  },
  nhm: {
    title: 'National Rural Health Mission (NHM)',
    logo: '/logo/nhm.png',
  },
  jjm: {
    title: 'Jal Jeevan Mission (JJM)',
    logo: '/logo/jjm.svg',
  },
};

// filter indicator data based on search
export function indicatorFilter(
  data: any,
  search: string,
  filteredDataObj: any
) {
  Object.keys(data).forEach((key) => {
    const filteredList: any = data[key].filter((item: any) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredList.length > 0) {
      filteredDataObj[key] = filteredDataObj[key].concat(filteredList);
    }
  });
}

function convertToCSV(objArray: string) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}

export function exportCSVFile(headers: any, items: any[], fileTitle: string) {
  if (headers) {
    const columnHeaders = headers.map(
      (column: { header: any }) => column.header
    );
    items.unshift(columnHeaders);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      navigateEnd();
    }
  }
}
