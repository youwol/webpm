import { VirtualDOM } from '@youwol/flux-view'
import { setup } from '../../auto-generated'

const tableData = {
    rowHeaders: ['NPM', 'jsDelivr', 'WebPM'],
    columnHeaders: [
        'Target',
        'Dynamic install',
        'Dependencies resolution',
        'aliases',
        'multi versions support',
        'Package publication',
    ],
    values: [
        ['PC', 'Browsers', 'Browsers'],
        [false, true, true],
        [true, false, false],
        [true, false, false],
        [true, false, false],
        ['easy', 'easy', 'medium'],
    ],
}
const checked = `<i class="fas fa-check fv-text-success">`
const notChecked = `<i class="fas fa-times fv-text-error">`
const table = `
 <table>
        <thead>
            <tr>
                <th></th>
                <th>Host</th>
                <th>Dynamic install</th>
                <th>Dependencies resolution</th>
                <th>Aliases</th>
                <th>Versions mixin</th>
                <th>Package publication</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>WebPM</strong></td>
                <td class="w-100 d-flex justify-content-center"><img width=32 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/browsers.png"></td>
                <td>${checked}</td>
                <td>${checked}</td>
                <td>${checked}</td>
                <td>${checked}</td>
                <td>medium</td>
            </tr>
            <tr>
                <td>jsDelivr</td>
                <td class="w-100 d-flex justify-content-center"><img class='mx-center' width=32 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/browsers.png"></td>
                <td>${checked}</td>
                <td>${notChecked}</td>
                <td>${notChecked}</td>
                <td>${notChecked}</td>
                <td>easy</td>
            </tr>
            <tr>
                <td>NPM</td>
                <td class="w-100 d-flex justify-content-center"><img class='mx-center' width=48 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/PC.jpg"></td>
                <td>${notChecked}</td>
                <td>${checked}</td>
                <td>${checked}</td>
                <td>${checked}</td>
                <td>easy</td>
            </tr>
        </tbody>
    </table>
`
export class CdnSectionView {
    public readonly class = 'mx-auto'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'separator',
            },
            { class: 'my-5' },
            {
                innerText: 'Flexible and robust',
                style: {
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-4' },
            new GridView(),
            { class: 'my-5' },
            new TableComparisonView(),
        ]
    }
}

class Cell implements VirtualDOM {
    public readonly class = 'col-md-4 d-flex  align-items-center'
    public readonly children: VirtualDOM[]
    constructor({ imageName, text }) {
        this.children = [
            {
                tag: 'img',
                width: 64,
                height: 64,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/${imageName}`,
            },
            {
                class: 'm-2',
                tag: 'h6',
                style: {
                    fontWeight: '600',
                },
                innerText: text,
            },
        ]
    }
}

class TableComparisonView implements VirtualDOM {
    public readonly class = ''
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                innerText: 'Package managers comparison',
                style: {
                    fontSize: '1.2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-4' },
            {
                class: 'text',
                innerHTML: table,
            },
        ]
    }
}
class GridView implements VirtualDOM {
    public readonly class = 'container mt-4'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'row',
                children: [
                    new Cell({
                        imageName: 'browsers.png',
                        text: 'Install in any browser',
                    }),
                    new Cell({
                        imageName: 'flexible.jpg',
                        text: 'Flexible install at any time ',
                    }),
                    new Cell({
                        imageName: 'dependencies.png',
                        text: 'Dependencies graph resolution',
                    }),
                ],
            },
            {
                class: 'row mt-5',
                children: [
                    new Cell({
                        imageName: 'safe.png',
                        text: 'Imports using aliases',
                    }),
                    new Cell({
                        imageName: 'multi-versions.png',
                        text: 'Mixin versions support',
                    }),
                    new Cell({
                        imageName: 'packaging.png',
                        text: 'Port your project or NPM packages easily',
                    }),
                ],
            },
        ]
    }
}
