import { VirtualDOM, AnyVirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { NeedSectionView } from './need.view'
import { BrowserAsOSSectionView } from './browser-as-os.view'
import { ConceptView } from './concept.view'
import { IdeaSectionView } from './idea.view'
import { SdkView } from './sdk.view'
import { FinalView } from './final.view'
import { setup } from '../../auto-generated'

/**
 * 1 - the idea: a flexible and collaborative env for numerical sciences
 *
 * 2 - the need: something in between cloud computing and PC
 *
 * 3 - the solution: takes advantage of the browser
 *
 * 4 - the foundation: libraries as a service (WebPM)
 *
 * 5 - the YouWol platform: stretch the idea up to applications
 *
 *
 */
export class AboutView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'w-100 mx-auto overflow-auto'
    public readonly children: AnyVirtualDOM[]
    public readonly style = {
        position: 'relative' as const,
    }
    constructor() {
        this.children = [
            {
                tag: 'div',
                id: 'background',
                children: [
                    {
                        tag: 'div',
                        class: 'd-flex justify-content-center w-100',
                        style: {
                            opacity: '0.7',
                            backgroundColor: '#dcdddc',
                            position: 'absolute' as const,
                            zIndex: -1,
                        },
                        children: [
                            {
                                tag: 'div',
                                style: {
                                    backgroundColor: 'black',
                                },
                                children: [
                                    {
                                        tag: 'img',
                                        style: {
                                            opacity: 0.4,
                                        },
                                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/youwol-bg.png`,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'div',
                class: 'mx-auto',
                style: {
                    width: '1040px',
                },
                children: [
                    //{ tag: 'div', style: { height: '170px' } },
                    {
                        tag: 'div',
                        class: 'w-100 d-flex flex-column align-items-center justify-content-center fv-text-primary',
                        children: [
                            // {
                            //     tag: 'div',
                            //     innerHTML: YouWolLogo,
                            // },
                            // {
                            //     tag: 'div',
                            //     class: 'my-2',
                            //     innerText: 'Turn your browser in an OS',
                            //     style: {
                            //         fontSize: '2.0rem',
                            //         fontWeight: 'bolder',
                            //     },
                            // },
                            // {
                            //     tag: 'div',
                            //     class: 'mt-3 mb-2',
                            //     innerText:
                            //         'Get the best of an hybrid local/cloud environment',
                            //     style: {
                            //         fontSize: '2.0rem',
                            //         fontWeight: 'bolder',
                            //     },
                            // },
                            new IdeaSectionView(),
                        ],
                    },
                    // Get the flexibility of PC, with the power of the cloud
                    new SeparatorSectionFirst(),
                    new SeparatorSectionRight(),
                    new NeedSectionView(),
                    new SeparatorSectionLeft(),
                    new ConceptView(),
                    new SeparatorSectionRight(),
                    new BrowserAsOSSectionView(),
                    new SeparatorSectionLeft(),
                    new SdkView(),
                    new SeparatorSectionLast(),
                    new FinalView(),
                    // {
                    //     tag: 'div',
                    //     class: 'text',
                    //     innerHTML:
                    //         'We are <b>YouWol</b>, a small passionate team dedicated to provide a new kind of online environment for engineering and science. ' +
                    //         'Our approach complements traditional solutions that primarily focus on bringing logic into backend services. ' +
                    //         'We aim to harness the full potential of your browser which already provides standardized APIs, enables peripheral access, ' +
                    //         "supports the universal compilation target WebAssembly, and leverages the full power of your device's CPUs, GPUs, and RAM. " +
                    //         'By enabling seamless sharing and usage of numerical tools developed from a wide range of languages and technology stacks, we foster a truly collaborative, open and elastic ecosystem',
                    // },
                ],
            },
        ]
    }
}

class SeparatorSectionFirst implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children: ChildrenLike = [
        { tag: 'div', class: 'w-50' },
        { tag: 'div', class: 'w-50 border-left border-bottom' },
    ]
}
class SeparatorSectionLeft implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'border-left'
    public readonly style = {
        height: '5em',
    }
}
class SeparatorSectionRight implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'border-right'
    public readonly style = {
        height: '5em',
    }
}

class SeparatorSectionLast implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children: ChildrenLike = [
        { tag: 'div', class: 'w-50 border-right border-top' },
    ]
}
