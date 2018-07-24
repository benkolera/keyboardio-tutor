import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chance } from "chance";

import { Key, KeyProps, FingerIndex } from './key';
import { Outlines } from './outlines';
import { 
    PhysicalMap, PhysicalMapKey, mapMap, physMapToList, physKeyToLens, svgPaths, physKeyToStr, 
    allPhysKeys,
    mapMapWithKey,
} from "./key-model" 
import "./app.scss";
import { mapping, KeyMapping } from './mapping';
import { keyPathsFromMapping, KeyPaths } from './key-path';
import { unreachable } from './utils';
import { words } from "./wordlist";

export interface CharacterSheetProps {
    kb: PhysicalMap<KeyProps>;
    keyPaths: KeyPaths;
    designMode: boolean;
    typeMode: boolean;
    nextLesson: IterableIterator<string>;
}

export interface CharacterSheetState {
    kb: PhysicalMap<KeyProps>;
    designCoords: {x: number, y:number};
    keystr: string | undefined;
    werdToGo: string;
    werdError: string;
    werdDone: string;
}

declare const svg: any;


export class Tutor extends React.Component<CharacterSheetProps, CharacterSheetState> {
    public svg: any;
    public pt: any;
    public input: HTMLInputElement | null;
    public container: HTMLElement | null;

    constructor(props: CharacterSheetProps) {
        super(props);
        this.state = {
            kb: props.kb,
            designCoords: {x: 0, y: 0},
            keystr: undefined,
            werdToGo: "",
            werdDone: "",
            werdError: "",
        };
        this.svg = null;
        this.pt = null;
    }

    componentDidMount() {
        //setInterval(this.randomHighlight.bind(this), 500);
        if (this.container) {
            this.container.ownerDocument.addEventListener('keydown', (e: KeyboardEvent) => {
                this.keyDown(e);
            });
        }
        this.nextLesson();
    }

    nextLesson() {
        const next = this.props.nextLesson.next();

        if (!next.done) {
            this.setState({ 
                werdToGo: next.value,
                werdDone: "", 
                werdError: "", 
            }, this.highlightNextLetter );
        } else {
            this.setState(
                { werdToGo: "", werdDone: "", werdError: ""},
                () => this.highlightKeys([]),
            )
        }
    }

    highlightNextLetter() {
        if (this.state.werdToGo) {
            const letter = this.state.werdToGo.substring(0,1);
            const paths = this.props.keyPaths[letter];
            if (paths.length > 0){
                const p = paths[0];
                this.highlightKeys([p.key].concat(p.modifier || []));
            }
        } else {
            this.nextLesson();
        }
    }

    randomHighlight() {
        const key = allPhysKeys[Math.floor(Math.random() * allPhysKeys.length)];
        this.highlightKeys([key]);
    }

    highlightKeys(keys: PhysicalMapKey[]) {
        const ls   = keys.map( x => physKeyToLens<KeyProps>(x) );
        this.setState({
            kb: ls.reduce( 
                (m,l) => l.modify((kp) => {
                    return { ...kp, highlighted: true };
                })(m), 
                mapMap(
                    (kp) => {
                        return { ...kp, highlighted: false };
                    }, 
                    this.state.kb
                )),
        });
    }

    setSvg(svg:any) { 
        this.svg = svg;
        if (this.svg) {
            this.pt = this.svg.createSVGPoint();
        }
    }

    render() {
        const { designMode, typeMode } = this.props;
        const { kb, designCoords, keystr, werdToGo, werdDone, werdError } = this.state;

        return <div ref={x => this.container = x} className="container" onKeyDownCapture={this.keyDown.bind(this)}>
            { typeMode 
            ? <div> 
                <pre className="typing-area">
                    <span className="werd-done">{werdDone}</span>
                    <span className="werd-error">{werdError}</span>
                    <span className="werd-togo">{werdToGo}</span>
                </pre>
                <span>{keystr}</span>
            </div>
            : <></>}
            <svg ref={svg => this.setSvg(svg)} onClick={this.clickSvg.bind(this)} fillRule="evenodd" strokeLinecap="round" clipRule="evenodd" viewBox="0 0 8534 5334">
                <Outlines />
                {physMapToList(kb).map(([k, kp]: [PhysicalMapKey, KeyProps]) => {
                    return <Key 
                        key={physKeyToStr(k)} 
                        legend={kp.legend} 
                        fingerIndex={kp.fingerIndex} 
                        highlighted={kp.highlighted}
                        defn={kp.defn}
                        side={kp.side}
                        center={kp.center} 
                        onClick={kp.onClick}
                        />
                })}
                { designMode 
                ? <circle cx={designCoords.x} cy={designCoords.y} r="10" stroke="black" stroke-width="1" fill="magenta" />
                : <></>}
            </svg>
            <div>
                { designMode 
                ? <input className="coords" ref={x => this.input = x}></input>
                : <></>}
            </div>

        </div>;
    }
    
    clickSvg(evt: any) {
        if (this.props.designMode) {
            this.pt.x = evt.clientX;
            this.pt.y = evt.clientY;
        
            // The cursor point, translated into svg coordinates
            var cursorpt = this.pt.matrixTransform(this.svg.getScreenCTM().inverse());
            const coords = "x: " + cursorpt.x + ", y: " + cursorpt.y;
            this.setState({ designCoords: cursorpt });
            if (this.input) {
                this.input.value = coords;
                this.input.select();
                document.execCommand("copy");
            }
        }
    }


    keyDown(e:KeyboardEvent): void {
        if (this.props.typeMode && this.state.werdToGo ) {
            const next = this.state.werdToGo.substring(0,1);
            const werdToGo = this.state.werdToGo.substring(1);

            if (e.key == next && this.state.werdError === "") {
                this.setState(
                    { werdToGo, werdDone: this.state.werdDone + next },
                    this.highlightNextLetter
                );
            } 
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }

}

function keyToFingerIndex(key:PhysicalMapKey): FingerIndex {
    const isLeft = key.side === "left";
    switch(key.type) {
        case "thumb": return 5;
        case "middle": return 4;
        case "fn": return 6;
        case "hand": switch(key.col) {
            case "col1": return isLeft ? 1 : 4;
            case "col2": return isLeft ? 1 : 4;
            case "col3": return isLeft ? 2 : 3;
            case "col4": return isLeft ? 3 : 2;
            case "col5": return isLeft ? 4 : 1;
            case "col6": return isLeft ? 4 : 1;
            default: return unreachable(key.col);
        }
        default: return 1 // return unreachable(key.type);
    }
}

const keyPaths = keyPathsFromMapping(mapping) ;

const model: PhysicalMap<KeyProps> = mapMapWithKey(
    (m, k) => { 
        return {
            highlighted: false,
            fingerIndex: keyToFingerIndex(k),
            defn: m.defn, 
            legend: physKeyToLens<KeyMapping | undefined>(k).get(mapping),
            side: k.side, 
            center: m.center,
            onClick: (() => {}),
        };
    },
    svgPaths
);

function* nextLesson(): IterableIterator<string> {
    const precanned:string[] = [
    ];
    while (precanned.length > 0) {
        yield precanned.shift() as string;
    }
    const chance = new Chance();
    let wshuff = chance.shuffle(words);
    while (wshuff) {
        const now = wshuff.splice(0,5);
        wshuff = wshuff.splice(5);
        yield now.join(" ");
    }
};

ReactDOM.render(
    <Tutor kb={model} nextLesson={nextLesson()} keyPaths={keyPaths} designMode={false} typeMode={true} />,
    document.getElementById('app'),
);
