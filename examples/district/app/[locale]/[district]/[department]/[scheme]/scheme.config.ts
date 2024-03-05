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
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in array[i]) {
      if (line != '') line += ',';

      line += `"${array[i][index]}"`;
    }

    str += line + '\r\n';
  }

  return str;
}

export function exportCSVFile(headers: any, items: any[], fileTitle: string) {
  const itemsFormatted = [];

  // format the data
  items.forEach((item) => {
    itemsFormatted.push({
      ...item,
    });
  });

  if (headers) {
    const columnHeaders = headers.map((column: { header: any }) => {
      return `"${column.header}"`;
    });
    itemsFormatted.unshift(columnHeaders);
  }

  // Convert Object to JSON
  let jsonObject = JSON.stringify(itemsFormatted);

  let csv = convertToCSV(jsonObject);

  let exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    let link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob);
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

export function downloadTable(
  columns: {
    header: string;
  }[],
  items: {
    [key: string]: string;
  }[],
  fileTitle: string
) {
  // filter items data with column
  const filteredItems = items.map((item) => {
    const filteredItem: any = {};
    columns.forEach((column) => {
      filteredItem[column.header] = item[column.header];
    });
    return filteredItem;
  });

  exportCSVFile(columns, filteredItems, fileTitle);
}

export const downloadImage = (dataUri: string | undefined, name: string) => {
  if (!dataUri) {
    throw new Error('href is undefined');
  }
  const a = document.createElement('a');
  a.href = dataUri;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  navigateEnd();
};
