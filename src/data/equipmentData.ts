import { Product, IndustrySolution, ShimgeSeries, ShimgeCategoryType } from '../types';

export const SHIMGE_CATEGORIES_INFO: { id: ShimgeCategoryType; name: string; desc: string; icon: string }[] = [
  { 
    id: 'multistage-vertical', 
    name: 'Многоступенчатые насосы', 
    desc: 'Вертикальные (BLT/BLTE) и горизонтальные (BW/BWJ) насосы из нержавеющей стали AISI 304/316 для повышения давления и обратного осмоса.',
    icon: 'Layers'
  },
  { 
    id: 'submersible-wells', 
    name: 'Скважинные и глубинные насосы', 
    desc: 'Погружные скважинные насосы 4SGm, 3SGm, 6SG, 200QJ и QDX с плавающими колесами PPO, устойчивыми к песку.',
    icon: 'Droplets'
  },
  { 
    id: 'drainage-sewage', 
    name: 'Канализационные и фекальные насосы', 
    desc: 'Тяжелые чугунные насосы WQ/WQD, модели с режущим механизмом Z-CUT и нержавеющие насосы WVSD для КНС и септиков.',
    icon: 'Waves'
  },
  { 
    id: 'circulation-hvac', 
    name: 'Циркуляционные насосы отопления', 
    desc: 'Инверторные насосы APM SMART класса А с авторегулировкой, 3-скоростные XPS и инлайн-насосы TD для котельных.',
    icon: 'Flame'
  },
  { 
    id: 'surface-centrifugal', 
    name: 'Поверхностные и самовсасывающие', 
    desc: 'Центробежные CPM, вихревые QB, эжекторные SGJW (Jet) и высокопроизводительные SHF для водоснабжения и полива.',
    icon: 'Gauge'
  },
  { 
    id: 'intelligent-booster', 
    name: 'Интеллектуальные насосные станции', 
    desc: 'Автоматические самовсасывающие станции PZ с микропроцессорным управлением и инверторные установки BWJ-IVR.',
    icon: 'Cpu'
  }
];

