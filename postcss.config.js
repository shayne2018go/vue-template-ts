
import autoprefixer from 'autoprefixer'


export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ["Android >= 4.0", "iOS >= 7"]
    }),
  ],
}
