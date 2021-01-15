export interface PhotosToEdit {
    photoId?: number | string;
    photoName?: string;
    toRemove?: boolean;
}

export interface AlbumToEdit {
    albumId: number;
    albumName?: string;
    albumDescription?: string;
    photosToEdit: PhotosToEdit[];
}