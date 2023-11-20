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
                subtitle: 'Host runtime in the browser',
            }),
            { tag: 'div', class: 'my-4' },
            {
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                tag: 'p',
                innerHTML: `Positioned between your PC and the cloud, your web browser occupies a unique space, 
                capable of merging the customizability of personal computers with the accessibility of cloud solutions.
                 While often viewed as a display medium, it inherently possesses the capability to execute a variety of
                  computations similar to those performed by your PC.`,
            },
            new GridView(),
            { tag: 'div', class: 'my-5' },
            {
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                tag: 'p',
                innerHTML: `YouWol concept was born: extending local & cloud solutions by running and sharing code 
                 through web-browser. The only lacking component was a robust package manager able to install and link
                 runtimes dynamically. This is where <b>WebPM</b> comes in. It is both accessible - anyone can easily utilize
                  runtimes through the WebPM client - and extendable - anyone can publish their libraries into the WebPM
                   repository.`,
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
                width: 75,
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
                    {
                        tag: 'img',
                        width: 75,
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/browsers.png`,
                    },
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
                        imageName: 'API.png',
                        title: 'Standard API',
                        text: `The code run the same way in every browser, in any computer.`,
                    }),
                    new EmptyCell(),
                ],
            },
            {
                tag: 'div',
                class: 'row',
                children: [
                    new Cell({
                        imageName: 'web-workers.jpeg',
                        title: 'Parallel computations',
                        text: `Computations can be parallelized up to the number of cores in your PC (8, 16, 32?)`,
                    }),
                    new BrowserCell(),
                    new Cell({
                        imageName: 'GPU.png',
                        title: 'GPU programing',
                        text: `Computations can use PC's graphic card to accelerate computations.`,
                    }),
                ],
            },
            {
                tag: 'div',
                class: 'row',
                children: [
                    new EmptyCell(),
                    new Cell({
                        imageName: 'WASM.png',
                        title: 'Web assembly',
                        text: `WASM is a universal compilation target: codes in C++, Rust, D, Fortran, can be executed. `,
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
