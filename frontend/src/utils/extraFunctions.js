export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString()
}

export function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString()
}
