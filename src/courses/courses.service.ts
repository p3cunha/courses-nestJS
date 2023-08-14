import { HttpException, Injectable } from '@nestjs/common';
import { Observable, map, of, tap } from 'rxjs';
import { COURSES } from './courses.mock';
import { Course } from './courses.interface';

@Injectable()
export class CoursesService {
  courses = COURSES;

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: string): Observable<Course[]> {
    return of(this.courses).pipe(
      map((courses) => courses.filter((c) => c.id === Number(id))),
      tap((courses) => {
        if (!courses.length)
          throw new HttpException(`Don't exist couse with this ID!`, 404);
      }),
    );
  }

  addCourse(course: Course): Observable<Course[]> {
    this.courses.push(course);
    return of(this.courses);
  }

  deleteCourse(id: string): Observable<Course[]> {
    const course = this.courses.find((course) => course.id === Number(id));
    if (!course)
      throw new HttpException(`Don't exist couse with this ID!`, 404);
    if (course) return of(this.courses.filter((c) => c.id !== course.id));
  }
}
