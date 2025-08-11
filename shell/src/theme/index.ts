import { tokens } from '@/theme/tokens'
import { componentThemes } from '@/theme/components'

export const theme = {
  token: {
    colorPrimary: tokens.colors.primary,
    colorSuccess: tokens.colors.success,
    colorWarning: tokens.colors.warning,
    colorError: tokens.colors.error,
    colorInfo: tokens.colors.info,
    colorBgBase: tokens.colors.background,
    colorBgContainer: tokens.colors.container,
    fontFamily: tokens.typography.fontFamily,
  },
  components: componentThemes
}

export { tokens }
export * from './components'