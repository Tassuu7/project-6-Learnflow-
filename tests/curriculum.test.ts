import { describe, it, expect } from 'vitest';
import { SEED_COURSES, SEED_QUIZZES, SEED_ASSIGNMENTS } from '../src/data/seedData';

describe('Curriculum Structure & Video Delivery', () => {
  it('contains all 4 core technical subjects', () => {
    const titles = SEED_COURSES.map(c => c.title);
    expect(titles.some(t => t.includes('Python'))).toBe(true);
    expect(titles.some(t => t.includes('Java'))).toBe(true);
    expect(titles.some(t => t.includes('DBMS') || t.includes('Database'))).toBe(true);
    expect(titles.some(t => t.includes('Machine Learning'))).toBe(true);
  });

  it('verifies that every course has chapters with valid video URLs', () => {
    SEED_COURSES.forEach(course => {
      expect(course.modules.length).toBeGreaterThan(0);
      course.modules.forEach(mod => {
        expect(mod.chapters.length).toBeGreaterThan(0);
        mod.chapters.forEach(chapter => {
          expect(chapter.videoUrl).toBeDefined();
          expect(chapter.videoUrl!.startsWith('http')).toBe(true);
        });
      });
    });
  });

  it('verifies that courses contain valid quizzes and assignments', () => {
    expect(SEED_QUIZZES.length).toBeGreaterThan(0);
    expect(SEED_ASSIGNMENTS.length).toBeGreaterThan(0);
  });
});
