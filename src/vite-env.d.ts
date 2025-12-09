/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_CARDS_URL: string
    readonly VITE_API_CARDS_A2_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}