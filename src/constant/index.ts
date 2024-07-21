// export const defaultSessionStampCode = "UAT_ManifestoTest1"

// export const campaignStampCode = "MANIFESTORSVP2024"

const envName = import.meta.env.VITE_ENV_NAME

const config = {
  DEV: {
  },
  UAT: {
  },
  PROD: {
  }
}

export default config[envName]
