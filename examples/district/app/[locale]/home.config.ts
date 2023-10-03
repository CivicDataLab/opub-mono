export const availableDistricts = [
  {
    name: 'Morigaon',
    slug: 'morigaon',
  },
  {
    name: 'Nagaon',
    slug: 'nagaon',
  },
];

export const assamDistrictCategory = {
  barakValley: {
    name: 'Barak Valley',
    slug: 'barak-valley',
    districts: ['Cachar', 'Hailakandi', 'Karimganj'],
  },
  centralAssam: {
    name: 'Central Assam',
    slug: 'central-assam',
    districts: [
      'Dima Hasao',
      'East Karbi Anglong',
      'West Karbi Anglong',
      'Morigaon',
      'Nagaon',
    ],
  },
  lowerAssam: {
    name: 'Lower Assam',
    slug: 'lower-assam',
    districts: [
      'Baksa',
      'Barpeta',
      'Bongaigaon',
      'Chirang',
      'Dhubri',
      'Goalpara',
      'Nalbari',
      'Kamrup Metropolitan',
      'Kamrup Rural',
      'Kokrajhar',
      'South Salmara-Mankachar',
    ],
  },
  northAssam: {
    name: 'North Assam',
    slug: 'north-assam',
    districts: ['Darrang', 'Sonitpur', 'Udalguri'],
  },
  upperAssam: {
    name: 'Upper Assam',
    slug: 'upper-assam',
    districts: [
      'Charaideo',
      'Dhemaji',
      'Dibrugarh',
      'Golaghat',
      'Jorhat',
      'Lakhimpur',
      'Majuli',
      'Sivasagar',
      'Tinsukia',
    ],
  },
};

// create a filter function for assamDistrictCategory
export const filterDistricts = (text: string) => {
  const obj: any = { ...assamDistrictCategory };
  const filteredObj: any = {
    barakValley: {
      name: assamDistrictCategory.barakValley.name,
      slug: assamDistrictCategory.barakValley.slug,
    },
    centralAssam: {
      name: assamDistrictCategory.centralAssam.name,
      slug: assamDistrictCategory.centralAssam.slug,
    },
    lowerAssam: {
      name: assamDistrictCategory.lowerAssam.name,
      slug: assamDistrictCategory.lowerAssam.slug,
    },
    northAssam: {
      name: assamDistrictCategory.northAssam.name,
      slug: assamDistrictCategory.northAssam.slug,
    },
    upperAssam: {
      name: assamDistrictCategory.upperAssam.name,
      slug: assamDistrictCategory.upperAssam.slug,
    },
  };

  Object.keys(obj).forEach((key) => {
    const districts = obj[key].districts.filter((district: string) =>
      district.toLowerCase().includes(text.toLowerCase())
    );

    if (districts.length > 0) {
      filteredObj[key] = { ...obj[key], districts };
    } else {
      filteredObj[key].districts = [];
    }
  });

  return filteredObj;
};
