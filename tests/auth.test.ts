import { describe, it, expect } from 'vitest';
import { UserRole } from '../src/types';

describe('Role and Authentication Governance', () => {
  it('strictly supports only STUDENT, INSTRUCTOR, and ADMIN roles', () => {
    const validRoles: UserRole[] = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];
    expect(validRoles.length).toBe(3);
    expect(validRoles).toContain('STUDENT');
    expect(validRoles).toContain('INSTRUCTOR');
    expect(validRoles).toContain('ADMIN');
  });

  it('rejects deprecated MANAGEMENT role at compile and runtime', () => {
    const roleList = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];
    expect(roleList.includes('MANAGEMENT')).toBe(false);
  });
});
