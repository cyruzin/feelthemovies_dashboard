// @flow

export type TRecommendation = {
    id?: number,
    user_id: number,
    title: string,
    type: number,
    body: string,
    poster: string,
    backdrop: string,
    status?: number,
    genres: string,
    keywords: string,
    created_at?: string,
    updated_at?: string
}