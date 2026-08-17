import { Product, Category, ServiceItem, NewsItem, ArticleItem, CertificateItem, FAQItem, PartnerBrand } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'studio-monitors',
    name: 'Студийные мониторы',
    slug: 'studio-monitors',
    iconName: 'Speaker',
    description: 'Профессиональная студийная акустика ближнего, среднего и дальнего поля для сведение и мастеринга.',
    productCount: 24,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'microphones',
    name: 'Микрофоны и радиосистемы',
    slug: 'microphones',
    iconName: 'Mic',
    description: 'Студийные конденсаторные, динамические, инструментальные и вокальные радиосистемы.',
    productCount: 42,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mixers',
    name: 'Микшерные пульты',
    slug: 'mixers',
    iconName: 'Sliders',
    description: 'Аналоговые и цифровые микшеры для концертных площадок, студий и вещания.',
    productCount: 18,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pa-systems',
    name: 'Акустические системы',
    slug: 'pa-systems',
    iconName: 'Radio',
    description: 'Активная и пассивная концертная акустика, сабвуферы и линейные массивы.',
    productCount: 35,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'headphones',
    name: 'Студийные наушники',
    slug: 'headphones',
    iconName: 'Headphones',
    description: 'Мониторные наушники открытого и закрытого типа для звукорежиссеров и музыкантов.',
    productCount: 29,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'commercial-audio',
    name: 'Системы оповещения 100 В',
    slug: 'commercial-audio',
    iconName: 'Volume2',
    description: 'Трансляционные усилители, потолочные и настенные громкоговорители для ТРЦ, офисов и ресторанов.',
    productCount: 31,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'racks-stands',
    name: 'Стойки, коммутация и аксессуары',
    slug: 'racks-stands',
    iconName: 'Cable',
    description: 'Профессиональные микрофонные и акустические стойки, рэковые шкафы и мультикоры.',
    productCount: 56,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'YAM-HS8-BLK',
    name: 'Yamaha HS8 — Активный студийный монитор (8")',
    category: 'studio-monitors',
    brand: 'Yamaha',
    priceBYN: 1450,
    oldPriceBYN: 1680,
    badge: 'DISCOUNT',
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    stockCount: 12,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Легендарный 2-полосный студийный монитор с 8-дюймовым НЧ-динамиком и 1-дюймовым купольным ВЧ-твитером.',
    fullDesc: 'Монитор Yamaha HS8 обеспечивает честное и точное звучание без окраса, что делает его стандартом в звукозаписывающих студиях по всему миру. Оснащен мощным усилителем Bi-Amp (75 Вт НЧ + 45 Вт ВЧ), регуляторами ROOM CONTROL и HIGH TRIM для точной подстройки под акустику помещения.',
    specs: [
      { name: 'Динамик НЧ', value: '8 дюймов (коннус)' },
      { name: 'Динамик ВЧ', value: '1 дюйм (купол)' },
      { name: 'Выходная мощность', value: '120 Вт (75W LF + 45W HF)' },
      { name: 'Частотный диапазон', value: '38 Гц – 30 кГц (-10 дБ)' },
      { name: 'Входы', value: 'XLR3-31 (балансный), PHONE (балансный)' },
      { name: 'Габариты (ШхВхГ)', value: '250 x 390 x 334 мм' },
      { name: 'Вес', value: '10.2 кг' }
    ],
    tags: ['Yamaha', 'Студийный монитор', 'HS8', '8 дюймов', 'Bi-Amp'],
    warrantyMonths: 24,
    isPopular: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Алексей Мельников',
        company: 'SoundWave Studio (Минск)',
        rating: 5,
        date: '12.05.2026',
        text: 'Брали пару для сведения электронной и акустической музыки. Низ очень глубокий и четкий, сабвуфер даже не потребовался. Арт-Медиа Трейд доставили на следующий день!',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Дмитрий К.',
        rating: 5,
        date: '28.04.2026',
        text: 'Отличное качество сборки и легендарный звук. Официальная гарантия 2 года от производителя.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    sku: 'SHU-SM7B',
    name: 'Shure SM7B — Динамический студийный микрофон',
    category: 'microphones',
    brand: 'Shure',
    priceBYN: 1680,
    oldPriceBYN: 1850,
    badge: 'HIT',
    discountPercent: 9,
    rating: 5.0,
    reviewsCount: 41,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Мировой стандарт для вокала, подкастов, радиовещания и стриминга с кардиоидной диаграммой.',
    fullDesc: 'Shure SM7B — динамический микрофон с гладкой, ровной и широкой частотной характеристикой. Обладает великолепной защитой от электромагнитных помех и встроенной пневматической системой амортизации капсюля.',
    specs: [
      { name: 'Тип капсюля', value: 'Динамический' },
      { name: 'Диаграмма направленности', value: 'Кардиоида' },
      { name: 'Частотный диапазон', value: '50 Гц – 20 000 Гц' },
      { name: 'Сопротивление', value: '150 Ом' },
      { name: 'Подключение', value: '3-pin XLR' },
      { name: 'Переключатели', value: 'НЧ-фильтр (Bass Roll-off), усиление СЧ (Presence Boost)' }
    ],
    tags: ['Shure', 'SM7B', 'Микрофон', 'Вокал', 'Подкаст'],
    warrantyMonths: 24,
    isPopular: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Павел Сергиенко',
        company: 'Подкаст "Звук и Точка"',
        rating: 5,
        date: '02.06.2026',
        text: 'Идеальный микрофон для дикторского голоса. Совершенно не ловит шумы помещения.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    sku: 'JBL-EON715',
    name: 'JBL EON715 — Активная концертная акустическая система 1300 Вт',
    category: 'pa-systems',
    brand: 'JBL',
    priceBYN: 2350,
    badge: 'NEW',
    rating: 4.8,
    reviewsCount: 15,
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: '15-дюймовый портативный концертный колонка с DSP-процессором dbx, Bluetooth и мобильным управлением.',
    fullDesc: 'JBL EON715 устанавливает новые стандарты портативных звуковых систем. Встроенный 3-канальный микшер, цветной ЖК-экран, подавитель обратной связи dbx AFS2, 8-полосный эквалайзер и задержка сигналов.',
    specs: [
      { name: 'Мощность (пиковая)', value: '1300 Вт' },
      { name: 'Максимальный SPL', value: '128 дБ' },
      { name: 'НЧ-динамик', value: '15 дюймов (неодимовый)' },
      { name: 'ВЧ-компрессионный драйвер', value: '2414H 1 дюйм' },
      { name: 'Дисперсия (ГхВ)', value: '90° x 60°' },
      { name: 'Беспроводная связь', value: 'Bluetooth 5.0 (стриминг + управление)' }
    ],
    tags: ['JBL', 'EON715', 'Концертная акустика', '1300 Вт', 'Bluetooth'],
    warrantyMonths: 12,
    isNew: true,
    isPopular: true,
    reviews: []
  },
  {
    id: 'prod-4',
    sku: 'BEH-X32-COMP',
    name: 'Behringer X32 Compact — Цифровой микшерный пульт 40 каналов',
    category: 'mixers',
    brand: 'Behringer',
    priceBYN: 7900,
    oldPriceBYN: 8400,
    badge: 'DISCOUNT',
    discountPercent: 6,
    rating: 4.9,
    reviewsCount: 19,
    inStock: true,
    stockCount: 3,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Компактная микшерная консоль с 16 предусилителями MIDAS, 17 моторизованными моторами и 7" TFT дисплеем.',
    fullDesc: 'Behringer X32 Compact объединяет передовую цифровую обработку и интуитивное управление. Полная интеграция со сценическими блоками S16/S32, запись 32 каналов через USB/FireWire и поддержка мониторных систем P16.',
    specs: [
      { name: 'Входные каналы', value: '40 каналов, 25 шин' },
      { name: 'Микрофонные входы', value: '16 XLR с предусилителями MIDAS' },
      { name: 'Фейдеры', value: '17 моторизованных 100 мм' },
      { name: 'Экран', value: '7 дюймов цветной TFT' },
      { name: 'Интерфейс', value: '32-канальный аудиоинтерфейс USB 2.0' }
    ],
    tags: ['Behringer', 'X32', 'Микшерный пульт', 'Цифровой микшер', 'MIDAS'],
    warrantyMonths: 24,
    reviews: []
  },
  {
    id: 'prod-5',
    sku: 'SENN-HD280',
    name: 'Sennheiser HD 280 PRO — Студийные мониторные наушники',
    category: 'headphones',
    brand: 'Sennheiser',
    priceBYN: 420,
    rating: 4.7,
    reviewsCount: 33,
    inStock: true,
    stockCount: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Закрытые охватывающие наушники с отличной пассивной звукоизоляцией до 32 дБ.',
    fullDesc: 'Наушники Sennheiser HD 280 PRO разработаны специально для контрольного прослушивания, сведения и записи вокала. Складная конструкция, витой кабель длиной до 3 метров и заменяемые амбушюры.',
    specs: [
      { name: 'Акустическое оформление', value: 'Закрытое' },
      { name: 'Частотный диапазон', value: '8 Гц – 25 000 Гц' },
      { name: 'Импеданс', value: '64 Ом' },
      { name: 'Звуковое давление (SPL)', value: '113 дБ' },
      { name: 'Длина кабеля', value: '1.3 - 3.0 м (витой)' }
    ],
    tags: ['Sennheiser', 'HD280', 'Наушники', 'Закрытые', 'Студийные'],
    warrantyMonths: 24,
    isPopular: true,
    reviews: []
  },
  {
    id: 'prod-6',
    sku: 'NEU-U87AI-SET',
    name: 'Neumann U 87 Ai Studio Set — Студийный конденсаторный микрофон',
    category: 'microphones',
    brand: 'Neumann',
    priceBYN: 11200,
    badge: 'HIT',
    rating: 5.0,
    reviewsCount: 12,
    inStock: true,
    stockCount: 2,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Эталонный ступенчато-направленный конденсаторный микрофон с капсюлем K 67 в комплекте с подвесом EA 4.',
    fullDesc: 'Neumann U 87 Ai — признанный рекордсмен среди студийных микрофонов премиум-класса. Поставляется с оригинальным виброподвесом EA 4 в деревянном футляре. Три переключаемые диаграммы: круговая, кардиоидная и восьмерка.',
    specs: [
      { name: 'Капсюль', value: 'K 67 (большая двойная диафрагма)' },
      { name: 'Диаграммы направленности', value: 'Круг, Кардиоида, Восьмерка' },
      { name: 'Частотный диапазон', value: '20 Гц – 20 000 Гц' },
      { name: 'Эквивалентный уровень шума', value: '12 дБ-A (кардиоида)' },
      { name: 'Макс. SPL', value: '127 дБ (137 дБ с аттенюатором -10 дБ)' }
    ],
    tags: ['Neumann', 'U87', 'Премиум', 'Конденсаторный', 'Студийный'],
    warrantyMonths: 36,
    reviews: []
  },
  {
    id: 'prod-7',
    sku: 'PAS-MA120-100V',
    name: 'Pasystems MA-120 — Трансляционный усилитель 120 Вт (100 В / 70 В / 4 Ом)',
    category: 'commercial-audio',
    brand: 'Pasystems',
    priceBYN: 680,
    badge: 'NEW',
    rating: 4.6,
    reviewsCount: 8,
    inStock: true,
    stockCount: 15,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Многофункциональный микширующий усилитель с Bluetooth, MP3-плеером, FM-тюнером и 6 зонами вещания.',
    fullDesc: 'Идеальное решение для фонового озвучивания и голосовых объявлений в магазинах, офисах, ресторанах и фитнес-клубах. Оснащен микрофонным входом с приоритетом объявления и пусковым сигналом (гонг).',
    specs: [
      { name: 'Номинальная мощность', value: '120 Вт' },
      { name: 'Выходы линий', value: '70V, 100V, 4-16 Ом (6 независимых зон)' },
      { name: 'Встроенные источники', value: 'Bluetooth 5.0, USB MP3, SD Card, FM' },
      { name: 'Входы', value: '2 x MIC (XLR/6.3mm), 2 x AUX (RCA)' },
      { name: 'Питание', value: 'AC 220V 50Hz' }
    ],
    tags: ['Pasystems', '100V', 'Усилитель', 'Оповещение', 'Фоновый звук'],
    warrantyMonths: 12,
    isNew: true,
    reviews: []
  },
  {
    id: 'prod-8',
    sku: 'ATH-AT2020-XLR',
    name: 'Audio-Technica AT2020 — Кардиоидный конденсаторный микрофон',
    category: 'microphones',
    brand: 'Audio-Technica',
    priceBYN: 450,
    oldPriceBYN: 490,
    badge: 'DISCOUNT',
    discountPercent: 8,
    rating: 4.9,
    reviewsCount: 37,
    inStock: true,
    stockCount: 18,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    additionalImages: [],
    shortDesc: 'Оптимальное соотношение цены и качества для домашней и профессиональной студии записи.',
    fullDesc: 'Audio-Technica AT2020 устанавливает стандарт по соотношению цены и производительности в классе студийных конденсаторных микрофонов. Легкая диафрагма специально спроектирована для расширенной частотной характеристики.',
    specs: [
      { name: 'Диаграмма', value: 'Кардиоида' },
      { name: 'Диапазон частот', value: '20 — 20 000 Гц' },
      { name: 'Чувствительность', value: '-37 дБ (14.1 мВ)' },
      { name: 'Сопротивление', value: '100 Ом' }
    ],
    tags: ['Audio-Technica', 'AT2020', 'Микрофон', 'Запись'],
    warrantyMonths: 24,
    reviews: []
  }
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Акустический расчет и проектирование помещений',
    iconName: 'Compass',
    shortDesc: 'Профессиональное моделирование звуковых полей в ПО EASE для концертных залов, ресторанов и конференц-комнат.',
    fullDesc: 'Разработка рабочей документации, акустический расчет коэффициентов реверберации (RT60), индекса разборчивости речи (STI) и распределения звукового давления. Выезд инженера по Беларуси.',
    features: [
      'Моделирование в программе EASE 4.4',
      'Расчет разборчивости речи (STI / RASTI)',
      'Подбор оптимального количества и углов подвеса акустики',
      'Подготовка спецификации с чертежами и кабельным журналом'
    ],
    priceStartBYN: 350,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-2',
    title: 'Монтаж и пусконаладка звукового оборудования',
    iconName: 'Wrench',
    shortDesc: 'Полный цикл монтажных работ «под ключ»: прокладка трасс, подвес акустических систем, настройка DSP и микшеров.',
    fullDesc: 'Наша монтажная бригада имеет допуски к высотным и электромонтажным работам. Осуществляем установку трансляционных систем 100В, линейных массивов, театрального и концертного звука.',
    features: [
      'Монтаж с соблюдением требований СНиП и ГОСТ',
      'Прокладка акустических и силовых кабелей',
      'Программирование цифровых аудиоматриц и систем управления',
      'Гарантия на монтажные работы 24 месяца'
    ],
    priceStartBYN: 280,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-3',
    title: 'Сервисный ремонт и техническое обслуживание',
    iconName: 'ShieldCheck',
    shortDesc: 'Собственный авторизованный сервисный центр в Минске. Диагностика, замена радиокомпонентов, профилактика.',
    fullDesc: 'Ремонт профессиональных усилителей мощности, микшерных пультов, радиосистем, динамиков и активной акустики. Использование оригинальных комплектующих Yamaha, JBL, Shure, Behringer.',
    features: [
      'Бесплатная первичная диагностика при ремонте',
      'Оригинальные запчасти со склада в Минске',
      'Срочный ремонт за 24-48 часов',
      'Официальный акт выполненных работ для юридических лиц'
    ],
    priceStartBYN: 60,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-4',
    title: 'Аренда звукового и светового оборудования',
    iconName: 'Calendar',
    shortDesc: 'Комплексы звука от 1 кВт до 20 кВт для презентаций, корпоративов, фестивалей и свадеб.',
    fullDesc: 'Предоставление звуковых комплектов с техническим сопровождением звукорежиссера и техников. Доставка по Минску и Минской области.',
    features: [
      'Акустика JBL, Electro-Voice, QSC',
      'Радиомикнофны Shure ULXD / QLXD / SLXD',
      'Цифровые микшеры Behringer X32, Soundcraft',
      'Доставка, сборка и звукорежиссура мероприятий'
    ],
    priceStartBYN: 180,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Поступление новой серии цифровых радиосистем Shure SLX-D на склад в Минске',
    date: '10.08.2026',
    category: 'Новинки каталога',
    summary: 'Компания «Арт-Медиа Трейд» сообщает о пополнении склада современными двухканальными радиосистемами Shure с прозрачным 24-битным звуком.',
    content: 'Радиосистемы Shure SLX-D обеспечивают стабильную передачу радиосигнала и высокий динамический диапазон. Идеальный выбор для конференц-залов, учебных заведений и живых выступлений. Для юридических лиц доступны спеццены с НДС.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    readTime: '3 мин'
  },
  {
    id: 'news-2',
    title: 'Завершен проект по озвучиванию нового спортивного комплекса в Минске',
    date: '01.07.2026',
    category: 'Наши проекты',
    summary: 'Специалисты ООО «Арт-Медиа Трейд» выполнили проектирование и монтаж 100В системы оповещения и фонового озвучивания общей мощностью 3200 Вт.',
    content: 'На объекте установлены многозональные трансляционные усилители Pasystems и влагозащищенные настенные рупоры. Система полностью соответствует нормам МЧС Республики Беларусь по громкоговорящему оповещению о ЧС.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    readTime: '4 мин'
  }
];

