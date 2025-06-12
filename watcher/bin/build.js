const es = require('esbuild')
const path = require('node:path')
const {file} = require('@vindo/utility')
const {writeFile} = require('node:fs/promises')


const option = {
	bundle: true,
	format: 'esm',
	logLevel: 'error',
}


/**
 * 
 */
function resolve(...args) {
	return path.resolve(process.cwd(), ...args)
}


      
/**
 * 
 */
function dirname(...args) {
	return path.resolve(__dirname, ...args)
}


/**
 * 
 */
function resolveAlias(buildPath) {
	return {
		name: 'resolve-alias',
		setup(build) {
			build.onResolve({filter: /.*/}, ({path}) => {
				const patt = /@build/

				if(path.match(patt)) {
					return {
						path: resolve(path.replace(patt, buildPath), 'index.js')
					}
				}
				return null
			})
		}
	}
}


/**
 * 
 * @param {*} entries 
 * @param {*} param1 
 */
async function createMap(entries, conf) {
	var code = 'export default {\n'

	for(var item of entries) {
		const name = file.path.parse(item.name).name
		if(name) {
			code += `\t${name}: require('./${name}.js').default,\n`
		}
	}
	code += '}\n'

	await writeFile(resolve(conf.output, 'browser/index.js'), code)
}


/**
 * 
 * @param {*} entries 
 * @param {*} param1 
 */
async function bundle(entries, conf) {
	const output = conf.output

	await createMap(entries, conf)
	await es.build({
		...option,
		minify: conf.minify ?? false,
		outfile: resolve(output, 'bundle.js'),
		entryPoints: [
			dirname('bundle.js')
		],
		plugins: [resolveAlias(output)]
	})
}


/**
 * 
 * @param {*} entries 
 * @param {*} conf 
 */
async function browser(entries, conf) {
	const opt = {
		...option,
		packages: 'external',
		outdir: resolve(conf.output, 'browser'),
	}

	function reducer(items, item) {
		const add = function(item) {
			items.push(
				file.join(item.path, item.name)
			)
			return items
		}
		if(item.name.match(/\.browser\./)) {
			return add(item)
		}
		return add(item)
	}

	await es.build({...opt, entryPoints: entries.reduce(reducer, [])})
}


/**
 * 
 * @param {*} param0 
 */
module.exports = async function build(conf) {
	try {
		/**
		 * Build pages
		 */
		const dir = resolve(conf.bundle)
		if(file.isDir(dir)) {
			const entries = file.readdir(dir)

			if(entries.length) {
				await browser(entries, conf)
			}

			/**
			 * Bundle the loader
			 */
			await bundle(entries, conf)
		}
	}
	catch(e) {
		console.log(e)
	}
}