export function truncateDescription(description: string | null | undefined): string {
        const MAX_LENGTH = 140;

        if (!description) {
                return "";
        }

        if (description.length > MAX_LENGTH) {
                return description.substring(0, MAX_LENGTH - 3) + '...';
        }

        return description;
}