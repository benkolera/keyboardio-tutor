import * as _ from "lodash";
import { PhysicalMapKey, PhysicalMap, physMapToList } from "./key-model";
import { KeyMapping, KeyTarget, Key } from "./mapping";
import { unreachable } from "./utils";

// TODO: Non Empty List
// TODO: What happens with chording later?
export type KeyPath = {
    modifier?: PhysicalMapKey[]; // Array signifies choice
    key: PhysicalMapKey;
} 

export type KeyPaths = Record<string,KeyPath[]>;

// See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
function expandMapping(
    key: PhysicalMapKey, 
    shifts: PhysicalMapKey[],
    fns: PhysicalMapKey[],
): (m:KeyTarget) => [string, KeyPath][] {
    return (m) => {
        switch (m.type) {
            case "Layer":
            case "Special":
                const v = m.value;
                return [[v, { key }]];
            case "Key": {
                switch (m.value) {
                    case "A":
                    case "B":
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                    case "H":
                    case "I":
                    case "J":
                    case "K":
                    case "L":
                    case "M":
                    case "N":
                    case "O":
                    case "P":
                    case "Q":
                    case "R":
                    case "S":
                    case "T":
                    case "U":
                    case "V":
                    case "W":
                    case "X":
                    case "Y":
                    case "Z":
                        return [
                            [m.value.toLowerCase(), { key }],
                            [m.value, { key, modifier: shifts }]
                        ];
                    case "1": return [
                        [m.value, { key }],
                        ["!", { key, modifier: shifts }]
                    ];
                    case "2": return [
                        [m.value, { key }],
                        ["@", { key, modifier: shifts }]
                    ];
                    case "3": return [
                        [m.value, { key }],
                        ["#", { key, modifier: shifts }]
                    ];
                    case "4": return [
                        [m.value, { key }],
                        ["$", { key, modifier: shifts }]
                    ];
                    case "5": return [
                        [m.value, { key }],
                        ["%", { key, modifier: shifts }]
                    ];
                    case "6": return [
                        [m.value, { key }],
                        ["^", { key, modifier: shifts }]
                    ];
                    case "7": return [
                        [m.value, { key }],
                        ["&", { key, modifier: shifts }]
                    ];
                    case "8": return [
                        [m.value, { key }],
                        ["*", { key, modifier: shifts }]
                    ];
                    case "9": return [
                        [m.value, { key }],
                        ["(", { key, modifier: shifts }]
                    ];
                    case "0": return [
                        [m.value, { key }],
                        [")", { key, modifier: shifts }]
                    ];
                    case "Comma": return [
                        [",", { key }],
                        ["<", { key, modifier: shifts }]
                    ];
                    case "Period": return [
                        [".", { key }],
                        [">", { key, modifier: shifts }]
                    ];
                    case "Minus": return [
                        ["-", { key }],
                        ["_", { key, modifier: shifts }]
                    ];
                    case "Equals": return [
                        ["=", { key }],
                        ["+", { key, modifier: shifts }]
                    ];
                    case "LeftBracket": return [
                        ["[", { key }],
                        ["{", { key, modifier: shifts }]
                    ];
                    case "RightBracket": return [
                        ["]", { key }],
                        ["}", { key, modifier: shifts }]
                    ];
                    case "LeftCurlyBracket": return [["}", { key }]];
                    case "RightCurlyBracket": return [["}", { key }]];
                    case "LeftParen": return [["(", { key }]];
                    case "RightParen": return [[")", { key }]];
                    case "Backslash": return [
                        ["\\", { key }],
                        ["|", { key, modifier: shifts }]
                    ];
                    case "Semicolon": return [
                        [";", { key }],
                        [":", { key, modifier: shifts }]
                    ];
                    case "Quote": return [
                        ["'", { key }],
                        ["\"", { key, modifier: shifts }]
                    ];
                    case "Backtick": return [
                        ["`", { key }],
                        ["~", { key, modifier: shifts }]
                    ];
                    case "Slash": return [
                        ["/", { key }],
                        ["?", { key, modifier: shifts }]
                    ];
                    case "Spacebar": return [[" ", { key }]];
                    case "F1":
                    case "F2":
                    case "F3":
                    case "F4":
                    case "F5":
                    case "F6":
                    case "F7":
                    case "F8":
                    case "F9":
                    case "F10":
                    case "F11":
                    case "F12":
                    case "Enter":
                    case "PageUp":
                    case "PageDown":
                    case "Escape":
                    case "Backspace":
                    case "Insert":
                    case "Delete":
                    case "End":
                    case "Home":
                    case "Tab":
                        return [[m.value, { key }]];
                    case "LeftAlt":
                    case "RightAlt":
                        return [["Alt", { key }]];
                    case "LeftControl":
                    case "RightControl":
                        return [["Control", { key }]];
                    case "LeftGui":
                    case "RightGui":
                        return [["Meta", { key }]];
                    case "LeftShift":
                    case "RightShift":
                        return [["Shift", { key }]];
                    case "Pipe": return [["|", { key }]];
                    case "LeftArrow": return [["ArrowLeft", { key }]];
                    case "UpArrow": return [["ArrowUp", { key }]];
                    case "DownArrow": return [["ArrowDown", { key }]];
                    case "RightArrow": return [["ArrowRight", { key }]];
                    case "KeypadDivide":
                    case "KeypadMultiply":
                    case "KeypadSubtract":
                    case "KeypadAdd":
                    case "KeypadEnter":
                    case "Keypad1":
                    case "Keypad2":
                    case "Keypad3":
                    case "Keypad4":
                    case "Keypad5":
                    case "Keypad6":
                    case "Keypad7":
                    case "Keypad8":
                    case "Keypad9":
                    case "Keypad0":
                    case "KeypadDot":
                    case "LEDEffectNext":
                        return [];
                    default: return unreachable(m.value);
                }
            }
            default: return []; //unreachable(m.type);
        }
    };
}

export function keyPathsFromMapping(mapping:PhysicalMap<KeyMapping | undefined>): KeyPaths {
    const list = physMapToList(mapping);
    const shifts: PhysicalMapKey[] = _.flatMap(
        list,
        ([k,m]) => {
            return (
                m !== undefined 
                && m.standard.type === "Key" 
                && ["LeftShift", "RightShift"].indexOf(m.standard.value) !== -1
            ) ? [k] : [] ;
        }
    );
    const fns: PhysicalMapKey[] = _.flatMap(
        list,
        ([k,m]) => {
            return (
                m !== undefined 
                && m.standard.type === "Layer"
                && m.standard.value === "Function"
            ) ? [k] : [] ;
        }
    );
    if (shifts.length === 0) {
        throw Error("Key mapping must have a shift key");
    }
    if (fns.length === 0) {
        throw Error("Key mapping must have a fn key");
    }
    const out: KeyPaths = {};
    _.flatMap( 
        physMapToList(mapping), 
        ([k,m]) => {
            if (m === undefined){
                return [];
            }
            const mappings: KeyTarget[] = _.flatMap(
                [m.standard, m.fn, m.num], 
                x => x === undefined ? [] : [x]
            );
            return _.flatMap(mappings, expandMapping(k, shifts, fns))
        }
    ).forEach(([k,v]) => {
        if (out[k] === undefined) {
            out[k] = [];
        }
        out[k] = out[k].concat(v).sort((a,b) => {
            if ((a.modifier === undefined) === (b.modifier === undefined)) {
                return 0;
            } else if ( a.modifier === undefined ) {
                return -1;
            } else {
                return 0;
            }
        });
    });
    return out;
}