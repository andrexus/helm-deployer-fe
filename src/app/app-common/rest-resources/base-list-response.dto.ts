export interface BaseListResponseDTO<T> {
  page: number;
  pageSize: number;
  total: number;
  items: T[];
}
