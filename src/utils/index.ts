// Convert firebase's timestamp(seconds) to format Date String
export const formatDate = (seconds: number) => {
  const date = new Date(seconds * 1000)
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}. ${String(date.getDate()).padStart(2, '0')}`
}
