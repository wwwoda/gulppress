interface CleanConfig {
    favicon?: string | {
        dest: string;
    };
    fonts?: string | {
        dest: string;
    };
    icons?: string | {
        dest: string;
    };
    images?: string | {
        dest: string;
    };
    scripts?: string | {
        dest: string;
    };
    styles?: string | {
        dest: string;
    };
}
export default function (config: CleanConfig): {
    scriptsStyles: () => Promise<string[]>;
    assets: () => Promise<string[]>;
    all: () => Promise<string[]>;
};
export {};
