import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { setup } from '../../auto-generated'

export class ConceptView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-left border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'The concept',
                subtitle:
                    'Browsers: customizable as PC, accessible as servers, and more',
            }),
            { tag: 'div', class: 'my-4' },
            {
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                tag: 'p',
                innerHTML: `Positioned between your PC and the cloud, your web browser occupies a unique space,
                capable of merging the customizability of personal computers with the accessibility of cloud solutions.
                 Also, it inherently possesses the capability to execute a variety of  computations similar to those performed by your PC.`,
            },
            new GridView(),
            { tag: 'div', class: 'my-5' },
            {
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                tag: 'p',
                innerHTML: `The concept? Extending local & cloud solutions by running and sharing code 
                 through web-browser. The only lacking component was a robust package manager able to install and link
                 runtimes dynamically directly into web-browsers. It is the essence of <b>WebPM</b>:
                 promote an install-free, customizable & extendable runtime environment for browsers.`,
            },
        ]
    }
}

class CellHeader implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex align-items-center'
    public readonly children: ChildrenLike
    constructor({ imageName, title }) {
        this.children = [
            {
                tag: 'img',
                width: 125,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/${imageName}`,
            },
            {
                class: 'm-2',
                tag: 'h6',
                style: {
                    fontWeight: 600,
                },
                innerText: title,
            },
        ]
    }
}
class BrowserCell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-4 d-flex  flex-column align-items-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'mx-auto my-auto',
                children: [
                    // {
                    //     tag: 'img',
                    //     width: 75,
                    //     src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/browsers.png`,
                    // },
                ],
            },
        ]
    }
}

class Cell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-4 d-flex  flex-column align-items-center'
    public readonly children: ChildrenLike
    constructor({ imageName, text, title }) {
        this.children = [
            new CellHeader({ imageName, title }),
            {
                tag: 'div',
                class: 'text-justify',
                innerHTML: text,
            },
        ]
    }
}

class GridView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'container mt-4'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'row',
                children: [
                    new EmptyCell(),
                    new Cell({
                        imageName: 'adaptor.png',
                        title: 'Standard',
                        text: `Standardized API and universal compilation target.`,
                    }),
                    new EmptyCell(),
                ],
            },
            {
                tag: 'div',
                class: 'row',
                children: [
                    new Cell({
                        imageName: 'connected.png',
                        title: 'Connected',
                        text: `Can consume resources from local computers, servers & peripherals`,
                    }),
                    new BrowserCell(),
                    new Cell({
                        imageName: 'siwss-knife.png',
                        title: 'Versatile',
                        text: `On the fly install of programs written in various languages.`,
                    }),
                ],
            },
            {
                tag: 'div',
                class: 'row',
                children: [
                    new EmptyCell(),
                    new Cell({
                        imageName: 'rocket.png',
                        title: 'Performant',
                        text: `Multi-threading, GPU programing, Web-Assembly, and more`,
                    }),
                    new EmptyCell(),
                ],
            },
        ]
    }
}
class EmptyCell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-4 d-flex  align-items-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = []
    }
}
