import {get as esToolkitGet, setWith as esToolkitSetWith} from 'es-toolkit/compat';

import type {Draft} from 'immer';

type TArrayKey = Array<string>;
type TDottedKey = string;
type TImmerDraft<G> = Draft<G>;

export function immerGetValueIn<G>(proxyState: TImmerDraft<G>, keyPath: TArrayKey | TDottedKey) {
  return esToolkitGet(proxyState, keyPath);
}

export function immerMutatorSetValueIn<G>(proxyState: TImmerDraft<G>, keyPath: TArrayKey | TDottedKey, value: unknown) {
  esToolkitSetWith(proxyState as NonNullable<unknown>, keyPath, value, Object);
}
