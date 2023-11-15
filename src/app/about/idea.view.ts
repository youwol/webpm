import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle } from './common'

export class IdeaSectionView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            { tag: 'div', class: 'my-5' },
            // {
            //     class: 'w-100',
            //     style: paragraphStyle,
            //     tag: 'p',
            //     innerHTML: `WebPM is brought to you by YouWol, a small passionate team dedicated to provide a new
            //     kind of environment, especially suited for engineering and science.`,
            // },
            // {
            //     class: 'w-100',
            //     style: paragraphStyle,
            //     tag: 'p',
            //     innerHTML: `YouWol focuses on delivering a hybrid local/cloud environment tailored for numerical
            //     sciences and engineering. Our goal is to offer an environment that enhances the balance between
            //     flexibility and performance, currently achieved through either cloud or local computing.
            //     `,
            // },
            {
                class: 'w-100',
                style: paragraphStyle,
                tag: 'p',
                innerHTML: `WebPM is developed by YouWol, a dedicated and passionate team committed to delivering a 
                unique environment tailored for engineering and science. It complements traditional cloud and local
                 computing by introducing a hybrid layer that operates within your web browser. 
                 This layer enhances the accessibility of local solutions and introduces customization options beyond 
                 what is typically available in cloud solutions.`,
            },
            {
                class: 'w-100',
                style: paragraphStyle,
                tag: 'p',
                innerHTML: `All the projects relevant to this environment are open source, they can be found
                in YouWol's <a href='https://github.com/youwol'>GitHub</a>.`,
            },
        ]
    }
}
