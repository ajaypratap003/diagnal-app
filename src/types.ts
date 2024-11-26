export type Content = {
    name: string;
    'poster-image': string;
}
export type ContentItems = {
    content: Content[];
}

type Page = {
    title: string;
    'total-content-items': string;
    'page-num-requested': string,
    'page-size-requested': string,
    'page-size-returned': string,
    'content-items': ContentItems
}

export type MusicResponse = {
    page: Page
};