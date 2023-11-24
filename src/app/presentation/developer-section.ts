import { VirtualDOM } from '@youwol/flux-view'
import { setup } from '../../auto-generated'
export class DeveloperSectionView {
    public readonly class = 'mx-auto border-left p-5'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [new TitleView(), new GridView()]
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
                tag: 'img',
                height: 60,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/dev.svg`,
            },
            {
                class: 'mx-2',
            },
            {
                innerText: 'A solution that scales with your libraries ...',
            },
        ]
    }
}

class CellHeader implements VirtualDOM {
    public readonly class = 'd-flex align-items-center'
    public readonly children: VirtualDOM[]
    constructor({ imageName, title }) {
        this.children = [
            {
                tag: 'img',
                width: 75,
                height: 75,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/${imageName}`,
            },
            {
                class: 'm-2',
                tag: 'h6',
                style: {
                    fontWeight: '600',
                },
                innerText: title,
            },
        ]
    }
}
class Cell implements VirtualDOM {
    public readonly class =
        'col-md-4 d-flex  flex-column align-items-center text-justify'
    public readonly children: VirtualDOM[]
    constructor({ imageName, text, title }) {
        this.children = [
            new CellHeader({ imageName, title }),
            {
                class: 'm-2',
                innerHTML: text,
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
                        imageName: 'TS.png',
                        title: 'Typescript friendly',
                        text: `Dynamic does not mean "any": type checking, completion, <i>etc.</i> are 
                            available transparently in your project. Check for instance <a href='https://github.com/youwol/todo-app-ts'>here </a>`,
                    }),
                    new EmptyCell(),
                    new Cell({
                        imageName: 'laptop.png',
                        title: 'WebPM in your PC',
                        text: `WebPM backend can run in your PC to facilitate working with your own projects.
                                Interested? Check a presentation <a href=''>here</a>.`,
                    }),
                ],
            },
            {
                class: 'row',
                children: [
                    new EmptyCell(),
                    new Cell({
                        imageName: 'debug-browser.png',
                        title: 'In-browser debug',
                        text: `We strive to provide the best experience to debug within the browser.
                        Check for instance the 'youwol' libraries in the 'Sources' panel of your debug tool console.`,
                    }),
                    new EmptyCell(),
                ],
            },
        ]
    }
}
class EmptyCell implements VirtualDOM {
    public readonly class = 'col-md-4 d-flex  align-items-center'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = []
    }
}
