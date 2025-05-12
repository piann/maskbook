export const formatDate = (raw?: string) => {
    if (!raw) return '';
    const d = new Date(raw);
    return `${d.getFullYear().toString().slice(2)}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};