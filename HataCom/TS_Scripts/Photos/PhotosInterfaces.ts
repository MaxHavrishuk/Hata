export interface PhotosToEdit {
    photoId?: number | string;
    photoName?: string;
    toRemove?: boolean;
}

export interface AlbumToEdit {
    albumName?: string;
    albumDescription?: string;
    photosToEdit: PhotosToEdit[];
}