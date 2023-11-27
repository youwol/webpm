import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { setup } from '../../auto-generated'

export class ApplicationsSectionView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'mx-auto d-flex flex-column align-items-center px-4'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'w-50',
                children: [
                    {
                        class: 'm-2 text-center',
                        tag: 'h6',
                        style: {
                            fontSize: '1.7em',
                            fontWeight: 'bolder',
                        },
                        innerText: '... Up to complex applications',
                    },
                    { tag: 'div', style: { height: '2em' } },
                    {
                        tag: 'div',
                        class: 'px-4 text-justify',
                        innerHTML:
                            'The YouWol environment scales up on WebPM to facilitate the development and access of applications. ' +
                            'It offers persistent storage, indexed databases, users & groups management, and more. ' +
                            'It is also entirely emulated on PC, including Mac, Windows, and Unix systems. ',
                    },
                    {
                        tag: 'div',
                        class: 'px-4 text-justify',
                        innerHTML:
                            'Visit the <b>About us</b> page in the top banner for more information.',
                    },
                ],
            },
            {
                class: 'w-75 my-4',
                tag: 'img',
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/youwol.png`,
            },
        ]
    }
}
