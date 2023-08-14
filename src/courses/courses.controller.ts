import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './courses.interface';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  @ApiOkResponse({ description: 'List of all Courses' })
  getCourses() {
    const courses = this.coursesService.getCourses();
    return courses;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'List of 1 Course' })
  getCourseById(@Param('id') id: string) {
    const courses = this.coursesService.getCourseById(id);
    return courses;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Add a Course' })
  addCourse(@Body() createCourseDto: Course) {
    const courses = this.coursesService.addCourse(createCourseDto);
    return courses;
  }

  @Delete()
  @ApiOkResponse({ description: 'Remove a Course' })
  deleteCourse(@Query() query) {
    const courses = this.coursesService.deleteCourse(query.id);
    return courses;
  }
}
