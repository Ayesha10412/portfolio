import { Injectable } from '@nestjs/common';

export interface Project {
  slug: string;
  title: string;
  summary: string;
  techStack: string[];
  featured: boolean;
}

@Injectable()
export class ProjectsService {
  // Temporary data keeps the first API understandable before adding a database.
  private readonly projects: Project[] = [
    {
      slug: 'portfolio-api',
      title: 'Portfolio API',
      summary: 'A NestJS API for serving portfolio content.',
      techStack: ['NestJS', 'TypeScript'],
      featured: true,
    },
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}
