export interface Options {
    target?: string
    defaultLayout?: string
    importMode?: 'sync' | 'async'
    /**
     * If opened, fix →
     * https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134
     * @default false
     */
    skipTopLevelRouteLayout?: boolean
}
