/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_CARDS_URL: string
}

interface ImportMeta  {
    readonly env: ImportMetaEnv
}