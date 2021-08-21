yarn

lerna bootstrap

lerna exec --parallel -- yarn rimraf dist

yarn test

lerna exec --stream -- yarn tsc -sourceMap false
