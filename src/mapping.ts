import { PhysicalMap, PhysicalMapKey } from "./key-model";
import { unreachable } from "./utils";

// An incomplete list from:
// https://github.com/keyboardio/Kaleidoscope/blob/master/src/key_defs_keyboard.h
export type Key 
    = "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "0"
    | "F1"
    | "F2"
    | "F3"
    | "F4"
    | "F5"
    | "F6"
    | "F7"
    | "F8"
    | "F9"
    | "F10"
    | "F11"
    | "F12"
    | "Enter"
    | "Escape"
    | "Backspace"
    | "Tab"
    | "Spacebar"
    | "Minus"
    | "Equals"
    | "LeftBracket"
    | "RightBracket"
    | "Backslash"
    | "Semicolon"
    | "Quote"
    | "Backtick"
    | "Comma"
    | "Period"
    | "Slash"
    | "Insert"
    | "Home"
    | "PageUp"
    | "Delete"
    | "End"
    | "PageDown"
    | "RightArrow"
    | "LeftArrow"
    | "DownArrow"
    | "UpArrow"
    | "KeypadDivide"
    | "KeypadMultiply"
    | "KeypadSubtract"
    | "KeypadAdd"
    | "KeypadEnter"
    | "Keypad1"
    | "Keypad2"
    | "Keypad3"
    | "Keypad4"
    | "Keypad5"
    | "Keypad6"
    | "Keypad7"
    | "Keypad8"
    | "Keypad9"
    | "Keypad0"
    | "KeypadDot"
    | "LeftControl"
    | "LeftShift"
    | "LeftAlt"
    | "LeftGui"
    | "RightControl"
    | "RightShift"
    | "RightAlt"
    | "RightGui"
    | "LEDEffectNext"
    // Defined in key_defs_aliases.h
    | "Pipe"
    | "LeftCurlyBracket"
    | "RightCurlyBracket"
    | "LeftParen"
    | "RightParen"
    ;

export function printableKeyChars(key: Key): [string, string | undefined] {
    switch(key) {
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
        return [key.toLowerCase(),key];
        case "1": return [key, "!"];
        case "2": return [key, "@"];
        case "3": return [key, "#"];
        case "4": return [key, "$"];
        case "5": return [key, "%"];
        case "6": return [key, "^"];
        case "7": return [key, "&"];
        case "8": return [key, "*"];
        case "9": return [key, "("];
        case "0": return [key, ")"];
        case "Comma": return [",","<"];
        case "Period": return [".",">"];
        case "Minus": return ["-", "_"];
        case "Equals": return ["=", "+"];
        case "LeftBracket": return ["[","{"];
        case "RightBracket": return ["]","}"];
        case "LeftCurlyBracket": return ["}", undefined];
        case "RightCurlyBracket": return ["}", undefined];
        case "LeftParen": return ["(", undefined];
        case "RightParen": return [")", undefined];
        case "Backslash": return ["\\","|"];
        case "Semicolon": return [";",":"];
        case "Quote": return ["'","\""];
        case "Backtick": return ["`","~"];
        case "Slash": return ["/","?"];
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
        return [key,undefined];
        case "Enter": return ["enter", undefined]; 
        case "PageUp": return ["pgup", undefined]; 
        case "PageDown": return ["pgdn", undefined]; 
        case "Escape": return ["esc", undefined]; 
        case "Backspace": return ["bksp", undefined];
        case "Spacebar": return ["spc", undefined];
        case "Insert": return ["ins", undefined];
        case "Delete": return ["del", undefined];
        case "LeftAlt": return ["alt",undefined];
        case "RightAlt": return ["alt",undefined];
        case "LeftControl": return ["ctrl",undefined];
        case "RightControl": return ["ctrl",undefined];
        case "LeftGui": return ["super",undefined];
        case "RightGui": return ["super",undefined];
        case "LeftShift": return ["shift",undefined];
        case "RightShift": return ["shift",undefined];
        case "LeftArrow": return ["←", undefined];
        case "UpArrow": return ["↑", undefined];
        case "DownArrow": return ["↓", undefined];
        case "RightArrow": return ["→", undefined];
        case "KeypadDivide": return ["/", undefined];
        case "KeypadMultiply": return ["*", undefined];
        case "KeypadSubtract": return ["-", undefined];
        case "KeypadAdd": return ["+", undefined];
        case "KeypadEnter": return ["enter", undefined];
        case "Keypad1": return ["1", undefined];
        case "Keypad2": return ["2", undefined];
        case "Keypad3": return ["3", undefined];
        case "Keypad4": return ["4", undefined];
        case "Keypad5": return ["5", undefined];
        case "Keypad6": return ["6", undefined];
        case "Keypad7": return ["7", undefined];
        case "Keypad8": return ["8", undefined];
        case "Keypad9": return ["9", undefined];
        case "Keypad0": return ["0", undefined];
        case "KeypadDot": return [".", undefined];
        case "LEDEffectNext": return ["led", undefined];
        case "Pipe": return ["|",undefined];
        case "End": 
        case "Home": 
        case "Tab": 
        return [key.toLowerCase(), undefined];
        default: return unreachable(key);
    }
} 

