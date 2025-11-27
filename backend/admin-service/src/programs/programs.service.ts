import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly repo: Repository<Program>,
  ) {}

  async create(data: CreateProgramDto): Promise<Program> {
    // Normalize booleans in case frontend sends them as strings
    const is_demo =
      typeof data.is_demo === 'string'
        ? data.is_demo === 'true'
        : data.is_demo ?? false;

    const is_active =
      typeof data.is_active === 'string'
        ? data.is_active === 'true'
        : data.is_active ?? true;

    // Explicit instance to avoid TypeORM overload / TS confusion
    const program = new Program();
    program.code = data.code;
    program.name = data.name;

    // Optional fields – assign only if defined (no null type issues)
    if (data.description !== undefined) {
      program.description = data.description;
    }
    if (data.assessment_title !== undefined) {
      program.assessment_title = data.assessment_title;
    }
    if (data.report_title !== undefined) {
      program.report_title = data.report_title;
    }

    program.is_demo = is_demo;
    program.is_active = is_active;
    // created_at / updated_at handled by DB defaults

    return this.repo.save(program);
  }

  async update(id: number, data: UpdateProgramDto): Promise<Program | null> {
    const is_demo =
      typeof data.is_demo === 'string'
        ? data.is_demo === 'true'
        : data.is_demo;

    const is_active =
      typeof data.is_active === 'string'
        ? data.is_active === 'true'
        : data.is_active;

    const updateData: Partial<Program> = {};

    if (data.code !== undefined) updateData.code = data.code;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.assessment_title !== undefined) {
      updateData.assessment_title = data.assessment_title;
    }
    if (data.report_title !== undefined) {
      updateData.report_title = data.report_title;
    }
    if (is_demo !== undefined) updateData.is_demo = is_demo;
    if (is_active !== undefined) updateData.is_active = is_active;

    await this.repo.update({ id }, updateData);
    return this.findOne(id);
  }

  findAll(): Promise<Program[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Program | null> {
    return this.repo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
