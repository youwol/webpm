import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { CodeEditorView } from './code-editor.view'

export class HeaderView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'h-100 d-flex fv-text-primary flex-column justify-content-center mx-auto p-3',
                style: {
                    //backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2024%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient2025%26quot%3b)'%3e%3c/rect%3e%3cpath d='M95.97 266.86L160.93 304.36L160.93 379.36L95.97 416.86L31.02 379.36L31.02 304.36zM160.93 -70.64L225.88 -33.14L225.88 41.86L160.93 79.36L95.97 41.86L95.97 -33.14zM160.93 154.36L225.88 191.86L225.88 266.86L160.93 304.36L95.97 266.86L95.97 191.86zM290.83 379.36L355.79 416.86L355.79 491.86L290.83 529.36L225.88 491.86L225.88 416.86zM420.74 -70.64L485.7 -33.14L485.7 41.86L420.74 79.36L355.79 41.86L355.79 -33.14zM615.6 491.86L680.56 529.36L680.56 604.36L615.6 641.86L550.65 604.36L550.65 529.36zM680.56 154.36L745.51 191.86L745.51 266.86L680.56 304.36L615.6 266.86L615.6 191.86zM680.56 379.36L745.51 416.86L745.51 491.86L680.56 529.36L615.6 491.86L615.6 416.86zM875.42 41.86L940.37 79.36L940.37 154.36L875.42 191.86L810.46 154.36L810.46 79.36zM810.46 154.36L875.42 191.86L875.42 266.86L810.46 304.36L745.51 266.86L745.51 191.86zM810.46 379.36L875.42 416.86L875.42 491.86L810.46 529.36L745.51 491.86L745.51 416.86zM940.37 -70.64L1005.33 -33.14L1005.33 41.86L940.37 79.36L875.42 41.86L875.42 -33.14zM1005.33 41.86L1070.28 79.36L1070.28 154.36L1005.33 191.86L940.37 154.36L940.37 79.36zM940.37 154.36L1005.33 191.86L1005.33 266.86L940.37 304.36L875.42 266.86L875.42 191.86zM1005.33 491.86L1070.28 529.36L1070.28 604.36L1005.33 641.86L940.37 604.36L940.37 529.36zM1135.23 491.86L1200.19 529.36L1200.19 604.36L1135.23 641.86L1070.28 604.36L1070.28 529.36zM1265.14 491.86L1330.09 529.36L1330.09 604.36L1265.14 641.86L1200.19 604.36L1200.19 529.36zM1395.05 41.86L1460 79.36L1460 154.36L1395.05 191.86L1330.1 154.36L1330.1 79.36zM1460 154.36L1524.96 191.86L1524.96 266.86L1460 304.36L1395.05 266.86L1395.05 191.86z' stroke='%2303305d' stroke-width='2'%3e%3c/path%3e%3cpath d='M88.47 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM153.43 304.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM153.43 379.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM88.47 416.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM23.52 379.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM23.52 304.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM153.43 -70.64 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM218.38 -33.14 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM218.38 41.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM153.43 79.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM88.47 41.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM88.47 -33.14 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM153.43 154.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM218.38 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM218.38 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM88.47 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM283.33 379.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM348.29 416.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM348.29 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM283.33 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM218.38 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM218.38 416.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM413.24 -70.64 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM478.2 -33.14 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM478.2 41.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM413.24 79.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM348.29 41.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM348.29 -33.14 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM608.1 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM673.06 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM673.06 604.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM608.1 641.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM543.15 604.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM543.15 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM673.06 154.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM738.01 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM738.01 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM673.06 304.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM608.1 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM608.1 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM673.06 379.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM738.01 416.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM738.01 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM608.1 416.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM867.92 41.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM932.87 79.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM932.87 154.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM867.92 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM802.96 154.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM802.96 79.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM867.92 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM802.96 304.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM802.96 379.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM867.92 416.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM867.92 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM802.96 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM932.87 -70.64 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM997.83 -33.14 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM997.83 41.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM867.92 -33.14 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1062.78 79.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1062.78 154.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM997.83 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM997.83 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM932.87 304.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM997.83 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1062.78 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1062.78 604.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM997.83 641.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM932.87 604.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM932.87 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1127.73 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1192.69 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1192.69 604.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1127.73 641.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1257.64 491.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1322.59 529.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1322.59 604.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1257.64 641.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1387.55 41.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1452.5 79.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1452.5 154.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1387.55 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1322.6 154.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1322.6 79.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1517.46 191.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1517.46 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1452.5 304.36 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1387.55 266.86 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0z' fill='%2303305d'%3e%3c/path%3e%3cpath d='M17.9 -14.26L71.6 16.74L71.6 78.74L17.9 109.74L-35.8 78.74L-35.8 16.74zM71.6 264.74L125.29 295.74L125.29 357.74L71.6 388.74L17.9 357.74L17.9 295.74zM71.6 450.74L125.29 481.74L125.29 543.74L71.6 574.74L17.9 543.74L17.9 481.74zM178.99 78.74L232.68 109.74L232.68 171.74L178.99 202.74L125.29 171.74L125.29 109.74zM125.29 357.74L178.99 388.74L178.99 450.74L125.29 481.74L71.6 450.74L71.6 388.74zM125.29 543.74L178.99 574.74L178.99 636.74L125.29 667.74L71.6 636.74L71.6 574.74zM286.38 78.74L340.07 109.74L340.07 171.74L286.38 202.74L232.68 171.74L232.68 109.74zM232.68 171.74L286.38 202.74L286.38 264.74L232.68 295.74L178.99 264.74L178.99 202.74zM286.38 264.74L340.07 295.74L340.07 357.74L286.38 388.74L232.68 357.74L232.68 295.74zM554.85 171.74L608.55 202.74L608.55 264.74L554.85 295.74L501.16 264.74L501.16 202.74zM662.24 -14.26L715.94 16.74L715.94 78.74L662.24 109.74L608.55 78.74L608.55 16.74zM715.94 450.74L769.63 481.74L769.63 543.74L715.94 574.74L662.24 543.74L662.24 481.74zM1038.11 264.74L1091.8 295.74L1091.8 357.74L1038.11 388.74L984.41 357.74L984.41 295.74zM984.41 357.74L1038.11 388.74L1038.11 450.74L984.41 481.74L930.72 450.74L930.72 388.74zM1038.11 450.74L1091.8 481.74L1091.8 543.74L1038.11 574.74L984.41 543.74L984.41 481.74zM984.41 543.74L1038.11 574.74L1038.11 636.74L984.41 667.74L930.72 636.74L930.72 574.74zM1145.5 264.74L1199.19 295.74L1199.19 357.74L1145.5 388.74L1091.8 357.74L1091.8 295.74zM1252.89 78.74L1306.58 109.74L1306.58 171.74L1252.89 202.74L1199.19 171.74L1199.19 109.74zM1306.58 171.74L1360.28 202.74L1360.28 264.74L1306.58 295.74L1252.89 264.74L1252.89 202.74zM1413.97 -14.26L1467.67 16.74L1467.67 78.74L1413.97 109.74L1360.28 78.74L1360.28 16.74z' stroke='url(%26quot%3b%23SvgjsLinearGradient2026%26quot%3b)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2024'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient2025'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='220.03199999999998' y1='-220.02399999999997' x2='1219.9679999999998' y2='780.024' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient2026'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(126%2c 94%2c 7%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`,
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='100%' height='100%' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1040%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1041%26quot%3b)'%3e%3c/rect%3e%3cpath d='M1440 0L945.37 0L1440 20.24z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M945.37 0L1440 20.24L1440 159.82000000000002L847.7 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M847.7 0L1440 159.82000000000002L1440 265.26L772.9000000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M772.9000000000001 0L1440 265.26L1440 319.48L326.2100000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L403.63 560L0 499.4z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 499.4L403.63 560L637.6 560L0 333.98z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 333.98L637.6 560L790.46 560L0 239.65000000000003z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 239.65000000000003L790.46 560L893.24 560L0 146.92000000000002z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1040'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1041'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(1%2c 32%2c 73%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`,
                },
                children: [
                    {
                        tag: 'h1',
                        class: 'text-center',
                        innerText: 'Package manager in browsers',
                        style: {
                            fontWeight: 600,
                        },
                    },
                    { tag: 'div', class: 'my-1' },
                    {
                        tag: 'div',
                        style: {
                            maxWidth: '500px',
                            fontWeight: 400,
                            fontSize: '16px',
                        },
                        class: 'w-100 text-justify text-column-width d-flex align-items-center justify-content-around flex-wrap',
                        children: [
                            {
                                tag: 'div',
                                class: 'text-center',
                                innerText:
                                    'Browser-based NPM equivalent for dynamic dependency handling.',
                            },
                        ],
                    },
                    { tag: 'div', class: 'my-3' },
                    {
                        tag: 'div',
                        class: 'w-100 text-justify text-column-width d-flex align-items-center justify-content-around flex-wrap',
                        style: {
                            fontWeight: 400,
                            fontSize: '20px',
                        },
                        children: [
                            new Card({
                                title: 'NPM install in PC',
                                code: 'npm.install ...',
                                icon: 'fas fa-times fv-text-error',
                                text: 'Available at runtime',
                                href: undefined,
                            }),
                            new Card({
                                title: 'WebPM install in browsers',
                                code: 'webpm.install ...',
                                icon: 'fas fa-check fv-text-success',
                                text: 'Available at runtime',
                                href: `/api/assets-gateway/raw/package/QHlvdXdvbC93ZWJwbS1jbGllbnQ=/%5E2.2.0/dist/docs/types/MainModule.InstallInputs.html`,
                            }),
                        ],
                    },
                    { tag: 'div', class: 'my-5' },
                    {
                        tag: 'div',
                        class: 'mx-auto px-2 border p-2 w-100',
                        style: { maxWidth: '1040px' },
                        children: [new CodeEditorView()],
                    },
                ],
            },
        ]
    }
}

export class Card implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'p-1 px-2 m-1 fv-border-left-primary'
    public readonly style = {
        width: '300px',
    }
    public readonly children: ChildrenLike
    constructor({ title, code, icon, text, href }) {
        this.children = [
            {
                tag: 'div',
                innerText: title,
            },
            {
                tag: 'div',
                class: 'd-flex fv-bg-background-alt align-items-center',
                children: [
                    {
                        tag: 'pre',
                        class: 'mb-0 fv-text-focus fv-bg-background-alt w-100 text-center',
                        innerText: code,
                    },
                    href
                        ? {
                              tag: 'a',
                              class: 'h-100 fas fa-external-link-square-alt fv-bg-background-alt mx-1',
                              href,
                          }
                        : { tag: 'div' },
                ],
            },
            {
                tag: 'div',
                class: 'w-100 text-center d-flex justify-content-center align-items-center',
                children: [
                    {
                        tag: 'i',
                        class: icon,
                    },
                    {
                        tag: 'div',
                        class: 'mx-1',
                    },
                    {
                        tag: 'div',
                        class: 'mx-2',
                        innerHTML: text,
                    },
                ],
            },
        ]
    }
}
