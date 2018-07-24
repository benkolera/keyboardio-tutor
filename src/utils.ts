export function unreachable(n:never): never {
    throw new Error("Unhandled value");
}