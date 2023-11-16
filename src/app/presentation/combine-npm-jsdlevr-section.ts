import { VirtualDOM } from '@youwol/flux-view'
import { setup } from '../../auto-generated'

const checked = `<div class="w-100 d-flex justify-content-center"><i class=" mx-auto fas fa-check fv-text-success"></i></div>`
const notChecked = `<div class="w-100 d-flex justify-content-center"><i class="mx-auto fas fa-times fv-text-error"></i></div>`
const table = `<table>
    <thead>
        <tr class="text-center">
            <th></th>
            <th>WebPM</th>
            <th>jsDelivr</th>
            <th>NPM</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Host</strong></td>
            <td> <div class="w-100 d-flex justify-content-center"><img class='mx-center' width=48 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/browsers.png"></div></td>
            <td> <div class="w-100 d-flex justify-content-center"><img class='mx-center' width=48 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/browsers.png"></div></td>
            <td> <div class="w-100 d-flex justify-content-center"><img class='mx-center' width=48 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/PC.jpg"></div></td>
        </tr>
        <tr>
            <td>Dynamic install</td>
            <td>${checked}</td>
            <td>${checked}</td>
            <td>${notChecked}</td>
        </tr>
        <tr>
            <td>Dependencies resolution</td>
            <td>${checked}</td>
            <td>${notChecked}</td>
            <td>${checked}</td>
        </tr>
        <tr>
            <td>Import aliases</td>
            <td>${checked}</td>
            <td>${notChecked}</td>
            <td>${checked}</td>
        </tr>
        <tr>
            <td>Versions mixin</td>
            <td>${checked}</td>
            <td>${notChecked}</td>
            <td>${checked}</td>
        </tr>
        <tr>
            <td>Publication</td>
            <td> <div class="w-100 d-flex justify-content-center"><img width=32 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/smile.jpeg"></div></td>
            <td> <div class="w-100 d-flex justify-content-center"><img width=32 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/large-smile.webp"></div></td>
            <td> <div class="w-100 d-flex justify-content-center"><img width=32 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/large-smile.webp"></div></td>
        </tr>
    </tbody>
</table>
`
export class CombineSectionView {
    public readonly class = 'mx-auto border-right border-bottom p-5'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            new TitleView(),
            {
                class: 'px-5 d-flex justify-content-center ',
                children: [new TableComparisonView()],
            },
        ]
    }
}

class TitleView implements VirtualDOM {
    public readonly class = 'd-flex align-items-center'
    public readonly style = {
        fontSize: '1.7rem',
        fontWeight: 'bolder',
    }
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            {
                innerText: 'The best of ',
            },
            { class: 'mx-2' },
            {
                tag: 'img',
                height: 30,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/NPM.png`,
            },
            { class: 'mx-2' },
            {
                innerText: ' and ',
            },
            { class: 'mx-2' },
            {
                tag: 'img',
                height: 60,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/jsDelivr.png`,
            },
            { class: 'flex-grow-1' },
        ]
    }
}

class TableComparisonView implements VirtualDOM {
    public readonly class = 'w-50'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            { class: 'my-4' },
            {
                class: 'text',
                innerHTML: table,
            },
        ]
    }
}
