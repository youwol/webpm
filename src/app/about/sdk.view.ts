import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { setup } from '../../auto-generated'

export class SdkView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-left p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'Software Development Kit',
                subtitle: 'Code as you like, deploy as you want: WebSDK',
            }),
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'd-flex justify-content-center',
                children: [
                    {
                        tag: 'img',
                        style: {
                            height: '250px',
                        },
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/dev-portal.png`,
                    },
                ],
            },
            { tag: 'div', class: 'my-4' },
            {
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                tag: 'ul',
                children: [
                    {
                        tag: 'li',
                        innerText: 'py-youwol as youwol in your PC',
                    },
                    {
                        tag: 'li',
                        innerText:
                            'the developer portal: bring your stack and deploy your solution ',
                    },
                    {
                        tag: 'li',
                        innerText:
                            'local resources available (software or data)',
                    },
                    {
                        tag: 'li',
                        innerText:
                            'Check this video to make an app available in 5 minutes',
                    },
                    {
                        tag: 'li',
                        innerHTML: 'More info on <a href="">WebSDK</a>',
                    },
                ],
            },
        ]
    }
}
