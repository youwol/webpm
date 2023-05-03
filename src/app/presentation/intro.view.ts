import { VirtualDOM } from '@youwol/flux-view'

export class IntroView implements VirtualDOM {
    public readonly class =
        'h-100 d-flex flex-column justify-content-center mx-auto p-3'
    public readonly style = {
        maxWidth: '800px',
    }
    public readonly children = [
        {
            class: 'sub-title p-2 rounded',
            style: {
                //backgroundColor: 'rgba(255,255,255,0.8)',
                fontFamily: "Arimo', sans-serif;",
                textAlign: 'justify',
            },
            children: [
                {
                    tag: 'blockquote',
                    innerHTML:
                        '«Browsers are capable of accessing peripherals, interpreting code written in multiple ' +
                        "languages, and harnessing the power of increasingly advanced computers. Along with Nebula's " +
                        'plug-and-play ecosystem, experience the convenience and performance of a truly versatile ' +
                        'operating system - right in your browser.» <b>ChatGPT</b> (with a bit of guidance 😇 )',
                },
            ],
        },
    ]
}