export const SHIMGE_SERIES_LIST: { id: ShimgeSeries; name: string; desc: string; category: ShimgeCategoryType }[] = [
  { id: 'BLT', name: 'Серия BLT / BLTE', desc: 'Вертикальные многоступенчатые насосы из нержавеющей стали AISI 304/316 (напор до 300 м)', category: 'multistage-vertical' },
  { id: '4SGm', name: 'Серия 4SGm / 4SGP', desc: '4-дюймовые скважинные глубинные насосы с плавающими колесами PPO (пескостойкие)', category: 'submersible-wells' },
  { id: '6SG', name: 'Серия 6SG / 200QJ', desc: 'Промышленные глубинные насосы для артезианских скважин и систем агрополива', category: 'submersible-wells' },
  { id: 'WQ', name: 'Серия WQ / WQD (CUT)', desc: 'Погружные чугунные фекальные насосы с режущим ножом Z-Cut для канализации и КНС', category: 'drainage-sewage' },
  { id: 'APM', name: 'Серия APM SMART', desc: 'Энергосберегающие инверторные циркуляционные насосы класса А с режимом Auto-Adapt', category: 'circulation-hvac' },
  { id: 'XPS', name: 'Серия XPS / XP', desc: 'Классические 3-скоростные циркуляционные насосы с мокрым ротором для отопления', category: 'circulation-hvac' },
  { id: 'BWJ', name: 'Серия BWJ / BWJE', desc: 'Горизонтальные многоступенчатые инверторные насосные станции постоянного давления', category: 'intelligent-booster' },
  { id: 'PZ', name: 'Серия PZ / PZ-B', desc: 'Умные самовсасывающие насосные станции с электронным контроллером давления', category: 'intelligent-booster' },
  { id: 'CPM', name: 'Серия CPM / CP', desc: 'Центробежные насосы с медной обмоткой и латунным рабочим колесом', category: 'surface-centrifugal' },
  { id: 'QDX', name: 'Серия QDX / QX', desc: 'Погружные дренажные насосы для чистой воды с поплавковым выключателем', category: 'drainage-sewage' },
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. МНОГОСТУПЕНЧАТЫЕ НАСОСЫ (BLT, BLTE, BWJ)
  // ==========================================
  {
    id: 'shimge-blt-16-8',
    sku: 'BLT-16-8-11KW',
    name: 'Вертикальный многоступенчатый насос SHIMGE BLT 16-8 (AISI 304)',
    series: 'BLT',
    category: 'multistage-vertical',
    categoryName: 'Многоступенчатые насосы',
    subCategory: 'Для высотных зданий и водоканалов',
    brand: 'SHIMGE',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-22-36-552393-238ee32a0a85c96fad061c7123a0b9c7.webp?_=ozauc',
    description: 'Флагманский вертикальный многоступенчатый центробежный насос из нержавеющей стали AISI 304. Применяется в станциях повышения давления жилых комплексов, установках обратного осмоса и на промышленных предприятиях.',
    inStock: true,
    stockCount: 14,
    deliveryDays: 1,
    warrantyYears: 3,
    powerKw: 11.0,
    headMeters: 110,
    flowRate: 16.0,
    maxPressureBar: 25,
    pipeDiameterInch: 'DN50 (2")',
    casingMaterial: 'Нержавеющая сталь AISI 304',
    impellerMaterial: 'Нержавеющая сталь AISI 304',
    liquidTempRange: '-15°C ~ +120°C',
    protectionClass: 'IP55',
    isolationClass: 'Class F',
    priceOnRequest: false,
    estimatedPrice: '22 500 000 сум',
    industries: ['water-supply', 'industry', 'hvac'],
    qhCurve: [
      { q: 8, h: 128 },
      { q: 12, h: 120 },
      { q: 16, h: 110 },
      { q: 20, h: 96 },
      { q: 22, h: 84 },
    ],
    specs: [
      { name: 'Номинальная подача Q', value: '16.0', unit: 'м³/ч', isKey: true },
      { name: 'Номинальный напор H', value: '110', unit: 'м', isKey: true },
      { name: 'Мощность электродвигателя P2', value: '11.0', unit: 'кВт', isKey: true },
      { name: 'Электропитание', value: '380 В (3 фазы, 50 Гц)' },
      { name: 'Класс энергоэффективности', value: 'IE3 Premium', isKey: true },
      { name: 'Максимальное рабочее давление', value: '25', unit: 'бар' },
      { name: 'Материал проточной части', value: 'Нержавеющая сталь AISI 304' }
    ],
    documents: [
      { title: 'Технический паспорт SHIMGE BLT', size: '4.8 МБ', type: 'PDF' },
      { title: 'Габаритный чертеж STEP/DWG', size: '2.1 МБ', type: 'CAD' },
      { title: 'Сертификат соответствия O\'zStandart / EAC', size: '1.2 МБ', type: 'PDF' }
    ]
  },
  {
    id: 'shimge-blt-32-5',
    sku: 'BLT-32-5-15KW',
    name: 'Вертикальный многоступенчатый насос SHIMGE BLT 32-5 (AISI 304)',
    series: 'BLT',
    category: 'multistage-vertical',
    categoryName: 'Многоступенчатые насосы',
    subCategory: 'Магистральное водоснабжение',
    brand: 'SHIMGE',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-24-21-514200-cc0240c9804a7478568ff5b7ac3ccb5a.webp?_=ozauc',
    description: 'Высокопроизводительный насос для магистральных водопроводных сетей, крупных производств, систем охлаждения и систем пожаротушения.',
    inStock: true,
    stockCount: 8,
    deliveryDays: 1,
    warrantyYears: 3,
    powerKw: 15.0,
    headMeters: 75,
    flowRate: 32.0,
    maxPressureBar: 25,
    pipeDiameterInch: 'DN65 (2 1/2")',
    casingMaterial: 'Нержавеющая сталь AISI 304',
    impellerMaterial: 'AISI 304',
    liquidTempRange: '-15°C ~ +120°C',
    protectionClass: 'IP55',
    isolationClass: 'Class F',
    priceOnRequest: false,
    estimatedPrice: '29 800 000 сум',
    industries: ['water-supply', 'industry'],
    specs: [
      { name: 'Подача Q', value: '32.0', unit: 'м³/ч', isKey: true },
      { name: 'Напор H', value: '75', unit: 'м', isKey: true },
      { name: 'Мощность P2', value: '15.0', unit: 'кВт', isKey: true },
      { name: 'Фланцы', value: 'DN65 DIN/ГОСТ' }
    ]
  },
  {
    id: 'shimge-blt-4-12',
    sku: 'BLT-4-12-3KW',
    name: 'Вертикальный насос высокого давления SHIMGE BLT 4-12',
    series: 'BLT',
    category: 'multistage-vertical',
    categoryName: 'Многоступенчатые насосы',
    subCategory: 'Для водоочистки и обратного осмоса',
    brand: 'SHIMGE',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-23-35-215098-37c9657003b809e4b62def8bee7409e5.webp?_=ozauc',
    description: 'Насос высокого давления для коммерческих и промышленных станций водоподготовки, мембран обратного осмоса (RO) и моек высокого давления.',
    inStock: true,
    stockCount: 22,
    deliveryDays: 1,
    warrantyYears: 3,
    powerKw: 3.0,
    headMeters: 114,
    flowRate: 4.0,
    maxPressureBar: 20,
    pipeDiameterInch: 'DN32 (1 1/4")',
    casingMaterial: 'Нержавеющая сталь AISI 304',
    impellerMaterial: 'AISI 304',
    liquidTempRange: '-15°C ~ +120°C',
    protectionClass: 'IP55',
    isolationClass: 'Class F',
    priceOnRequest: false,
    estimatedPrice: '9 490 000 сум',
    industries: ['industry', 'water-supply'],
    specs: [
      { name: 'Подача Q', value: '4.0', unit: 'м³/ч', isKey: true },
      { name: 'Напор H', value: '114', unit: 'м', isKey: true },
      { name: 'Мощность P2', value: '3.0', unit: 'кВт', isKey: true }
    ]
  },

  // ==========================================
  // 2. СКВАЖИННЫЕ И ГЛУБИННЫЕ (4SGm, 6SG, 200QJ, QDX)
  // ==========================================
  {
    id: 'shimge-4sgm-4-18',
    sku: '4SGM-4-18-1.5KW',
    name: 'Скважинный глубинный насос SHIMGE 4SGm 4/18 (4 дюйма)',
    series: '4SGm',
    category: 'submersible-wells',
    categoryName: 'Скважинные и глубинные насосы',
    subCategory: 'Для частных домов и полива',
    brand: 'SHIMGE',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/06/24/2023-06-24-12-23-22-188062-b3b0f41c79048ada0fc9ef2d77f23d15.webp?_=ozauc',
    description: 'Оригинальный 4-дюймовый скважинный насос SHIMGE с плавающими рабочими колесами из высокопрочного полимера PPO. Устойчив к содержанию песка до 150 г/м³.',
    inStock: true,
    stockCount: 45,
    deliveryDays: 1,
    warrantyYears: 3,
    powerKw: 1.5,
    headMeters: 135,
    flowRate: 6.0,
    pipeDiameterInch: '1 1/4" (32 мм)',
    casingMaterial: 'Нержавеющая сталь AISI 304',
    impellerMaterial: 'PPO (Норил, стойкий к песку)',
    liquidTempRange: 'до +35°C',
    protectionClass: 'IP68',
    isolationClass: 'Class B',
    priceOnRequest: false,
    estimatedPrice: '3 650 000 сум',
    industries: ['agriculture', 'water-supply'],
    qhCurve: [
      { q: 1.2, h: 135 },
      { q: 2.4, h: 122 },
      { q: 3.6, h: 104 },
      { q: 4.8, h: 82 },
      { q: 6.0, h: 54 }
    ],
    specs: [
      { name: 'Максимальный напор H', value: '135', unit: 'м', isKey: true },
      { name: 'Максимальная подача Q', value: '6.0', unit: 'м³/ч', isKey: true },
      { name: 'Мощность двигателя', value: '1.5', unit: 'кВт', isKey: true },
      { name: 'Стойкость к песку', value: 'до 150 г/м³' }
    ]
  },
  {
    id: 'shimge-200qj-25-70',
    sku: '200QJ-25-70-7.5KW',
    name: 'Промышленный скважинный насос SHIMGE 200QJ 25-70 (8 дюймов)',
    series: '6SG',
    category: 'submersible-wells',
    categoryName: 'Скважинные и глубинные насосы',
    subCategory: 'Для артезианских скважин и агрополива',
    brand: 'SHIMGE',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/06/24/2023-06-24-12-29-19-652348-b3d1372860d0afb88d3509a2629871f9.webp?_=ozauc',
    description: 'Высокопроизводительный артезианский насос для подъема воды с большой глубины. Идеальное решение для систем капельного орошения хлопковых полей, садов и районных водоканалов.',
    inStock: true,
    stockCount: 16,
    deliveryDays: 1,
    warrantyYears: 3,
    powerKw: 7.5,
    headMeters: 70,
    flowRate: 25.0,
    pipeDiameterInch: '3" (80 мм)',
    casingMaterial: 'Нержавеющая сталь AISI 304',
    impellerMaterial: 'AISI 304',
    liquidTempRange: 'до +35°C',
    protectionClass: 'IP68',
    isolationClass: 'Class F',
    priceOnRequest: false,
    estimatedPrice: '8 520 000 сум',
    industries: ['agriculture', 'water-supply'],
    specs: [
      { name: 'Подача Q', value: '25.0', unit: 'м³/ч', isKey: true },
      { name: 'Максимальный напор H', value: '70', unit: 'м', isKey: true },
      { name: 'Мощность двигателя', value: '7.5', unit: 'кВт', isKey: true },
      { name: 'Диаметр скважины', value: '8" (200 мм)', isKey: true }
    ]
  },
  {
    id: 'shimge-qdx-1.5-32',
    sku: 'QDX-1.5-32-0.75',
    name: 'Погружной дренажный насос SHIMGE QDX 1.5-32-0.75',
    series: 'QDX',
    category: 'submersible-wells',
    categoryName: 'Скважинные и глубинные насосы',
    subCategory: 'Для резервуаров и колодцев',
    brand: 'SHIMGE',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/06/24/2023-06-24-12-16-13-867669-6deeb62ed32f098f432419b35c442700.webp?_=ozauc',
    description: 'Компактный погружной насос для откачки чистой воды из колодцев, емкостей, бассейнов и подвалов. Оснащен поплавковым выключателем.',
    inStock: true,
    stockCount: 40,
    deliveryDays: 1,
    warrantyYears: 2,
    powerKw: 0.75,
    headMeters: 33,
    flowRate: 5.0,
    pipeDiameterInch: '1" (25 мм)',
    casingMaterial: 'Высокопрочный чугун HT200',
    impellerMaterial: 'Латунь',
    liquidTempRange: 'до +40°C',
    protectionClass: 'IP68',
    isolationClass: 'Class B',
    priceOnRequest: false,
    estimatedPrice: '1 850 000 сум',
    industries: ['water-supply', 'agriculture'],
    specs: [
      { name: 'Напор H', value: '33', unit: 'м', isKey: true },
      { name: 'Подача', value: '5.0', unit: 'м³/ч', isKey: true },
      { name: 'Автоматика', value: 'Поплавковый выключатель' }
    ]
  },

  // ==========================================
  // 3. КАНАЛИЗАЦИОННЫЕ И ФЕКАЛЬНЫЕ (WQ, WQD CUT)
  // ==========================================
  {
    id: 'shimge-wq-50-15-4',
    sku: '50WQ-15-15-4KW',
    name: 'Погружной канализационный насос SHIMGE 50WQ15-15-4',
    series: 'WQ',
    category: 'drainage-sewage',
    categoryName: 'Канализационные и фекальные насосы',
    subCategory: 'Для станций КНС и предприятий',
    brand: 'SHIMGE',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    description: 'Тяжелый чугунный погружной насос для перекачки сильнозагрязненных сточных вод, шлама и стоков с твердыми включениями на промышленных КНС.',
    inStock: true,
    stockCount: 20,
    deliveryDays: 1,
    warrantyYears: 2,
    powerKw: 4.0,
    headMeters: 15,
    flowRate: 35.0,
    pipeDiameterInch: 'DN50 (2")',
    casingMaterial: 'Высокопрочный чугун HT200',
    impellerMaterial: 'Чугун HT200',
    liquidTempRange: 'до +40°C',
    protectionClass: 'IP68',
    isolationClass: 'Class B',
    priceOnRequest: false,
    estimatedPrice: '7 850 000 сум',
    industries: ['sewage', 'industry'],
    specs: [
      { name: 'Подача Q', value: '35.0', unit: 'м³/ч', isKey: true },
      { name: 'Напор H', value: '15.0', unit: 'м', isKey: true },
      { name: 'Мощность', value: '4.0', unit: 'кВт', isKey: true },
      { name: 'Проход частиц', value: 'до 35 мм' }
    ]
  },
  {
    id: 'shimge-wqd-10-10',
    sku: 'WQD-10-10-0.75',
    name: 'Фекальный насос с режущим ножом SHIMGE WQD 10-10 CUT (Z-Cut)',
    series: 'WQ',
    category: 'drainage-sewage',
    categoryName: 'Канализационные и фекальные насосы',
    subCategory: 'С измельчителем (Z-Cut карбид вольфрама)',
    brand: 'SHIMGE',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
    description: 'Фекальный насос с измельчителем из карбида вольфрама. Эффективно перемалывает волокнистые включения, бытовые отходы и предотвращает засор труб септика.',
    inStock: true,
    stockCount: 35,
    deliveryDays: 1,
    warrantyYears: 2,
    powerKw: 0.75,
    headMeters: 14,
    flowRate: 16.0,
    pipeDiameterInch: '2" (50 мм)',
    casingMaterial: 'Высокопрочный чугун HT200',
    impellerMaterial: 'Чугун HT200',
    liquidTempRange: 'до +40°C',
    protectionClass: 'IP68',
    isolationClass: 'Class B',
    priceOnRequest: false,
    estimatedPrice: '2 750 000 сум',
    industries: ['sewage', 'water-supply'],
    specs: [
      { name: 'Подача Q', value: '16.0', unit: 'м³/ч', isKey: true },
      { name: 'Максимальный напор', value: '14.0', unit: 'м', isKey: true },
      { name: 'Мощность', value: '0.75', unit: 'кВт', isKey: true },
      { name: 'Измельчитель', value: 'Нож Z-Cut из вольфрамового сплава' }
    ]
  },

  // ==========================================
  // 4. ЦИРКУЛЯЦИОННЫЕ ДЛЯ ОТОПЛЕНИЯ (APM, XPS)
  // ==========================================
  {
    id: 'shimge-apm-25-6',
    sku: 'APM-25-6-180-SMART',
    name: 'Энергосберегающий циркуляционный насос SHIMGE APM 25-6/180 Smart',
    series: 'APM',
    category: 'circulation-hvac',
    categoryName: 'Циркуляционные насосы отопления',
    subCategory: 'Класс А с частотным регулированием',
    brand: 'SHIMGE',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Интеллектуальный циркуляционный насос с электронным управлением для систем отопления, радиаторов и теплого пола. Экономит до 80% электроэнергии за счет алгоритма Auto-Adapt.',
    inStock: true,
    stockCount: 80,
    deliveryDays: 1,
    warrantyYears: 3,
    powerKw: 0.045,
    headMeters: 6.0,
    flowRate: 3.2,
    maxPressureBar: 10,
    pipeDiameterInch: 'G 1 1/2" (180 мм)',
    casingMaterial: 'Высокопрочный чугун HT200',
    impellerMaterial: 'PPO (Норил)',
    liquidTempRange: '+2°C ~ +110°C',
    protectionClass: 'IP44',
    isolationClass: 'Class H',
    priceOnRequest: false,
    estimatedPrice: '1 250 000 сум',
    industries: ['hvac'],
    specs: [
      { name: 'Класс энергоэффективности', value: 'Класс А (EEI ≤ 0.20)', isKey: true },
      { name: 'Потребляемая мощность', value: '5 – 45 Вт', isKey: true },
      { name: 'Максимальный напор', value: '6.0 м', isKey: true },
      { name: 'Режимы работы', value: 'Auto-Adapt, Ночной режим, Постоянный перепад' }
    ]
  },
  {
    id: 'shimge-xps-32-8',
    sku: 'XPS-32-8-180',
    name: '3-скоростной циркуляционный насос SHIMGE XPS 32-8/180',
    series: 'XPS',
    category: 'circulation-hvac',
    categoryName: 'Циркуляционные насосы отопления',
    subCategory: 'Классический насос с мокрым ротором',
    brand: 'SHIMGE',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Надежный 3-скоростной циркуляционный насос для котельных, закрытых систем отопления и кондиционирования.',
    inStock: true,
    stockCount: 60,
    deliveryDays: 1,
    warrantyYears: 2,
    powerKw: 0.24,
    headMeters: 8.0,
    flowRate: 8.5,
    maxPressureBar: 10,
    pipeDiameterInch: 'G 2" (180 мм)',
    casingMaterial: 'Высокопрочный чугун HT200',
    impellerMaterial: 'PPO (Норил)',
    liquidTempRange: '-10°C ~ +110°C',
    protectionClass: 'IP44',
    isolationClass: 'Class H',
    priceOnRequest: false,
    estimatedPrice: '980 000 сум',
    industries: ['hvac'],
    specs: [
      { name: 'Подача Q', value: '8.5 м³/ч', isKey: true },
      { name: 'Напор H', value: '8.0 м', isKey: true },
      { name: '3 скорости', value: '135 / 190 / 245 Вт' }
    ]
  },

  // ==========================================
  // 5. ИНТЕЛЛЕКТУАЛЬНЫЕ СТАНЦИИ (BWJ, PZ)
  // ==========================================
  {
    id: 'shimge-bwj-4-4',
    sku: 'BWJ-4-4-INVERTER',
    name: 'Инверторная насосная станция SHIMGE BL2-11*2 (AISI 304)',
    series: 'BWJ',
    category: 'intelligent-booster',
    categoryName: 'Интеллектуальные насосные станции',
    subCategory: 'Ультратихая станция постоянного давления',
    brand: 'SHIMGE',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-28-08-366376-f75bc39f30341d9cea2de7d8adf6928d.webp?_=ozauc',
    description: 'Инверторная насосная установка постоянного давления. Обеспечивает бесшумную работу (<48 дБ) и комфортное водоснабжение коттеджей и многоквартирных домов.',
    inStock: true,
    stockCount: 18,
    deliveryDays: 1,
    warrantyYears: 3,
    powerKw: 2.2,
    headMeters: 55,
    flowRate: 8.0,
    maxPressureBar: 16,
    pipeDiameterInch: 'DN40 x DN40',
    casingMaterial: 'Нержавеющая сталь AISI 304',
    impellerMaterial: 'AISI 304',
    liquidTempRange: '0°C ~ +70°C',
    protectionClass: 'IP55',
    isolationClass: 'Class F',
    priceOnRequest: false,
    estimatedPrice: '14 500 000 сум',
    industries: ['water-supply', 'industry'],
    specs: [
      { name: 'Инверторное управление', value: 'Постоянное давление (IVR)', isKey: true },
      { name: 'Подача', value: '8.0 м³/ч', isKey: true },
      { name: 'Максимальный напор', value: '55 м', isKey: true },
      { name: 'Уровень шума', value: '< 48 дБ (ультратихий)' }
    ]
  },
  {
    id: 'shimge-pz-370',
    sku: 'PZ-370-SMART',
    name: 'Автоматическая самовсасывающая станция SHIMGE PZ 370',
    series: 'PZ',
    category: 'intelligent-booster',
    categoryName: 'Интеллектуальные насосные станции',
    subCategory: 'С электронным контроллером давления',
    brand: 'SHIMGE',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    description: 'Компактная автоматическая насосная станция с датчиком протока, гидроаккумулятором и защитой от сухого хода. Автоматически включается при открытии крана.',
    inStock: true,
    stockCount: 50,
    deliveryDays: 1,
    warrantyYears: 2,
    powerKw: 0.37,
    headMeters: 38,
    flowRate: 2.6,
    maxPressureBar: 6,
    pipeDiameterInch: '1" x 1"',
    casingMaterial: 'Высокопрочный чугун HT200',
    impellerMaterial: 'Латунь',
    liquidTempRange: 'до +60°C',
    protectionClass: 'IP44',
    isolationClass: 'Class B',
    priceOnRequest: false,
    estimatedPrice: '2 150 000 сум',
    industries: ['water-supply'],
    specs: [
      { name: 'Мощность', value: '0.37 кВт', isKey: true },
      { name: 'Максимальный напор', value: '38 м', isKey: true },
      { name: 'Подача', value: '2.6 м³/ч', isKey: true },
      { name: 'Защита', value: 'От сухого хода и заклинивания' }
    ]
  },

  // ==========================================
  // 6. ПОВЕРХНОСТНЫЕ И САМОВСАСЫВАЮЩИЕ (CPM, QB, JET)
  // ==========================================
  {
    id: 'shimge-cpm-158',
    sku: 'CPM-158-0.75KW',
    name: 'Поверхностный центробежный насос SHIMGE CPM 158',
    series: 'CPM',
    category: 'surface-centrifugal',
    categoryName: 'Поверхностные и самовсасывающие',
    subCategory: 'Для сада, полива и водопровода',
    brand: 'SHIMGE',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Классический центробежный насос с медной обмоткой, латунным рабочим колесом и антикоррозийным катафорезным покрытием корпуса.',
    inStock: true,
    stockCount: 75,
    deliveryDays: 1,
    warrantyYears: 2,
    powerKw: 0.75,
    headMeters: 32,
    flowRate: 6.6,
    maxPressureBar: 6,
    pipeDiameterInch: '1" x 1"',
    casingMaterial: 'Высокопрочный чугун HT200',
    impellerMaterial: 'Латунь',
    liquidTempRange: 'до +40°C',
    protectionClass: 'IP44',
    isolationClass: 'Class B',
    priceOnRequest: false,
    estimatedPrice: '1 650 000 сум',
    industries: ['water-supply', 'agriculture'],
    specs: [
      { name: 'Подача Q', value: '6.6 м³/ч', isKey: true },
      { name: 'Напор H', value: '32 м', isKey: true },
      { name: 'Мощность', value: '0.75 кВт', isKey: true },
      { name: 'Материал колеса', value: 'Латунь' }
    ]
  }
];

