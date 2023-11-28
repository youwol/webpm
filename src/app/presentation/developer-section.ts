import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { CardView } from '../common/card.view'
import {
    ParagraphSeparator,
    SectionView,
    TextParagraphView,
} from '../common/section.view'

export class DeveloperSectionView extends SectionView {
    constructor() {
        super({
            title: 'A solution that scales with your libraries ...',
            subtitle: '',
            withClasses: 'border-left',
            paragraphs: [
                new TextParagraphView({
                    innerHTML: `Our goal is to offer a supportive environment for developers that is the least intrusive 
                    and maximize development cycle efficiency.`,
                }),
                new ParagraphSeparator(),
                new GridView(),
            ],
        })
    }
}

class GridView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex flex-wrap justify-content-around'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new CardView({
                imageName: 'TS.png',
                title: 'Typescript friendly',
                abstract: `Dynamic does not mean "any": type checking, completion, <i>etc.</i> are 
                            available transparently in your project. Check for instance <a href='https://github.com/youwol/webpm'>here</a>.`,
            }),
            new CardView({
                imageName: 'laptop.png',
                title: 'WebPM in your PC',
                abstract: `WebPM backend can run in your PC to facilitate working with your own projects.
                                Interested? Check a presentation <a href=''>here</a>.`,
            }),
            new CardView({
                imageName: 'debug-browser.png',
                title: 'In-browser debug',
                abstract: `We strive to provide the best experience to debug within the browser.
                        Check for instance the 'youwol' libraries in the 'Sources' panel of your debug tool console.`,
            }),
        ]
    }
}
