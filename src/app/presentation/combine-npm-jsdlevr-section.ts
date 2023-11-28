import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { setup } from '../../auto-generated'
import {
    ParagraphSeparator,
    SectionView,
    TextParagraphView,
} from '../common/section.view'

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
            <td> <div class="w-100 d-flex justify-content-center"><img class='mx-center' width=48 src="/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/laptop.png"></div></td>
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

export class CombineSectionView extends SectionView {
    constructor() {
        super({
            title: new TitleView(),
            subtitle: '',
            withClasses: 'border-right border-bottom',
            paragraphs: [
                new TextParagraphView({
                    innerHTML: `Just like NPM running in a browser ... or just like jsDelivr properly managing dependencies.`,
                }),
                new ParagraphSeparator(),
                {
                    tag: 'div',
                    class: 'd-flex justify-content-center ',
                    children: [new TableComparisonView()],
                },
            ],
        })
    }
}

class TitleView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex align-items-center flex-wrap'
    public readonly style = {
        fontSize: '1.7rem',
        fontWeight: 'bolder' as const,
    }
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            { tag: 'div', innerText: 'The best of ' },
            { tag: 'div', class: 'mx-2' },
            {
                tag: 'img',
                height: 30,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/NPM.png`,
            },
            { tag: 'div', class: 'mx-2' },
            { tag: 'div', innerText: ' and ' },
            { tag: 'div', class: 'mx-2' },
            {
                tag: 'img',
                height: 60,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/jsDelivr.png`,
            },
            { tag: 'div', class: 'flex-grow-1' },
        ]
    }
}

class TableComparisonView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly style = {
        width: 'fit-content',
    }
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'text',
                innerHTML: table,
            },
        ]
    }
}
