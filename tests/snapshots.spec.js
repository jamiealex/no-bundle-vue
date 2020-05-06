const noBundleVue = require('../dist/no-bundle-vue.umd.js')
const fs = require('fs')
const path = require('path')

test('it should compile vue file as expected', async () => {
    await noBundleVue({ sourceDirectory: path.resolve(__dirname, './fixture'), outputDirectory: path.resolve(__dirname, './fixture-dist') })
    const file = await fs.promises.readFile( path.resolve(__dirname,'./fixture-dist/FixtureComponent.js'), { encoding: 'utf-8' })
    expect(file).toMatchSnapshot()
})