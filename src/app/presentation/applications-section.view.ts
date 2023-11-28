import { setup } from '../../auto-generated'
import {
    ParagraphSeparator,
    SectionView,
    TextParagraphView,
} from '../common/section.view'

export class ApplicationsSectionView extends SectionView {
    constructor() {
        super({
            title: '... Up to complex applications',
            subtitle: '',
            withClasses: 'border-top',
            paragraphs: [
                new ParagraphSeparator(),
                new TextParagraphView({
                    innerHTML:
                        'The YouWol environment scales up on WebPM to facilitate the development and access of applications. ' +
                        'It offers persistent storage, indexed databases, users & groups management, and more. ' +
                        'It is also entirely emulated on PC, including Mac, Windows, and Unix systems. ',
                }),
                new TextParagraphView({
                    innerHTML:
                        'Visit the <b>About us</b> page in the top banner for more information.',
                }),
                {
                    class: 'w-75 my-4',
                    tag: 'img',
                    src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/youwol.png`,
                },
            ],
        })
    }
}
