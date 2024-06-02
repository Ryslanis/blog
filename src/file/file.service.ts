import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import { promises as fs } from 'fs';
import * as fsSync from 'fs';
import * as uuid from 'uuid'


@Injectable()
export class FileService {
    async createFile(file): Promise<string> {
        try {
            const fileName = `${uuid.v4()}.jpg`;
            const filePath = path.resolve(__dirname, '..', 'static');
            const fullPath = path.join(filePath, fileName);

            if (!fsSync.existsSync(filePath)) {
                fsSync.mkdirSync(filePath, {recursive: true})
            }
            await fs.writeFile(fullPath, file.buffer)
            return fileName

        } catch (e) {
            throw new HttpException('Error while uploading an image', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
