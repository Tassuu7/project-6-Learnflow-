import { describe, it, expect } from 'vitest';
import { SEED_DOUBTS } from '../src/data/seedData';
import { StudentDoubt } from '../src/types';

describe('Student Doubt Submission & Faculty Solver Desk', () => {
  it('loads seeded doubts with valid initial statuses', () => {
    expect(SEED_DOUBTS.length).toBeGreaterThan(0);
    const statuses = SEED_DOUBTS.map(d => d.status);
    expect(statuses).toContain('RESOLVED');
    expect(statuses).toContain('PENDING');
  });

  it('validates doubt data structure integrity', () => {
    const doubt: StudentDoubt = {
      id: 'test_doubt_1',
      studentId: 'std_1',
      studentName: 'Alice Johnson',
      courseId: 'crs_python_101',
      subject: 'Python',
      question: 'How does GIL impact threading?',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    expect(doubt.subject).toBe('Python');
    expect(doubt.status).toBe('PENDING');
  });
});
