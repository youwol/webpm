import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { aboutYouwolModule } from '@youwol/os-widgets'
import { basePathImages } from './index'
const AboutYwModule = await aboutYouwolModule()
export class FlexibleRobustView extends AboutYwModule.SectionView {
    constructor() {
        super({
            title: 'Flexible and robust',
            subtitle: '',
            withClasses: 'border-left border-bottom',
            paragraphs: [
                new AboutYwModule.TextParagraphView({
                    innerHTML: `The overarching goal is to offer a robust solution for installing and linking libraries
                     at runtime within a web browser. While it is crucial in many scenarios (involving installing 
                     features that relies on user actions), webPM is the only existing solution (to our knowledge).`,
                }),
                new AboutYwModule.ParagraphSeparator(),
                new GridView(),
            ],
        })
    }
}

class GridView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex flex-wrap justify-content-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new AboutYwModule.CardView({
                imageUrl: `${basePathImages}/flexible.png`,
                title: 'On the fly install',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Runtimes can be extended dynamically, creating a range of new opportunities.',
                },
            }),
            new AboutYwModule.CardView({
                imageUrl: `${basePathImages}/browsers.png`,
                title: 'Any browser',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Share your code and runtime, ready to execute from a simple URL.',
                },
            }),
            new AboutYwModule.CardView({
                imageUrl: `${basePathImages}/dependencies.png`,
                title: 'Dynamic linking',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Properly handle direct and indirect dependencies along with dynamic linking.',
                },
            }),
            new AboutYwModule.CardView({
                imageUrl: `${basePathImages}/multi-versions.png`,
                title: 'Versions mixin',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Installed runtimes can feature library with multiple versions.',
                },
            }),
        ]
    }
}
