/** Types for refresh-io.mjs, so the tsx scripts type-check under `tsc --noEmit`. */
export declare const ROOT: string;
export declare function at(...parts: string[]): string;
export declare const TZ_OFFSET_MS: number;
export declare const DAY_MS: number;
export declare function localDay(t: number): string;
export declare function localMonth(t: number): string;
export declare function dayStart(day: string): number;
export declare function daysBetween(a: number, b: number): number;
export declare function ensureDir(dir: string): string;
export declare function readText(file: string, fallback?: string): string;
export declare function writeText(file: string, text: string): string;
export declare function readJson<T = any>(file: string, fallback?: T | null): T | null;
export declare function writeJson(file: string, value: unknown): string;
export declare function walk(dir: string, test?: (name: string) => boolean, out?: string[]): string[];
export declare function isDir(p: string): boolean;
export interface RunResult { ok: boolean; code: number; stdout: string; stderr: string; error: string }
export declare function run(cmd: string, args?: string[], opts?: Record<string, unknown>): RunResult;
export declare function arg(argv: string[], name: string, def?: string): string | undefined;
export declare function flag(argv: string[], name: string): boolean;
export declare function say(...m: unknown[]): void;
export declare function warn(...m: unknown[]): void;
export declare function die(msg: string, code?: number): never;
export declare function slug(s: string): string;
export declare function frontMatter(text: string): { data: Record<string, any>; body: string };
