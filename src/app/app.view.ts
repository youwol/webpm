import { child$, VirtualDOM } from '@youwol/flux-view'
import { TopBannerView } from './top-banner.view'
import { PresentationView } from './presentation/presentation.view'
import { BehaviorSubject } from 'rxjs'
import { AboutView } from './presentation/about.view'

export type Topic = 'Home' | 'About'

export class AppView implements VirtualDOM {
    public readonly topic$ = new BehaviorSubject<Topic>('Home')
    public readonly class = 'h-100  w-100 d-flex flex-column'

    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            new TopBannerView({ topic$: this.topic$ }),
            child$(this.topic$, (topic) => {
                if (topic == 'Home') {
                    return new PresentationView()
                }
                if (topic == 'About') {
                    return new AboutView()
                }
                // if (topic == 'Playground') {
                //     return new JsPlaygroundView()
                // }
            }),
        ]
    }
}
