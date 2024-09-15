export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
        return 'NaN';
    }
    // TODO: use locale from some context
    return date.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const formatFileSize = (bytes: number): string => {
    if (isNaN(bytes) || bytes < 0) return 'NaN';
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatSeconds = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;
    }
}