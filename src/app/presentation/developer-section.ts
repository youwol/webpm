import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { setup } from '../../auto-generated'
export class DeveloperSectionView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'mx-auto border-left p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [new TitleView(), new GridView()]
    }
}

class TitleView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex align-items-center'
    public readonly style = {
        fontSize: '1.7rem',
        fontWeight: 'bolder' as const,
    }
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            {
                tag: 'img',
                height: 60,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/dev.svg`,
            },
            { tag: 'div', class: 'mx-2' },
            {
                tag: 'div',
                innerText: 'A solution that scales with your libraries ...',
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
                height: 75,
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
class Cell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class =
        'col-md-4 d-flex  flex-column align-items-center text-justify'
    public readonly children: ChildrenLike
    constructor({ imageName, text, title }) {
        this.children = [
            new CellHeader({ imageName, title }),
            { tag: 'div', class: 'm-2', innerHTML: text },
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
                tag: 'div',
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
class EmptyCell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-4 d-flex  align-items-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = []
    }
}