export const MOCK_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Руководство: Как правильно выбрать 100-вольтовую систему оповещения для магазина или ресторана',
    author: 'Игорь Васильев (Главный инженер ООО «Арт-Медиа Трейд»)',
    date: '15.06.2026',
    summary: 'Разбираем ключевые различия между низкоомным (4-8 Ом) и трансляционным (70/100 В) звуком. Формулы расчета мощности и сечения кабеля.',
    content: 'При проектировании фонового звука в больших помещениях главное преимущество 100-вольтовых систем — возможность параллельного подключения десятков динамиков к одному усилителю без сложных схем согласования импеданса...',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    readTime: '7 мин',
    tags: ['100V', 'Оповещение', 'Акустика', 'Проектирование']
  },
  {
    id: 'art-2',
    title: 'Сравнительный обзор студийных мониторов: Yamaha HS7 vs JBL 307P MkII vs ADAM T7V',
    author: 'Евгений Романов',
    date: '20.05.2026',
    summary: 'Детальный разбор трех самых популярных 7-дюймовых активных мониторов для домашней и профессиональной студии записи.',
    content: 'Семидюймовые студийные мониторы считаются золотой серединой: они дают достаточный контроль низких частот без гудения в небольших необработанных комнатах...',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    readTime: '10 мин',
    tags: ['Обзор', 'Yamaha', 'JBL', 'Студия']
  }
];

