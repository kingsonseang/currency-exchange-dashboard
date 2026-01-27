export function paginate<T>(items: T[], page: number, pageSize: number = 10) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
