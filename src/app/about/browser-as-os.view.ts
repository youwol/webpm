import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { setup } from '../../auto-generated'

export class BrowserAsOSSectionView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-right border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'Extending the concept',
                subtitle: 'Turn browsers into OS: WebOS',
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
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/web-os.png`,
                    },
                ],
            },
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                children: [
                    {
                        tag: 'p',
                        innerHTML: `WebPM establishes the groundwork for an emulated OS within browsers.
                        Because applications encompass more than just installing runtimes (user management, persistent
                         storage, indexed databases, installers, environment, and more), YouWol offers for developers
                          a set of solutions (backend APIs & frontend libraries) to fully take advantage of this OS 
                          like environment. <br> <br>  Please visit <a href=''>WebOS</a> for further information.`,
                    },
                ],
            },
        ]
    }
}