export const MOCK_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Сертификат официального дилера Yamaha Music',
    issuer: 'Yamaha Music Eurasia',
    issueDate: '01.01.2026',
    validUntil: '31.12.2027',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    category: 'Дилерство'
  },
  {
    id: 'cert-2',
    title: 'Декларация о соответствии ЕАЭС (Shure)',
    issuer: 'Евразийский Экономический Союз',
    issueDate: '15.03.2025',
    validUntil: '14.03.2030',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    category: 'Сертификаты соответствия'
  },
  {
    id: 'cert-3',
    title: 'Сертификат соответствия системы менеджмента качества ISO 9001',
    issuer: 'Белорусский государственный институт стандартизации',
    issueDate: '10.10.2024',
    validUntil: '09.10.2027',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    category: 'Качество'
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Работает ли ООО «Арт-Медиа Трейд» с юридическими лицами по безналичному расчету?',
    answer: 'Да, мы активно работаем с юридическими лицами и индивидуальными предпринимателями Республики Беларусь по безналичному расчету. Все цены в каталоге указаны с учетом НДС 20%. Предоставляем полный комплект бухгалтерских документов (счет-фактура, товарная/товарно-транспортная накладная ТТН/ТН, акт выполненных работ).',
    category: 'b2b'
  },
  {
    id: 'faq-2',
    question: 'Каковы условия и сроки доставки по Минску и регионам Беларуси?',
    answer: 'Доставка по Минску осуществляется курьером в день заказа или на следующий день. При заказе на сумму от 300 BYN доставка по Минску БЕСПЛАТНАЯ. Доставка по регионам Республики Беларусь (Брест, Гродно, Витебск, Могилев, Гомель и районные центры) осуществляется курьерской службой DPD/Autolight за 1-2 рабочих дня.',
    category: 'delivery'
  },
  {
    id: 'faq-3',
    question: 'Предоставляется ли официальная гарантия на оборудование?',
    answer: 'Да, абсолютно на все продаваемое оборудование предоставляется официальная гарантия производителя сроком от 12 до 36 месяцев. В Минске работает собственный сервисный центр ООО «Арт-Медиа Трейд».',
    category: 'warranty'
  },
  {
    id: 'faq-4',
    question: 'Можете ли вы подобрать комплект звука по техническому заданию (ТЗ)?',
    answer: 'Конечно! Наши квалифицированные инженеры бесплатно изучат ваше ТЗ, план помещения или чертежи, проведут акустический расчет и составят несколько вариантов коммерческих предложений под ваш бюджет.',
    category: 'tech'
  }
];

