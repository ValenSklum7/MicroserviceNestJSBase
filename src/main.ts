process.env.TZ = 'Europe/Madrid';

import 'module-alias/register';
import * as rfs from 'rotating-file-stream';
import { install } from 'source-map-support';
import * as path from 'path';
install();


import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ProcessInterceptor } from './modules/_shared/infrastructure/interceptor/Process.interceptor';

import multipart from 'fastify-multipart';
import * as momentTimeZone from 'moment-timezone';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      logger: ['error', 'warn'],
      cors: {
        origin: process.env.corsOrigin ? process.env.corsOrigin.split(',') : "*",
        credentials: true,
      },
    }
  );
  app.register(multipart);
  ProcessInterceptor.load();

  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, '../log'),
  });

  const accessLogStreamError = rfs.createStream('access_error.log', {
    interval: '1d',
    path: path.join(__dirname, '../log'),
  });

  morgan.token('date', function (req, res, tz) {
    return momentTimeZone().tz(tz).format('DD/MMM/YYYY HH:mm:ss');
  });

  // Success Logs
  app.use(
    morgan(
      `[:date[${process.env.TZ}]] ":method :url" :status :response-time ms`,
      {
        stream: accessLogStream,
        skip: function (req, res) {
          return res.statusCode > 300;
        },
      }
    )
  );

  // Errors Logs
  app.use(
    morgan(
      `[:date[${process.env.TZ}]] ":method :url" :status :response-time ms`,
      {
        stream: accessLogStreamError,
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      }
    )
  );
  // app.useGlobalInterceptors(new ExceptionInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/Api');
  app.listen(process.env.PORT || 4000, '0.0.0.0').then(() => {
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Servidor escuchando en el puerto ${process.env.PORT || 4000}`
    );
  });
}

bootstrap();
