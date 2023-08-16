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

export function indicatorFilter(data: any, search: string, filteredData: any) {
  Object.keys(data).forEach((key) => {
    const filteredList: any = data[key].filter((item: any) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredList.length > 0) {
      filteredData[key] = filteredData[key].concat(filteredList);
    }
  });
}
