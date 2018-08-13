let importedConfig: any

if (process.env.NODE_ENV === 'production') {
  importedConfig = require('./configureStore.production')
} else {
  importedConfig = require('./configureStore.development');
}

export const configureStore = importedConfig.configureStore
export const history = importedConfig.history