export const MOCK_PARTNERS: PartnerBrand[] = [
  {
    id: 'brand-yamaha',
    name: 'Yamaha',
    logo: 'YAMAHA',
    country: 'Япония',
    description: 'Мировой лидер в производстве профессионального аудиооборудования, микшерных пультов и музыкальных инструментов.',
    website: 'https://yamaha.com',
    featuredCategory: 'Студийные мониторы и микшеры'
  },
  {
    id: 'brand-shure',
    name: 'Shure',
    logo: 'SHURE',
    country: 'США',
    description: 'Легендарные студийные и концертные микрофоны, вокальные радиосистемы и персональный мониторинг.',
    website: 'https://shure.com',
    featuredCategory: 'Микрофоны и радиосистемы'
  },
  {
    id: 'brand-jbl',
    name: 'JBL Professional',
    logo: 'JBL PRO',
    country: 'США',
    description: 'Профессиональные концертные акустические системы, линейные массивы и сабвуферы.',
    website: 'https://jblpro.com',
    featuredCategory: 'Концертная акустика'
  },
  {
    id: 'brand-sennheiser',
    name: 'Sennheiser',
    logo: 'SENNHEISER',
    country: 'Германия',
    description: 'Немецкое качество студийных наушников, дикторских микрофонов и беспроводных систем.',
    website: 'https://sennheiser.com',
    featuredCategory: 'Наушники и радиосистемы'
  },
  {
    id: 'brand-behringer',
    name: 'Behringer',
    logo: 'BEHRINGER',
    country: 'Германия',
    description: 'Инновационные цифровые микшеры серии X32/Wing, синтезаторы и звуковые интерфейсы.',
    website: 'https://behringer.com',
    featuredCategory: 'Цифровые микшеры'
  },
  {
    id: 'brand-pasystems',
    name: 'Pasystems',
    logo: 'PASYSTEMS',
    country: 'Беларусь / РФ',
    description: 'Высоконадежное трансляционное оборудование 100В для громкоговорящего оповещения.',
    website: 'https://mzvuk.by',
    featuredCategory: 'Системы оповещения'
  }
];
