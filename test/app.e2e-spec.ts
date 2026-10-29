import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('Portfolio API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  it('/api/v1/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect(({ body }) => {
        expect(body.status).toBe('ok');
        expect(body.service).toBe('portfolio-api');
        expect(body.timestamp).toEqual(expect.any(String));
      });
  });

  it('/api/v1/projects (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/projects')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual([
          {
            slug: 'portfolio-api',
            title: 'Portfolio API',
            summary: 'A NestJS API for serving portfolio content.',
            techStack: ['NestJS', 'TypeScript'],
            featured: true,
          },
        ]);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