export const SHIMGE_INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'water-supply',
    name: 'Городское водоснабжение и ЖКХ',
    title: 'Насосные станции для жилых комплексов и высотных зданий',
    subtitle: 'Повышение давления на базе многоступенчатых насосов BLT и станций BWJ.',
    icon: 'Building2',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-28-08-366376-f75bc39f30341d9cea2de7d8adf6928d.webp?_=ozauc',
    description: 'Обеспечение стабильного давления чистой питьевой воды на верхних этажах новостроек в Ташкенте и регионах Узбекистана.',
    challenges: [
      'Пиковые нагрузки водопотребления утром и вечером',
      'Требования к санитарной чистоте питьевой воды (AISI 304)',
      'Экономия электроэнергии (двигатели IE3)'
    ],
    recommendedSeries: ['BLT', 'BWJ', '4SGm'],
    standardBundles: [
      {
        title: 'Станция на 2–3 насосах BLT для многоэтажных домов',
        level: 'Оптимальный',
        targetTasks: 'Создание давления до 16 бар в зданиях от 16 до 25 этажей.',
        equipment: ['Каскад насосов SHIMGE BLT 16', 'Шкаф управления с частотным приводом', 'Коллекторы из AISI 304'],
        description: 'Экономит до 35% электроэнергии, плавный пуск без гидроударов.'
      }
    ],
    recommendedProductIds: ['shimge-blt-16-8', 'shimge-blt-32-5', 'shimge-bwj-4-4'],
    caseStudy: {
      client: 'ЖК «Tashkent City»',
      location: 'г. Ташкент',
      task: 'Обеспечение стабильного водоснабжения 18-этажного здания.',
      solution: 'Установлена станция из 3 насосов SHIMGE BLT 16-8 с частотным регулированием.',
      result: 'Стабильное давление 5.8 бар на 18-м этаже, энергопотребление снизилось на 28%.'
    }
  },
  {
    id: 'agriculture',
    name: 'Сельское хозяйство и капельный полив',
    title: 'Насосы для артезианских скважин и систем орошения',
    subtitle: 'Скважинные насосы 4SGm, 6SG и 200QJ с защитой от песка.',
    icon: 'Wheat',
    image: 'https://files.glotr.uz/company/000/027/167/products/2023/06/24/2023-06-24-12-29-19-652348-b3d1372860d0afb88d3509a2629871f9.webp?_=ozauc',
    description: 'Орошение тепличных хозяйств, интенсивных садов и хлопковых полей водой из глубоких артезианских скважин.',
    challenges: [
      'Наличие песка и взвесей в скважинной воде',
      'Бесперебойная работа в режиме 24/7 в летний сезон',
      'Поддержание высокого напора на больших площадях'
    ],
    recommendedSeries: ['4SGm', '6SG', 'CPM'],
    standardBundles: [
      {
        title: 'Узел артезианского полива для садов',
        level: 'Базовый',
        targetTasks: 'Подъем воды с глубины 70–120 метров и подача в магистраль.',
        equipment: ['Скважинный насос SHIMGE 200QJ / 4SGm', 'Пульт защиты от сухого хода', 'Трос из нержавеющей стали'],
        description: 'Плавающие колеса PPO устойчивы к абразивному износу от песка.'
      }
    ],
    recommendedProductIds: ['shimge-200qj-25-70', 'shimge-4sgm-4-18', 'shimge-cpm-158'],
    caseStudy: {
      client: 'Агрофирма «Самаркандские Сады»',
      location: 'Самаркандская область',
      task: 'Капельный полив 50 гектаров интенсивного яблоневого сада.',
      solution: 'Установлены 4 насоса SHIMGE 200QJ-25-70.',
      result: '3 года надежной непрерывной работы без поломок от песка.'
    }
  },
  {
    id: 'hvac',
    name: 'Отопление и котельные (HVAC)',
    title: 'Энергосберегающие циркуляционные насосы',
    subtitle: 'Умные насосы серий APM SMART и XPS для котельных.',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    description: 'Эффективная циркуляция теплоносителя в системах отопления жилых и производственных помещений.',
    challenges: [
      'Высокое энергопотребление устаревших насосов',
      'Шум в трубах и радиаторах',
      'Высокая температура теплоносителя до +110°C'
    ],
    recommendedSeries: ['APM', 'XPS'],
    standardBundles: [
      {
        title: 'Узел циркуляции умной котельной',
        level: 'Интеллектуальный',
        targetTasks: 'Автоматическая регулировка скорости для радиаторов и теплого пола.',
        equipment: ['Насос SHIMGE APM 25-6 Smart', 'Теплоизоляционный кожух', 'Монтажные гайки'],
        description: 'Режим Auto-Adapt снижает энергопотребление до 5–45 Вт.'
      }
    ],
    recommendedProductIds: ['shimge-apm-25-6', 'shimge-xps-32-8'],
    caseStudy: {
      client: 'Гостиница «Silk Road»',
      location: 'г. Бухара',
      task: 'Снижение расходов на электроэнергию и устранение шума в отоплении.',
      solution: 'Замена насосов на SHIMGE APM SMART.',
      result: 'Энергопотребление снизилось на 70%, шум в системе полностью исчез.'
    }
  }
];
