import { VirtualDOM } from '@youwol/flux-view'
import { setup } from '../../auto-generated'

export class ApplicationsSectionView {
    public readonly class = 'mx-auto d-flex flex-column align-items-center px-4'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
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
                    { style: { height: '2em' } },
                    {
                        class: 'px-4 text-justify',
                        innerHTML:
                            'The <a href="">YouWol environment</a> scales up on WebPM to facilitate the development and access of applications. ' +
                            'It offers persistent storage, indexed databases, users & groups management, and more. <br> ' +
                            'It is also entirely emulated on PC, including Mac, Windows, and Unix systems. ',
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
