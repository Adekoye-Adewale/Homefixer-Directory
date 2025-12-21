type GooglePhotoOptions = {
        maxWidth?: number;
};

export function getGooglePlacePhotoUrl(
photoRef: string | null | undefined, apiKey: string, options: GooglePhotoOptions = {}): string | null {
        if (!photoRef) return null;

        const { maxWidth = 1400 } = options;

        return `/api/google-photo?photoRef=${encodeURIComponent(
                photoRef
        )}&maxWidth=${maxWidth}`;
}
