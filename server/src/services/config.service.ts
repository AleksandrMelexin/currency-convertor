import { DotenvParseOutput, DotenvConfigOutput, config } from "dotenv";

export class ConfigService {
    private readonly config: DotenvParseOutput;

	constructor() {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			console.log('Не удалось прочитать .env файл для конфигурации');
		} else {
			console.log('Конфигурация загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	} 
}