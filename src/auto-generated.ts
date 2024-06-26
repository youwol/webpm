
const runTimeDependencies = {
    "externals": {
        "@youwol/http-clients": "^3.0.0",
        "@youwol/http-primitives": "^0.2.0",
        "@youwol/os-widgets": "^0.2.2",
        "@youwol/rx-code-mirror-editors": "^0.5.0",
        "@youwol/rx-group-views": "^0.3.0",
        "@youwol/rx-vdom": "^1.0.1",
        "@youwol/webpm-client": "^3.0.0",
        "rxjs": "^7.5.6"
    },
    "includedInBundle": {}
}
const externals = {
    "@youwol/http-clients": "window['@youwol/http-clients_APIv3']",
    "@youwol/http-primitives": "window['@youwol/http-primitives_APIv02']",
    "@youwol/os-widgets": "window['@youwol/os-widgets_APIv02']",
    "@youwol/rx-code-mirror-editors": "window['@youwol/rx-code-mirror-editors_APIv05']",
    "@youwol/rx-group-views": "window['@youwol/rx-group-views_APIv03']",
    "@youwol/rx-vdom": "window['@youwol/rx-vdom_APIv1']",
    "@youwol/webpm-client": "window['@youwol/webpm-client_APIv3']",
    "rxjs": "window['rxjs_APIv7']",
    "rxjs/operators": "window['rxjs_APIv7']['operators']"
}
const exportedSymbols = {
    "@youwol/http-clients": {
        "apiKey": "3",
        "exportedSymbol": "@youwol/http-clients"
    },
    "@youwol/http-primitives": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/http-primitives"
    },
    "@youwol/os-widgets": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/os-widgets"
    },
    "@youwol/rx-code-mirror-editors": {
        "apiKey": "05",
        "exportedSymbol": "@youwol/rx-code-mirror-editors"
    },
    "@youwol/rx-group-views": {
        "apiKey": "03",
        "exportedSymbol": "@youwol/rx-group-views"
    },
    "@youwol/rx-vdom": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/rx-vdom"
    },
    "@youwol/webpm-client": {
        "apiKey": "3",
        "exportedSymbol": "@youwol/webpm-client"
    },
    "rxjs": {
        "apiKey": "7",
        "exportedSymbol": "rxjs"
    }
}

const mainEntry : {entryFile: string,loadDependencies:string[]} = {
    "entryFile": "./main.ts",
    "loadDependencies": [
        "@youwol/webpm-client",
        "@youwol/rx-code-mirror-editors",
        "@youwol/rx-vdom",
        "@youwol/rx-group-views",
        "rxjs",
        "@youwol/http-clients",
        "@youwol/http-primitives",
        "@youwol/os-widgets"
    ]
}

const secondaryEntries : {[k:string]:{entryFile: string, name: string, loadDependencies:string[]}}= {}

const entries = {
     '@youwol/webpm': './main.ts',
    ...Object.values(secondaryEntries).reduce( (acc,e) => ({...acc, [`@youwol/webpm/${e.name}`]:e.entryFile}), {})
}
export const setup = {
    name:'@youwol/webpm',
        assetId:'QHlvdXdvbC93ZWJwbQ==',
    version:'0.2.6-wip',
    shortDescription:"WebPM web-site",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/webpm&tab=doc',
    npmPackage:'https://www.npmjs.com/package/@youwol/webpm',
    sourceGithub:'https://github.com/youwol/webpm',
    userGuide:'https://l.youwol.com/doc/@youwol/webpm',
    apiVersion:'02',
    runTimeDependencies,
    externals,
    exportedSymbols,
    entries,
    secondaryEntries,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    },

    installMainModule: ({cdnClient, installParameters}:{
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const parameters = installParameters || {}
        const scripts = parameters.scripts || []
        const modules = [
            ...(parameters.modules || []),
            ...mainEntry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/webpm_APIv02`]
        })
    },
    installAuxiliaryModule: ({name, cdnClient, installParameters}:{
        name: string,
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const entry = secondaryEntries[name]
        if(!entry){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const parameters = installParameters || {}
        const scripts = [
            ...(parameters.scripts || []),
            `@youwol/webpm#0.2.6-wip~dist/@youwol/webpm/${entry.name}.js`
        ]
        const modules = [
            ...(parameters.modules || []),
            ...entry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/webpm/${entry.name}_APIv02`]
        })
    },
    getCdnDependencies(name?: string){
        if(name && !secondaryEntries[name]){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const deps = name ? secondaryEntries[name].loadDependencies : mainEntry.loadDependencies

        return deps.map( d => `${d}#${runTimeDependencies.externals[d]}`)
    }
}
