import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contact/contact.module.js';
import configuration from './config/configuration.js';
import { EducationModule } from './education/education.module.js';
import { ExperienceModule } from './experience/experience.module.js';
import { validateEnvironment } from './config/env.validation.js';
import { HealthModule } from './health/health.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { SkillsModule } from './skills/skills.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validate: validateEnvironment,
    }),
    HealthModule,
    ProfileModule,
    ProjectsModule,
    ExperienceModule,
    SkillsModule,
    EducationModule,
    ContactModule,
  ],
})
export class AppModule {}
