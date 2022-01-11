import inquirer from 'inquirer';
interface InquirerConfig {
    name: string;
    projectType: string;
    themePaths: string[];
}
export declare class Inquirer {
    private static enterManuallyText;
    static getUserInput(config: InquirerConfig): Promise<inquirer.Answers>;
}
export {};
