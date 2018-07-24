import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Side } from './key-model';
import { KeyMapping, printableKeyChars, KeyTarget } from './mapping';
import { unreachable } from './utils';

export type FingerIndex = 1 | 2 | 3 | 4 | 5 | 6;

export interface KeyProps {
    side: Side;
    fingerIndex: FingerIndex;
    highlighted: boolean;
    defn: string;
    legend: KeyMapping | undefined;
    center: {x: number, y:number, rotate: number};
    designMode?:boolean;
    onClick: () => void; 
}

function printKeyTarget(kt:KeyTarget): [string, string | undefined] {
    switch(kt.type){
        case "Key": {
            if (kt.value.match("^[A-Z]$")) {
                return [kt.value, undefined];
            } else {
                return printableKeyChars(kt.value)
            }
        };
        case "Layer": {
            switch (kt.value) {
                case "Numpad": return ["num", undefined];
                case "Function": return ["fn", undefined];
                default: return unreachable(kt.value);
            }
        }
        case "Special": {
            switch(kt.value) {
                case "Prog": return ["prog",undefined];
                default: return unreachable(kt.value);
            }
        }
        default: return unreachable(kt);
    } 
}

function expandLegend(legend: KeyMapping): { k: string, s?: string, f?: string, n?: string } {
    const [k, s] = printKeyTarget(legend.standard);
    const [f, u] = legend.fn ?  printKeyTarget(legend.fn) : [undefined, undefined];
    const [n, o] = legend.num ?  printKeyTarget(legend.num) : [undefined, undefined];
    return {k, s, n, f};
}

// tslint:disable-next-line:variable-name
export const Key: React.SFC<KeyProps> = ({ 
    fingerIndex, highlighted, defn, legend, center, designMode, onClick 
}) => {
    const printLegend = legend ? expandLegend(legend) : undefined;
    return <g>
        <path onClick={onClick} className={`key finger${fingerIndex} ${highlighted ? "highlight" : "" }`} strokeWidth="10.42" d={defn} />
        <g className="legend-group" transform={`translate(${center.x},${center.y}) rotate(${center.rotate})`} >
            { printLegend 
            ? <>
                {printLegend.s
                        ? <text className="shift" x="-80" y="-60">{printLegend.s}</text>
                        : <></>
                    }
                    {printLegend.f
                        ? <text className="shift" x="80" y="-60">{printLegend.f}</text>
                        : <></>
                    }
                    {printLegend.n
                        ? <text className="shift" x="80" y="100">{printLegend.n}</text>
                        : <></>
                    }
                    <text className="standard" x="-80" y="100">{printLegend.k}</text>
            </>
            : <></>}
            {(designMode) ? <circle cx="0" cy="0" r="10" stroke="black" stroke-width="1" fill="cyan" /> : <></>}
        </g>
    </g>;
};
