// Dashboard 相关类型定义

/**
 * 时间范围
 */
export interface TimeRange {
  /** 开始日期 (YYYY-MM-DD) */
  start: string
  /** 结束日期 (YYYY-MM-DD) */
  end: string
  /** 天数 */
  days: number
}

/**
 * 趋势数据点
 */
export interface TrendDataPoint {
  /** 日期 (YYYY-MM-DD) */
  date: string
  /** 创建数量 */
  count: number
}

/**
 * Dashboard 统计数据
 */
export interface DashboardStats {
  totalInstances: number
  runningInstances: number
  stoppedInstances: number
  errorInstances: number
}

/**
 * 资源使用情况
 */
export interface ResourceUsage {
  cpu: number
  memory: number
  storage: number
  network: number
}

/**
 * 待办事项
 */
export interface TodoItem {
  id: string
  type: 'approval' | 'error' | 'info'
  icon: string
  title: string
  description: string
  action?: string
}

/**
 * Dashboard API 响应
 */
export interface DashboardData {
  stats: DashboardStats
  resources: ResourceUsage
  trend: TrendDataPoint[]
  todos: TodoItem[]
}

/**
 * 趋势数据缓存项
 */
export interface TrendCacheItem {
  /** 日期字符串 (YYYY-MM-DD) */
  date: string
  /** 创建数量 */
  count: number
  /** 缓存时间戳 */
  cachedAt: number
}

/**
 * 趋势数据状态
 */
export interface TrendDataState {
  /** 所有缓存的数据 */
  allData: TrendCacheItem[]
  /** 当前可见范围 */
  currentRange: TimeRange
  /** 是否正在加载 */
  isLoading: boolean
  /** 错误信息 */
  error: string | null
  /** 最后更新时间 */
  lastUpdated: number
}