// TODO: ConsumerKeys, SystemKeys, Macros, Mousekeys
type LayerCmd = "Function" | "Numpad";

export type KeyTarget  
    = { type: "Key", value: Key }
    | { type: "Layer", value: LayerCmd }
    | { type: "Special", value: "Prog" }
    ;

function mkKey(value:Key): KeyTarget {
    return { type: "Key", value };
}
function mkSpecial(value:"Prog"): KeyTarget {
    return { type: "Special", value };
}
function mkLayer(value:LayerCmd): KeyTarget {
    return { type: "Layer", value };
}

export type KeyMapping = { standard: KeyTarget, fn?: KeyTarget, num?:KeyTarget }

export const mapping: PhysicalMap<KeyMapping | undefined> = {
    left: {
        hand: {
            row1: {
                col1: { standard: mkSpecial("Prog") },
                col2: { standard: mkKey("1"), fn: mkKey("F1") },
                col3: { standard: mkKey("2"), fn: mkKey("F2") },
                col4: { standard: mkKey("3"), fn: mkKey("F3") },
                col5: { standard: mkKey("4"), fn: mkKey("F4") },
                col6: { standard: mkKey("5"), fn: mkKey("F5") },
            },
            row2: {
                col1: { standard: mkKey("Backtick") },
                col2: { standard: mkKey("Q") },
                col3: { standard: mkKey("G") },
                col4: { standard: mkKey("M") },
                col5: { standard: mkKey("L") },
                col6: { standard: mkKey("W") },
            },
            row3: {
                col1: { standard: mkKey("PageUp"), fn: mkKey("Home") },
                col2: { standard: mkKey("D") },
                col3: { standard: mkKey("S") },
                col4: { standard: mkKey("T") },
                col5: { standard: mkKey("N") },
                col6: { standard: mkKey("R") },
            },
            row4: {
                col1: { standard: mkKey("PageDown"), fn: mkKey("End") },
                col2: { standard: mkKey("Z") },
                col3: { standard: mkKey("X") },
                col4: { standard: mkKey("C") },
                col5: { standard: mkKey("F") },
                col6: { standard: mkKey("J") },
            },
        },
        thumb: {
            col1: { standard: mkKey("LeftControl") },
            col2: { standard: mkKey("Backspace") , fn: mkKey("Delete") },
            col3: { standard: mkKey("LeftGui"), fn: mkKey("LeftAlt") },
            col4: { standard: mkKey("LeftShift") },
        },
        fn: { standard: mkLayer("Function") },
        middle: {
            row1: { standard: mkKey("LEDEffectNext") },
            row2: { standard: mkKey("Tab")},
            row3: { standard: mkKey("Escape")},
        }
    },
    right: {
        hand: {
            row1: {
                col1: { standard: mkKey("6"), fn: mkKey("F6") },
                col2: { standard: mkKey("7"), fn: mkKey("F7") },
                col3: { standard: mkKey("8"), fn: mkKey("F8") },
                col4: { standard: mkKey("9"), fn: mkKey("F9") },
                col5: { standard: mkKey("0"), fn: mkKey("F10") },
                col6: { standard: mkLayer("Numpad"), fn: mkKey("F11") },
            },
            row2: {
                col1: { standard: mkKey("B") },
                col2: { standard: mkKey("Y") , fn: mkKey("LeftCurlyBracket")},
                col3: { standard: mkKey("U") , fn: mkKey("RightCurlyBracket")},
                col4: { standard: mkKey("V") , fn: mkKey("LeftBracket")},
                col5: { standard: mkKey("Semicolon") , fn: mkKey("RightBracket")},
                col6: { standard: mkKey("Equals"), fn: mkKey("F12")},
            },
            row3: {
                col1: { standard: mkKey("I") , fn: mkKey("LeftArrow")},
                col2: { standard: mkKey("A") , fn: mkKey("UpArrow")},
                col3: { standard: mkKey("E") , fn: mkKey("DownArrow")},
                col4: { standard: mkKey("O") , fn: mkKey("RightArrow")},
                col5: { standard: mkKey("H") },
                col6: { standard: mkKey("Quote") },
            },
            row4: {
                col1: { standard: mkKey("K") },
                col2: { standard: mkKey("P") },
                col3: { standard: mkKey("Comma") },
                col4: { standard: mkKey("Period") },
                col5: { standard: mkKey("Slash"), fn: mkKey("Backslash") },
                col6: { standard: mkKey("Minus"), fn: mkKey("Pipe") },
            },
        },
        thumb: {
            col1: { standard: mkKey("RightShift") },
            col2: { standard: mkKey("RightAlt"), fn: mkKey("RightGui") },
            col3: { standard: mkKey("Spacebar") },
            col4: { standard: mkKey("RightControl") },
        },
        fn: { standard: mkLayer("Function") } ,
        middle: {
            row1: undefined,
            row2: { standard: mkKey("Enter") },
            row3: { standard: mkKey("Backslash") }
        }
    }
}
