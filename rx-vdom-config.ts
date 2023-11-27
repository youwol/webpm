type AllTags = keyof HTMLElementTagNameMap
export type Configuration = {
    TypeCheck: 'strict'
    SupportedHTMLTags: 'Prod' extends 'Prod' ? AllTags : DevTags
    WithFluxView: true
}

type DevTags =
    | 'ul'
    | 'li'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'img'
    | 'pre'
    | 'iframe'
    | 'i'
    | 'a'
    | 'input'
    | 'span'
    | 'button'
    | 'select'
    | 'option'
