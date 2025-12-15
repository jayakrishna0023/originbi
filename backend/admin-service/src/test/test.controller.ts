import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { getWelcomeEmailTemplate } from '../mail/templates/welcome.template';

@Controller('test')
export class TestController {
    @Get('preview-email')
    previewEmail(@Res() res: Response) {
        const html = getWelcomeEmailTemplate(
            'Ariyappan',
            'test@example.com',
            'password123',
            'http://localhost:3000'
        );
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    }
}
