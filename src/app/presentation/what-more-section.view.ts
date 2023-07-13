import { VirtualDOM } from '@youwol/flux-view'

export class WhatMoreSection implements VirtualDOM {
    public readonly class = 'text-center mx-auto'
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            { class: 'my-5' },
            {
                innerText: "What's more",
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            {
                class: 'text',
                innerHTML:
                    'WebPM, is an integral component of the YouWol online environment. ' +
                    'This environment scales up on WebPM to facilitate the development and access of applications. ' +
                    'When it comes to designing applications, YouWol offers a complete package, encompassing data management, user management, persistent storage, indexed databases, and more. ' +
                    'A remarkable aspect lies in the fact that it is entirely emulated on personal computers, including Mac, Windows, and Unix systems. ' +
                    'This emulation not only allows for a swift development cycle but also grants access to resources exclusively available on your local machine.<br>' +
                    'Want to give it a try and publish your own application or library? You can get started by following these steps:' +
                    '<li> install the local youwol environment by executing the command <b>pipx install youwol</b>.</li>' +
                    '<li> launch it by running the command: <b>youwol</b>' +
                    '<li> follow the interactive guide in this <a href="http://localhost:2000/applications/@youwol/stories/latest?id=9e664525-1dac-45af-83c6-f4b4ef3866af&mode=reader ">document</a> </li>',
                // ' system. It empowers browsers to leverage their full potential, enabling seamless ' +
                // 'access to peripherals, interpreting code in various languages, and harnessing the ' +
                // 'power of modern computers. Please visit here for more information.',
            },
        ]
    }
}
