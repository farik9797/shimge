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
  casingMaterial: string;
  impellerMaterial: string;
  liquidTempRange: string;
  protectionClass: string;
  isolationClass: string;
  priceOnRequest?: boolean;
  estimatedPrice: string; // В сумах
  industries: string[];
  specs?: ProductSpec[];
  qhCurve?: QhPoint[];
  documents?: {
    title: string;
    size: string;
    type: 'PDF' | 'CAD' | 'DOC';
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
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
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'head-desc' | 'flow-desc' | 'power-asc' | 'power-desc' | 'name';
  viewMode?: 'grid' | 'table' | 'list';
}

export type CatalogFilterState = FilterState;

export type PageTab = 'home' | 'catalog' | 'industries' | 'about' | 'delivery' | 'contacts';

export type IndustryId = 'water-supply' | 'industry' | 'hvac' | 'agriculture' | 'sewage';

export interface IndustrySolution {
  id: IndustryId;
  name: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  description: string;
  challenges: string[];
  recommendedSeries: ShimgeSeries[];
  standardBundles: {
    title: string;
    level: string;
    targetTasks: string;
    equipment: string[];
    description: string;
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
