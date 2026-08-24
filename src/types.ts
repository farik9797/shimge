export type ShimgeCategoryType = 
  | 'all'
  | 'submersible-wells'     // Скважинные и глубоководные
  | 'multistage-vertical'   // Вертикальные многоступенчатые BLT
  | 'drainage-sewage'       // Дренажные и фекальные WQ
  | 'circulation-hvac'      // Циркуляционные для отопления XPS/APM
  | 'surface-centrifugal'   // Поверхностные и самовсасывающие CPM/QB
  | 'intelligent-booster';  // Автоматические станции повышения давления BWJ/PZ

export type ShimgeSeries = 
  | 'BLT' 
  | 'WQ' 
  | '4SGm' 
  | '6SG' 
  | 'XPS' 
  | 'APM' 
  | 'CPM' 
  | 'BWJ' 
  | 'QDX' 
  | 'PZ' 
  | 'SHM';

export interface ProductSpec {
  name: string;
  value: string;
  unit?: string;
  isKey?: boolean;
}

export interface QhPoint {
  q: number; // Подача м³/ч
  h: number; // Напор м
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  series: ShimgeSeries;
  category: ShimgeCategoryType;
  categoryName: string;
  subCategory: string;
  brand: 'SHIMGE';
  image: string;
  gallery?: string[];
  description: string;
  inStock: boolean;
  stockCount?: number;
  deliveryDays?: number;
  warrantyYears: number;
  powerKw: number; // Мощность в кВт
  headMeters: number; // Максимальный / номинальный напор (м)
  flowRate: number; // Максимальная / номинальная подача (м³/ч)
  maxPressureBar?: number; // Макс. давление (бар)
  pipeDiameterInch?: string; // Диаметр патрубков (дюйм / мм)
  casingMaterial: 'Нержавеющая сталь AISI 304' | 'Нержавеющая сталь AISI 316' | 'Высокопрочный чугун HT200' | 'Технополимер / Латунь';
  impellerMaterial: 'AISI 304' | 'Чугун HT200' | 'Латунь' | 'PPO (Норил)';
  liquidTempRange: string;
  protectionClass: string;
  isolationClass: string;
  specs: ProductSpec[];
  qhCurve?: QhPoint[];
  industries: ('hvac' | 'water-supply' | 'agriculture' | 'sewage' | 'industry')[];
  documents?: { title: string; size: string; type: string }[];
  priceOnRequest?: boolean;
  estimatedPrice?: string;
}

export interface IndustrySolution {
  id: 'water-supply' | 'agriculture' | 'hvac' | 'sewage' | 'industry';
  name: string;
  title: string;
  subtitle: string;
  image: string;
  icon: string;
  description: string;
  challenges: string[];
  recommendedSeries: string[];
  standardBundles: {
    title: string;
    level: 'Базовый' | 'Оптимальный' | 'Интеллектуальный';
    equipment: string[];
    description: string;
    targetTasks: string;
  }[];
  recommendedProductIds: string[];
  caseStudy: {
    client: string;
    location: string;
    task: string;
    solution: string;
    result: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CatalogFilterState {
  category: ShimgeCategoryType;
  series: ShimgeSeries[];
  inStockOnly: boolean;
  minPowerKw: number;
  maxPowerKw: number;
  minHeadMeters: number;
  maxHeadMeters: number;
  minFlowRate: number;
  maxFlowRate: number;
  casingMaterial: string[];
  searchQuery: string;
  sortBy: 'popular' | 'power-asc' | 'power-desc' | 'head-desc' | 'flow-desc' | 'name';
  viewMode: 'grid' | 'table';
}

export type PageTab = 
  | 'home' 
  | 'catalog' 
  | 'industries' 
  | 'about' 
  | 'delivery' 
  | 'contacts';
