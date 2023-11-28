import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'

export const paragraphStyle = {
    fontSize: '20px',
    lineHeight: '32px',
    minWidth: '300px',
    maxWidth: '600px',
    textAlign: 'justify' as const,
    fontWeight: 400,
}

export const maxColumnWidth = '1040px'

export class SectionTitle implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly children: ChildrenLike
    public readonly title: string
    public readonly subtitle: string
    constructor(params: { title: string; subtitle: string }) {
        Object.assign(this, params)
        this.children = [
            {
                tag: 'div',
                innerText: this.title,
                style: {
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                },
                children: [
                    {
                        style: {
                            fontSize: '1.5rem',
                            fontWeight: 'bolder',
                        },
                        tag: 'div',
                        innerText: this.subtitle,
                    },
                ],
            },
        ]
    }
}

export const YouWolLogo =
    '<svg id="logo2bis" xmlns="http://www.w3.org/2000/svg" style="margin: auto" viewBox="0 0 109.58 121.1" width="150px" height="150px">\n' +
    '<defs><style>.cls-2{fill:black;}</style></defs>\n' +
    '<title>logo_YouWol_white</title>\n' +
    '<polygon class="cls-2" points="109.58 94.68 109.58 84.14 91.39 73.64 109.58 63.14 109.58 42.06 63.95 68.41 63.94 68.41 63.94 121.1 82.2 110.56 82.2 89.41 100.52 99.99 109.58 94.76 109.58 94.68"></polygon>\n' +
    '<polygon class="cls-2" points="54.8 52.69 9.17 26.35 27.42 15.81 45.61 26.31 45.61 5.31 54.73 0.04 54.8 0 63.86 5.23 63.86 26.39 82.18 15.81 100.43 26.35 54.8 52.7 54.8 52.69"></polygon>\n' +
    '<polygon class="cls-2" points="0.07 94.72 9.2 99.99 27.38 89.49 27.38 110.56 45.64 121.1 45.64 68.41 45.64 68.41 0.01 42.06 0.01 63.14 18.33 73.64 0 84.22 0 94.68 0.07 94.72"></polygon>\n' +
    '</svg>'
