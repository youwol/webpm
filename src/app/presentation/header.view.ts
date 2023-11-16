import { ChildrenLike, FluxViewVirtualDOM, VirtualDOM } from '@youwol/rx-vdom'
import { CodeEditorView } from './code-editor.view'

export class HeaderView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'h-100 d-flex fv-text-primary flex-column justify-content-center mx-auto p-3',
                children: [
                    {
                        tag: 'h1',
                        class: 'text-center',
                        innerText: 'Package manager for browsers',
                        style: {
                            fontWeight: 600,
                        },
                    },
                    { tag: 'div', class: 'my-1' },
                    {
                        tag: 'div',
                        class: 'w-100 text-justify text-column-width d-flex align-items-center justify-content-around',
                        style: {
                            fontWeight: 400,
                            fontSize: '20px',
                        },
                        children: [
                            {
                                tag: 'div',
                                children: [
                                    {
                                        tag: 'div',
                                        innerText: 'NPM install packages in PC',
                                    },
                                    {
                                        tag: 'pre',
                                        class: 'fv-text-focus fv-bg-background-alt w-100 text-center mb-0',
                                        innerText: 'npm install ...',
                                    },
                                ],
                            },
                            {
                                tag: 'div',
                                children: [
                                    {
                                        tag: 'div',
                                        innerText:
                                            'WebPM install packages in browsers',
                                    },
                                    {
                                        tag: 'div',
                                        class: 'd-flex fv-bg-background-alt align-items-center',
                                        children: [
                                            {
                                                tag: 'pre',
                                                class: 'mb-0 fv-text-focus fv-bg-background-alt w-100 text-center',
                                                innerText: 'webpm.install ...',
                                            },
                                            {
                                                tag: 'a',
                                                class: 'h-100 fas fa-external-link-square-alt fv-bg-background-alt mx-1',
                                                href: `/api/assets-gateway/raw/package/QHlvdXdvbC93ZWJwbS1jbGllbnQ=/%5E2.2.0/dist/docs/types/MainModule.InstallInputs.html`,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    { tag: 'div', class: 'my-5' },
                    {
                        tag: 'div',
                        class: 'w-100 text-center',
                        style: {
                            fontWeight: 600,
                            fontSize: '17px',
                        },
                        children: [
                            {
                                tag: 'div',
                                innerText: 'Example is worth a thousand words',
                            },
                        ],
                    },
                    { tag: 'div', class: 'my-2' },
                    {
                        tag: 'div',
                        class: 'mx-auto px-2 border p-2',
                        style: { width: '1040px' },
                        children: [new CodeEditorView() as FluxViewVirtualDOM],
                    },
                ],
            },
        ]
    }
}
