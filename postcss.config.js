import postcssPresentEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';


export default {
    plugins: [
        postcssPresentEnv(),
        autoprefixer()
    ]
}
