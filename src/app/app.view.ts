import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'

import { PresentationView } from './presentation'
import { BehaviorSubject } from 'rxjs'

import { aboutYouwolModule } from '@youwol/os-widgets'
export const AboutYwModule = await aboutYouwolModule()

export type Topic = 'Home' | 'About'

export class AppView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly topic$ = new BehaviorSubject<Topic>('Home')
    public readonly class = 'h-100  w-100 d-flex flex-column'
    public readonly style = {
        fontFamily: 'Lexend, sans-serif',
    }

    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            new AboutYwModule.TopBannerView({
                topic$: this.topic$,
                productName: 'WebPM',
                resources: [
                    { type: 'link', title: 'Blog', url: '' },
                    { type: 'delimiter', title: 'API Documentation' },
                    {
                        type: 'link',
                        title: 'WebPM client',
                        url: '/api/assets-gateway/raw/package/QHlvdXdvbC93ZWJwbS1jbGllbnQ=/^2.2.0/dist/docs/modules/MainModule.html',
                    },
                ],
            }),
            {
                source$: this.topic$,
                vdomMap: (topic: Topic) => {
                    if (topic == 'Home') {
                        return new PresentationView()
                    }
                    if (topic == 'About') {
                        return new AboutYwModule.AboutView({
                            productName: 'WebPM',
                        })
                    }
                },
            },
        ]
    }
}
