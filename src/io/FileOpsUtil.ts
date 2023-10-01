import { promises } from 'fs';

export class FileOpsUtil {

    public static async loadDataFromFile(filePath: string): Promise<string> {
        let fileContent: Buffer;
        let fileContentStr: string;

        try{
            fileContent = await promises.readFile(filePath);
            fileContentStr = fileContent.toString();
        } catch(err) {
            console.log(err);
        }

        return fileContentStr;
    }

    public static loadDataToFile(filePath: string, fileContent: object) {
        let fileContentStr = JSON.stringify(fileContent);

        try {
            promises.writeFile(filePath, fileContentStr);
        } catch(err) {
            console.log(err);
        }
    }
}