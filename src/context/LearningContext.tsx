import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  Enrollment,
  Quiz,
  QuizAttempt,
  Assignment,
  AssignmentSubmission,
  Certificate,
  NotificationItem,
  AuditLogItem,
  CourseDiscussion,
  StudentNote,
  StudentBookmark,
  OfflinePackage,
  User,
  SyncEvent,
  StudentDoubt,
} from '../types';
import {
  SEED_COURSES,
  SEED_ENROLLMENTS,
  SEED_QUIZZES,
  SEED_ASSIGNMENTS,
  SEED_SUBMISSIONS,
  SEED_CERTIFICATES,
  SEED_NOTIFICATIONS,
  SEED_AUDIT_LOGS,
  SEED_USERS,
  SEED_DOUBTS,
} from '../data/seedData';
import {
  getOfflineQueue,
  enqueueOfflineEvent,
  processSyncQueue,
  SyncBatchResult,
} from '../services/syncEngine';
import { useAuth } from './AuthContext';

interface LearningContextType {
  // Course State & Operations
  courses: Course[];
  getCourseById: (id: string) => Course | undefined;
  createCourse: (courseData: Partial<Course>) => Promise<Course>;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  submitCourseForReview: (id: string) => void;
  approveCourse: (id: string, reviewNotes?: string) => void;
  rejectCourse: (id: string, reviewNotes: string) => void;

  // Enrollment & Learning Progress
  enrollments: Enrollment[];
  enrollInCourse: (courseId: string) => Promise<boolean>;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getCourseProgressPercentage: (courseId: string) => number;

  // Quizzes & Assessments
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  getQuizForCourse: (courseId: string) => Quiz | undefined;
  submitQuiz: (quizId: string, userAnswers: Record<string, any>) => Promise<QuizAttempt>;
  createQuiz: (quizData: Partial<Quiz>) => void;

  // Assignments
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  getAssignmentForCourse: (courseId: string) => Assignment | undefined;
  submitAssignment: (assignmentId: string, content: string, attachmentName?: string) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
  createAssignment: (assignmentData: Partial<Assignment>) => void;

  // Certificates
  certificates: Certificate[];
  verifyCertificate: (code: string) => Certificate | undefined;
  issueCertificateIfEligible: (courseId: string) => Certificate | null;

  // Offline Engine & Synchronization
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  offlinePackages: OfflinePackage[];
  downloadCourseOffline: (courseId: string) => Promise<boolean>;
  deleteOfflinePackage: (courseId: string) => void;
  pendingSyncCount: number;
  syncNow: () => Promise<SyncBatchResult>;
  lastSyncTime: string | null;

  // Discussions, Bookmarks, Notes
  discussions: CourseDiscussion[];
  addDiscussionQuestion: (courseId: string, question: string) => void;
  addDiscussionReply: (discussionId: string, replyText: string) => void;
  notes: StudentNote[];
  saveNote: (courseId: string, lessonId: string, lessonTitle: string, content: string) => void;
  bookmarks: StudentBookmark[];
  toggleBookmark: (courseId: string, lessonId: string, lessonTitle: string) => void;

  // Notifications & Audit
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  broadcastNotification: (item: {
    title: string;
    message: string;
    type: 'COURSE' | 'ASSESSMENT' | 'CERTIFICATE' | 'SYSTEM' | 'SYNC';
    actionUrl?: string;
    targetUserId?: string;
  }) => void;
  activeToast: NotificationItem | null;
  dismissToast: () => void;
  notifyStudentsCourseUpdated: (courseId: string, customMessage?: string) => void;
  auditLogs: AuditLogItem[];
  recordAuditLog: (action: string, entity: string, entityId: string, result: 'SUCCESS' | 'FAILURE' | 'WARNING', details: string) => void;

  // User Management (Admin)
  users: User[];
  updateUserStatus: (userId: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') => void;
  updateUserRole: (userId: string, role: any) => void;
  createUser: (userData: Partial<User>) => void;

  // Student Doubts & Faculty Solver Desk
  doubts: StudentDoubt[];
  askDoubt: (courseId: string, chapterTitle: string, question: string, codeSnippet?: string) => Promise<StudentDoubt>;
  answerDoubt: (doubtId: string, answer: string) => void;

  // Faculty Evaluation & Certificates
  saveStudentFeedback: (studentId: string, courseId: string, feedback: string) => void;
  generateCertificateForStudent: (studentId: string, courseId: string, scorePercentage?: number) => Certificate;
  updateCourseVideoLink: (courseId: string, chapterId: string, videoUrl: string, lessonId?: string) => void;

  // Quiz Exam Security Mode
  isQuizActive: boolean;
  setIsQuizActive: (active: boolean) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  // Primary state stores initialized from local persistence or seed data
  const [courses, setCourses] = useState<Course[]>(() => {
    const raw = localStorage.getItem('lf_courses');
    return raw ? JSON.parse(raw) : SEED_COURSES;
  });

  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const raw = localStorage.getItem('lf_enrollments');
    return raw ? JSON.parse(raw) : SEED_ENROLLMENTS;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const raw = localStorage.getItem('lf_quizzes');
    return raw ? JSON.parse(raw) : SEED_QUIZZES;
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const raw = localStorage.getItem('lf_quiz_attempts');
    return raw
      ? JSON.parse(raw)
      : [
          {
            id: 'atm_1',
            quizId: 'qiz_dist_sys_1',
            userId: 'usr_student_1',
            startedAt: '2026-08-25T10:00:00Z',
            submittedAt: '2026-08-25T10:14:20Z',
            scorePercentage: 90,
            totalPoints: 60,
            earnedPoints: 54,
            passed: true,
            userAnswers: {
              qst_1: 1,
              qst_2: [0, 1, 2],
              qst_3: 1,
              qst_4: 'Idempotency Key',
              qst_5: 1,
            },
            isSyncedFromOffline: false,
          },
        ];
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const raw = localStorage.getItem('lf_assignments');
    return raw ? JSON.parse(raw) : SEED_ASSIGNMENTS;
  });

  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => {
    const raw = localStorage.getItem('lf_submissions');
    return raw ? JSON.parse(raw) : SEED_SUBMISSIONS;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const raw = localStorage.getItem('lf_certificates');
    return raw ? JSON.parse(raw) : SEED_CERTIFICATES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const raw = localStorage.getItem('lf_notifications');
    return raw ? JSON.parse(raw) : SEED_NOTIFICATIONS;
  });
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const raw = localStorage.getItem('lf_audit_logs');
    return raw ? JSON.parse(raw) : SEED_AUDIT_LOGS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const raw = localStorage.getItem('lf_users');
    return raw ? JSON.parse(raw) : SEED_USERS.map(({ passwordHash: _, ...u }) => u);
  });

  const [doubts, setDoubts] = useState<StudentDoubt[]>(() => {
    const raw = localStorage.getItem('lf_doubts');
    return raw ? JSON.parse(raw) : SEED_DOUBTS;
  });

  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);

  const [discussions, setDiscussions] = useState<CourseDiscussion[]>(() => {
    const raw = localStorage.getItem('lf_discussions');
    return raw
      ? JSON.parse(raw)
      : [
          {
            id: 'disc_1',
            courseId: 'crs_dist_sys_101',
            userId: 'usr_student_2',
            userName: 'Marcus Vance',
            userRole: 'STUDENT',
            question:
              'In Lesson 1.2, what is the best strategy to handle clock skew when syncing monotonic event logs across multiple smartphone clients?',
            replies: [
              {
                id: 'rep_1',
                userId: 'usr_instructor_1',
                userName: 'Dr. Elena Rostova',
                userRole: 'INSTRUCTOR',
                text: 'Great question Marcus! You should rely on logical clocks (Lamport timestamps or vector clocks) rather than wall-clock physical time (NTP), since physical clocks can drift significantly.',
                createdAt: '2026-08-20T14:30:00Z',
                isInstructorEndorsed: true,
              },
            ],
            createdAt: '2026-08-20T11:00:00Z',
            isPinned: true,
          },
        ];
  });

  const [notes, setNotes] = useState<StudentNote[]>(() => {
    const raw = localStorage.getItem('lf_notes');
    return raw
      ? JSON.parse(raw)
      : [
          {
            id: 'not_1',
            userId: 'usr_student_1',
            courseId: 'crs_dist_sys_101',
            lessonId: 'les_1_1_2',
            lessonTitle: 'Idempotency Keys and Event Ordering',
            content:
              'Remember: Always hash the payload on client to produce client-deterministic UUIDs so re-submitting with identical body maps to the exact same idempotency token!',
            updatedAt: '2026-08-22T15:00:00Z',
          },
        ];
  });

  const [bookmarks, setBookmarks] = useState<StudentBookmark[]>(() => {
    const raw = localStorage.getItem('lf_bookmarks');
    return raw
      ? JSON.parse(raw)
      : [
          {
            id: 'bm_1',
            userId: 'usr_student_1',
            courseId: 'crs_dist_sys_101',
            lessonId: 'les_1_2_1',
            lessonTitle: 'State-based vs Operation-based CRDTs',
            createdAt: '2026-08-24T18:00:00Z',
          },
        ];
  });

  // Offline-First State
  const [isOffline, setIsOfflineState] = useState<boolean>(false);
  const [offlinePackages, setOfflinePackages] = useState<OfflinePackage[]>(() => {
    const raw = localStorage.getItem('lf_offline_packages');
    return raw
      ? JSON.parse(raw)
      : [
          {
            courseId: 'crs_dist_sys_101',
            courseTitle: 'Distributed Systems & Offline-First Architectures',
            version: 1,
            sizeMb: 42.5,
            downloadedAt: '2026-08-20T09:00:00Z',
            lastSyncedAt: '2026-09-03T21:15:00Z',
            storageKey: 'pkg_crs_dist_sys_101',
            pendingSyncCount: 0,
          },
        ];
  });

  const [pendingSyncCount, setPendingSyncCount] = useState<number>(() => {
    return getOfflineQueue().filter((e) => e.syncStatus === 'PENDING').length;
  });

  const [lastSyncTime, setLastSyncTime] = useState<string | null>('2026-09-03T21:15:00Z');

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('lf_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lf_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('lf_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('lf_quiz_attempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem('lf_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('lf_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('lf_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('lf_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('lf_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('lf_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('lf_doubts', JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem('lf_discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('lf_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('lf_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('lf_offline_packages', JSON.stringify(offlinePackages));
  }, [offlinePackages]);

  // Keep pending count updated
  const refreshPendingSyncCount = () => {
    const queue = getOfflineQueue();
    setPendingSyncCount(queue.filter((e) => e.syncStatus === 'PENDING').length);
  };

  const setIsOffline = (offline: boolean) => {
    setIsOfflineState(offline);
    recordAuditLog(
      offline ? 'SYSTEM_NETWORK_OFFLINE_SIMULATED' : 'SYSTEM_NETWORK_ONLINE_RESTORED',
      'NetworkTransport',
      'client',
      'SUCCESS',
      `Client connectivity state switched to ${offline ? 'OFFLINE' : 'ONLINE'}`
    );
  };

  const recordAuditLog = (
    action: string,
    entity: string,
    entityId: string,
    result: 'SUCCESS' | 'FAILURE' | 'WARNING',
    details: string
  ) => {
    const newLog: AuditLogItem = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actorId: currentUser?.id || 'sys',
      actorName: currentUser?.name || 'System Daemon',
      actorRole: currentUser?.role || 'ADMIN',
      action,
      entity,
      entityId,
      result,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 200)]);
  };

  const getCourseById = (id: string) => courses.find((c) => c.id === id);

  const createCourse = async (courseData: Partial<Course>): Promise<Course> => {
    const newCourse: Course = {
      id: `crs_${Date.now()}`,
      title: courseData.title || 'Untitled Course',
      slug: (courseData.title || 'untitled').toLowerCase().replace(/[^\w]/g, '-'),
      description: courseData.description || '',
      instructorId: currentUser?.id || 'usr_instructor_1',
      instructorName: currentUser?.name || 'Dr. Elena Rostova',
      category: courseData.category || 'General',
      subject: courseData.subject || 'Applied Science',
      difficulty: courseData.difficulty || 'BEGINNER',
      estimatedHours: courseData.estimatedHours || 10,
      status: 'DRAFT',
      modules: courseData.modules || [],
      prerequisites: courseData.prerequisites || [],
      learningObjectives: courseData.learningObjectives || [],
      isOfflineAvailable: courseData.isOfflineAvailable ?? true,
      packageSizeMb: courseData.packageSizeMb || 15.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: courseData.tags || [],
    };

    setCourses((prev) => [newCourse, ...prev]);
    recordAuditLog('COURSE_CREATED', 'Course', newCourse.id, 'SUCCESS', `Created draft course: "${newCourse.title}"`);
    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c))
    );
    recordAuditLog('COURSE_UPDATED', 'Course', id, 'SUCCESS', `Updated course metadata for ID: ${id}`);
  };

  const submitCourseForReview = (id: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: 'SUBMITTED', updatedAt: new Date().toISOString() } : c
      )
    );
    recordAuditLog('COURSE_SUBMITTED', 'Course', id, 'SUCCESS', `Submitted course for curriculum review`);
    // Notify admin
    setNotifications((prev) => [
      {
        id: `not_${Date.now()}`,
        userId: 'usr_admin_1',
        title: 'New Course Submission',
        message: `An instructor submitted a course for verification.`,
        type: 'COURSE',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const approveCourse = (id: string, reviewNotes?: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'PUBLISHED', reviewNotes, updatedAt: new Date().toISOString() }
          : c
      )
    );
    recordAuditLog('COURSE_APPROVED', 'Course', id, 'SUCCESS', `Admin approved course. Published to catalog.`);
  };

  const rejectCourse = (id: string, reviewNotes: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'DRAFT', reviewNotes, updatedAt: new Date().toISOString() }
          : c
      )
    );
    recordAuditLog('COURSE_REJECTED', 'Course', id, 'WARNING', `Admin returned course with feedback: ${reviewNotes}`);
  };

  const enrollInCourse = async (courseId: string): Promise<boolean> => {
    if (!currentUser) return false;

    const existing = enrollments.find(
      (e) => e.userId === currentUser.id && e.courseId === courseId
    );
    if (existing) return true;

    const newEnrollment: Enrollment = {
      id: `enr_${Date.now()}`,
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      completedLessons: [],
      lastAccessedAt: new Date().toISOString(),
      timeSpentMinutes: 0,
      isDownloadedOffline: false,
    };

    setEnrollments((prev) => [...prev, newEnrollment]);
    recordAuditLog('COURSE_ENROLLMENT', 'Enrollment', newEnrollment.id, 'SUCCESS', `Student enrolled in ${courseId}`);
    return true;
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    if (!currentUser) return;

    if (isOffline) {
      // Enqueue offline action
      enqueueOfflineEvent(currentUser.id, 'LESSON_COMPLETED', lessonId, { courseId, lessonId });
      refreshPendingSyncCount();
    }

    // Optimistic local state update
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.userId === currentUser.id && e.courseId === courseId) {
          const completed = new Set(e.completedLessons);
          completed.add(lessonId);
          const completedList = Array.from(completed);
          const course = courses.find((c) => c.id === courseId);
          const totalLessons =
            course?.modules.reduce(
              (acc, m) => acc + m.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
              0
            ) || 1;

          const isFullyCompleted = completedList.length >= totalLessons;

          return {
            ...e,
            completedLessons: completedList,
            completedAt: isFullyCompleted ? e.completedAt || new Date().toISOString() : undefined,
            lastAccessedAt: new Date().toISOString(),
            timeSpentMinutes: e.timeSpentMinutes + 15,
          };
        }
        return e;
      })
    );

    if (!isOffline) {
      recordAuditLog('LESSON_COMPLETED', 'Lesson', lessonId, 'SUCCESS', `Completed lesson ${lessonId} in ${courseId}`);
    }

    // Check if certificate eligibility triggers
    setTimeout(() => {
      issueCertificateIfEligible(courseId);
    }, 100);
  };

  const isLessonCompleted = (courseId: string, lessonId: string): boolean => {
    if (!currentUser) return false;
    const enr = enrollments.find((e) => e.userId === currentUser.id && e.courseId === courseId);
    return enr ? enr.completedLessons.includes(lessonId) : false;
  };

  const getCourseProgressPercentage = (courseId: string): number => {
    if (!currentUser) return 0;
    const enr = enrollments.find((e) => e.userId === currentUser.id && e.courseId === courseId);
    if (!enr) return 0;
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;

    const totalLessons = course.modules.reduce(
      (acc, m) => acc + m.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
      0
    );

    if (totalLessons === 0) return 0;
    return Math.min(100, Math.round((enr.completedLessons.length / totalLessons) * 100));
  };

  const getQuizForCourse = (courseId: string): Quiz | undefined => {
    return quizzes.find((q) => q.courseId === courseId);
  };

  const submitQuiz = async (
    quizId: string,
    userAnswers: Record<string, any>
  ): Promise<QuizAttempt> => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz || !currentUser) {
      throw new Error('Quiz or user not found');
    }

    let earnedPoints = 0;
    let totalPoints = 0;

    for (const question of quiz.questions) {
      totalPoints += question.points;
      const userAnswer = userAnswers[question.id];

      if (question.type === 'MULTIPLE_CHOICE' || question.type === 'TRUE_FALSE') {
        if (userAnswer === question.correctAnswers[0]) {
          earnedPoints += question.points;
        }
      } else if (question.type === 'MULTIPLE_ANSWER') {
        if (Array.isArray(userAnswer)) {
          const sortedUser = [...userAnswer].sort();
          const sortedCorrect = [...question.correctAnswers].sort();
          if (JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)) {
            earnedPoints += question.points;
          }
        }
      } else if (question.type === 'FILL_BLANK') {
        if (typeof userAnswer === 'string' && question.correctTextAnswer) {
          if (userAnswer.trim().toLowerCase() === question.correctTextAnswer.trim().toLowerCase()) {
            earnedPoints += question.points;
          }
        }
      }
    }

    const scorePercentage = Math.round((earnedPoints / (totalPoints || 1)) * 100);
    const passed = scorePercentage >= quiz.passingScorePercentage;

    const attempt: QuizAttempt = {
      id: `atm_${Date.now()}`,
      quizId,
      userId: currentUser.id,
      startedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      submittedAt: new Date().toISOString(),
      scorePercentage,
      totalPoints,
      earnedPoints,
      passed,
      userAnswers,
      isSyncedFromOffline: isOffline,
    };

    if (isOffline) {
      enqueueOfflineEvent(currentUser.id, 'QUIZ_SUBMITTED', quizId, attempt);
      refreshPendingSyncCount();
    }

    setQuizAttempts((prev) => [attempt, ...prev]);

    recordAuditLog(
      'QUIZ_ATTEMPT_SUBMITTED',
      'QuizAttempt',
      attempt.id,
      passed ? 'SUCCESS' : 'WARNING',
      `Quiz: ${quiz.title}, Score: ${scorePercentage}% (${passed ? 'PASSED' : 'FAILED'})`
    );

    // Check certificate trigger
    setTimeout(() => {
      issueCertificateIfEligible(quiz.courseId);
    }, 100);

    return attempt;
  };

  const createQuiz = (quizData: Partial<Quiz>) => {
    const newQuiz: Quiz = {
      id: `qiz_${Date.now()}`,
      courseId: quizData.courseId || '',
      title: quizData.title || 'Untitled Assessment',
      description: quizData.description || '',
      timeLimitMinutes: quizData.timeLimitMinutes || 20,
      passingScorePercentage: quizData.passingScorePercentage || 70,
      maxAttempts: quizData.maxAttempts || 3,
      isOfflinePermitted: quizData.isOfflinePermitted ?? true,
      createdAt: new Date().toISOString(),
      questions: quizData.questions || [],
    };
    setQuizzes((prev) => [...prev, newQuiz]);
    recordAuditLog('QUIZ_CREATED', 'Quiz', newQuiz.id, 'SUCCESS', `Created quiz: ${newQuiz.title}`);
  };

  const getAssignmentForCourse = (courseId: string) => {
    return assignments.find((a) => a.courseId === courseId);
  };

  const submitAssignment = (
    assignmentId: string,
    content: string,
    attachmentName?: string
  ) => {
    if (!currentUser) return;

    const submission: AssignmentSubmission = {
      id: `sub_${Date.now()}`,
      assignmentId,
      userId: currentUser.id,
      studentName: currentUser.name,
      submittedAt: new Date().toISOString(),
      content,
      attachmentName,
      status: 'SUBMITTED',
    };

    if (isOffline) {
      enqueueOfflineEvent(currentUser.id, 'ASSIGNMENT_SUBMITTED', assignmentId, submission);
      refreshPendingSyncCount();
    }

    setSubmissions((prev) => [submission, ...prev.filter((s) => s.assignmentId !== assignmentId || s.userId !== currentUser.id)]);
    recordAuditLog('ASSIGNMENT_SUBMITTED', 'AssignmentSubmission', submission.id, 'SUCCESS', `Submitted coursework for ${assignmentId}`);
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              status: 'GRADED',
              score,
              feedback,
              gradedBy: currentUser?.name || 'Instructor',
              gradedAt: new Date().toISOString(),
            }
          : s
      )
    );
    recordAuditLog('ASSIGNMENT_GRADED', 'AssignmentSubmission', submissionId, 'SUCCESS', `Score: ${score}/100 with feedback.`);
  };

  const createAssignment = (assignmentData: Partial<Assignment>) => {
    const newAssignment: Assignment = {
      id: `asg_${Date.now()}`,
      courseId: assignmentData.courseId || '',
      title: assignmentData.title || 'New Course Assignment',
      instructions: assignmentData.instructions || '',
      dueDate: assignmentData.dueDate || new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
      maxScore: assignmentData.maxScore || 100,
      rubric: assignmentData.rubric || [{ criterion: 'Quality & Completeness', points: 100 }],
      isOfflinePermitted: assignmentData.isOfflinePermitted ?? true,
    };
    setAssignments((prev) => [...prev, newAssignment]);
    recordAuditLog('ASSIGNMENT_CREATED', 'Assignment', newAssignment.id, 'SUCCESS', `Created assignment: ${newAssignment.title}`);

    // Broadcast notification to students
    const relatedCourse = courses.find((c) => c.id === newAssignment.courseId);
    broadcastNotification({
      title: `New Assignment: ${newAssignment.title}`,
      message: `A new practical assessment is available${relatedCourse ? ` in "${relatedCourse.title}"` : ''}. Complete by ${new Date(newAssignment.dueDate).toLocaleDateString()}.`,
      type: 'ASSESSMENT',
      actionUrl: 'assignments',
    });
  };

  const issueCertificateIfEligible = (courseId: string): Certificate | null => {
    if (!currentUser || currentUser.role !== 'STUDENT') return null;

    const enr = enrollments.find((e) => e.userId === currentUser.id && e.courseId === courseId);
    const course = courses.find((c) => c.id === courseId);
    if (!enr || !course) return null;

    // Check all lessons completed
    const totalLessons = course.modules.reduce(
      (acc, m) => acc + m.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
      0
    );

    if (enr.completedLessons.length < totalLessons) return null;

    // Check quiz passed if course has one
    const quiz = quizzes.find((q) => q.courseId === courseId);
    if (quiz) {
      const attempts = quizAttempts.filter(
        (a) => a.quizId === quiz.id && a.userId === currentUser.id && a.passed
      );
      if (attempts.length === 0) return null;
    }

    // Check if certificate already exists
    const existing = certificates.find(
      (c) => c.userId === currentUser.id && c.courseId === courseId
    );
    if (existing) return existing;

    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      certificateNumber: `LF-2026-${Math.floor(1000 + Math.random() * 9000)}-${course.subject.substring(0, 3).toUpperCase()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      courseId,
      courseTitle: course.title,
      instructorName: course.instructorName,
      issueDate: new Date().toISOString(),
      verificationCode: `VERIFY-${course.subject.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      scorePercentage: 94,
    };

    setCertificates((prev) => [newCert, ...prev]);

    setNotifications((prev) => [
      {
        id: `not_cert_${Date.now()}`,
        userId: currentUser.id,
        title: 'Certificate Awarded!',
        message: `Congratulations! You have completed all syllabus requirements for "${course.title}".`,
        type: 'CERTIFICATE',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    recordAuditLog('CERTIFICATE_ISSUED', 'Certificate', newCert.id, 'SUCCESS', `Issued verifiable credential to ${currentUser.name}`);
    return newCert;
  };

  const verifyCertificate = (code: string): Certificate | undefined => {
    const clean = code.trim().toUpperCase();
    return certificates.find(
      (c) => c.verificationCode.toUpperCase() === clean || c.certificateNumber.toUpperCase() === clean
    );
  };

  const downloadCourseOffline = async (courseId: string): Promise<boolean> => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return false;

    // Simulate download progress delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newPkg: OfflinePackage = {
      courseId,
      courseTitle: course.title,
      version: 1,
      sizeMb: course.packageSizeMb || 25,
      downloadedAt: new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
      storageKey: `pkg_${courseId}`,
      pendingSyncCount: 0,
    };

    setOfflinePackages((prev) => [newPkg, ...prev.filter((p) => p.courseId !== courseId)]);
    setEnrollments((prev) =>
      prev.map((e) => (e.courseId === courseId ? { ...e, isDownloadedOffline: true } : e))
    );

    recordAuditLog('OFFLINE_PACKAGE_DOWNLOADED', 'OfflinePackage', courseId, 'SUCCESS', `Downloaded package for ${course.title} (${course.packageSizeMb} MB)`);
    return true;
  };

  const deleteOfflinePackage = (courseId: string) => {
    setOfflinePackages((prev) => prev.filter((p) => p.courseId !== courseId));
    setEnrollments((prev) =>
      prev.map((e) => (e.courseId === courseId ? { ...e, isDownloadedOffline: false } : e))
    );
    recordAuditLog('OFFLINE_PACKAGE_DELETED', 'OfflinePackage', courseId, 'SUCCESS', `Cleared local package cache for ${courseId}`);
  };

  const syncNow = async (): Promise<SyncBatchResult> => {
    const result = processSyncQueue((event) => {
      // Reconcile according to event type
      switch (event.eventType) {
        case 'LESSON_COMPLETED': {
          const { courseId, lessonId } = event.payload;
          setEnrollments((prev) =>
            prev.map((e) => {
              if (e.userId === event.userId && e.courseId === courseId) {
                const set = new Set(e.completedLessons);
                set.add(lessonId);
                return { ...e, completedLessons: Array.from(set) };
              }
              return e;
            })
          );
          return { success: true };
        }
        case 'QUIZ_SUBMITTED': {
          setQuizAttempts((prev) => {
            const exists = prev.some((a) => a.id === event.payload.id);
            return exists ? prev : [event.payload, ...prev];
          });
          return { success: true, conflictResolved: true };
        }
        case 'ASSIGNMENT_SUBMITTED': {
          setSubmissions((prev) => {
            const exists = prev.some((s) => s.id === event.payload.id);
            return exists ? prev : [event.payload, ...prev];
          });
          return { success: true };
        }
        case 'NOTE_CREATED': {
          setNotes((prev) => [event.payload, ...prev]);
          return { success: true };
        }
        default:
          return { success: true };
      }
    });

    setLastSyncTime(new Date().toISOString());
    refreshPendingSyncCount();

    recordAuditLog(
      'OFFLINE_SYNC_EXECUTED',
      'SyncQueue',
      `batch_${Date.now()}`,
      result.failedCount === 0 ? 'SUCCESS' : 'WARNING',
      `Processed ${result.totalProcessed} events (${result.successCount} ok, ${result.conflictResolvedCount} resolved, ${result.failedCount} errors)`
    );

    return result;
  };

  const addDiscussionQuestion = (courseId: string, question: string) => {
    if (!currentUser) return;
    const newDisc: CourseDiscussion = {
      id: `disc_${Date.now()}`,
      courseId,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      question,
      replies: [],
      createdAt: new Date().toISOString(),
    };
    setDiscussions((prev) => [newDisc, ...prev]);
  };

  const addDiscussionReply = (discussionId: string, replyText: string) => {
    if (!currentUser) return;
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              replies: [
                ...d.replies,
                {
                  id: `rep_${Date.now()}`,
                  userId: currentUser.id,
                  userName: currentUser.name,
                  userRole: currentUser.role,
                  text: replyText,
                  createdAt: new Date().toISOString(),
                  isInstructorEndorsed: currentUser.role === 'INSTRUCTOR',
                },
              ],
            }
          : d
      )
    );
  };

  const saveNote = (
    courseId: string,
    lessonId: string,
    lessonTitle: string,
    content: string
  ) => {
    if (!currentUser) return;
    setNotes((prev) => {
      const existing = prev.find(
        (n) => n.userId === currentUser.id && n.lessonId === lessonId
      );
      if (existing) {
        return prev.map((n) =>
          n.id === existing.id ? { ...n, content, updatedAt: new Date().toISOString() } : n
        );
      }
      return [
        {
          id: `not_${Date.now()}`,
          userId: currentUser.id,
          courseId,
          lessonId,
          lessonTitle,
          content,
          updatedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  };

  const toggleBookmark = (courseId: string, lessonId: string, lessonTitle: string) => {
    if (!currentUser) return;
    setBookmarks((prev) => {
      const exists = prev.some(
        (b) => b.userId === currentUser.id && b.lessonId === lessonId
      );
      if (exists) {
        return prev.filter(
          (b) => !(b.userId === currentUser.id && b.lessonId === lessonId)
        );
      }
      return [
        {
          id: `bm_${Date.now()}`,
          userId: currentUser.id,
          courseId,
          lessonId,
          lessonTitle,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const broadcastNotification = (item: {
    title: string;
    message: string;
    type: 'COURSE' | 'ASSESSMENT' | 'CERTIFICATE' | 'SYSTEM' | 'SYNC';
    actionUrl?: string;
    targetUserId?: string;
  }) => {
    const newNotif: NotificationItem = {
      id: `not_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: item.targetUserId || 'ALL',
      title: item.title,
      message: item.message,
      type: item.type,
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl: item.actionUrl,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setActiveToast(newNotif);
    // Auto dismiss after 6s
    setTimeout(() => {
      setActiveToast((current) => (current?.id === newNotif.id ? null : current));
    }, 6000);
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const notifyStudentsCourseUpdated = (courseId: string, customMessage?: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    broadcastNotification({
      title: `Course Content Updated: ${course.title}`,
      message:
        customMessage ||
        `New chapter lessons, video lectures, and updated syllabus items are now available to study in "${course.title}".`,
      type: 'COURSE',
      actionUrl: 'learning',
    });
  };

  const updateUserStatus = (
    userId: string,
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  ) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
    recordAuditLog('USER_STATUS_UPDATED', 'User', userId, 'SUCCESS', `Status changed to ${status}`);
  };

  const updateUserRole = (userId: string, role: any) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
    recordAuditLog('USER_ROLE_UPDATED', 'User', userId, 'SUCCESS', `Role changed to ${role}`);
  };

  const createUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: userData.email || `user_${Date.now()}@example.local`,
      name: userData.name || 'New Member',
      role: userData.role || 'STUDENT',
      department: userData.department || 'General Academy',
      title: userData.title || 'Scholar',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [newUser, ...prev]);
    recordAuditLog('USER_CREATED', 'User', newUser.id, 'SUCCESS', `Created account for ${newUser.name} (${newUser.role})`);
  };

  const askDoubt = async (
    courseId: string,
    chapterTitle: string,
    question: string,
    codeSnippet?: string
  ): Promise<StudentDoubt> => {
    const course = courses.find((c) => c.id === courseId);
    const newDoubt: StudentDoubt = {
      id: `dbt_${Date.now()}`,
      courseId,
      courseTitle: course ? course.title : 'General Subject',
      chapterTitle: chapterTitle || 'General Doubt',
      studentId: currentUser?.id || 'usr_student_1',
      studentName: currentUser?.name || 'Student',
      facultyId: course ? course.instructorId : 'usr_instructor_1',
      facultyName: course ? course.instructorName : 'Course Faculty',
      question,
      codeSnippet,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    setDoubts((prev) => [newDoubt, ...prev]);

    broadcastNotification({
      title: 'Doubt Submitted to Faculty',
      message: `Your question regarding "${newDoubt.courseTitle}" has been routed to ${newDoubt.facultyName}.`,
      type: 'COURSE',
      actionUrl: 'doubts',
      targetUserId: currentUser?.id,
    });

    recordAuditLog(
      'STUDENT_DOUBT_ASKED',
      'StudentDoubt',
      newDoubt.id,
      'SUCCESS',
      `Student ${newDoubt.studentName} asked faculty: ${newDoubt.question.slice(0, 40)}...`
    );

    return newDoubt;
  };

  const answerDoubt = (doubtId: string, answer: string) => {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === doubtId
          ? {
              ...d,
              answer,
              status: 'RESOLVED',
              answeredAt: new Date().toISOString(),
              facultyId: currentUser?.id || d.facultyId,
              facultyName: currentUser?.name || d.facultyName,
            }
          : d
      )
    );

    const doubt = doubts.find((d) => d.id === doubtId);
    if (doubt) {
      broadcastNotification({
        title: 'Faculty Resolved Your Question!',
        message: `${currentUser?.name || 'Faculty'} submitted a solution for "${doubt.courseTitle}".`,
        type: 'COURSE',
        actionUrl: 'doubts',
        targetUserId: doubt.studentId,
      });
    }

    recordAuditLog(
      'FACULTY_DOUBT_RESOLVED',
      'StudentDoubt',
      doubtId,
      'SUCCESS',
      `Faculty answered student question`
    );
  };

  const saveStudentFeedback = (studentId: string, courseId: string, feedback: string) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e.userId === studentId && e.courseId === courseId
          ? { ...e, facultyFeedback: feedback }
          : e
      )
    );
    broadcastNotification({
      title: 'Faculty Feedback Posted',
      message: `Your course faculty submitted academic feedback on your progress.`,
      type: 'COURSE',
      actionUrl: 'analytics',
      targetUserId: studentId,
    });
  };

  const generateCertificateForStudent = (
    studentId: string,
    courseId: string,
    scorePercentage = 90
  ): Certificate => {
    const course = courses.find((c) => c.id === courseId);
    const targetUser = users.find((u) => u.id === studentId);
    const randomCode = `VERIFY-${Math.floor(1000 + Math.random() * 9000)}-${course?.subject || 'CERT'}`;
    const certNumber = `LF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      certificateNumber: certNumber,
      userId: studentId,
      userName: targetUser?.name || 'Student Scholar',
      courseId,
      courseTitle: course?.title || 'Academic Curriculum',
      instructorName: course?.instructorName || currentUser?.name || 'Faculty Instructor',
      issueDate: new Date().toISOString(),
      verificationCode: randomCode,
      scorePercentage,
    };

    setCertificates((prev) => {
      const existingIdx = prev.findIndex((c) => c.userId === studentId && c.courseId === courseId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newCert;
        return updated;
      }
      return [newCert, ...prev];
    });

    broadcastNotification({
      title: 'Certificate Issued by Faculty!',
      message: `A course completion certificate has been generated for ${newCert.courseTitle}.`,
      type: 'CERTIFICATE',
      actionUrl: 'certificates',
      targetUserId: studentId,
    });

    return newCert;
  };

  const updateCourseVideoLink = (
    courseId: string,
    chapterId: string,
    videoUrl: string,
    lessonId?: string
  ) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const updatedModules = c.modules.map((m) => ({
          ...m,
          chapters: m.chapters.map((ch) => {
            if (ch.id !== chapterId) return ch;
            const updatedChapter = { ...ch, videoUrl };
            if (lessonId) {
              updatedChapter.lessons = ch.lessons.map((les) =>
                les.id === lessonId ? { ...les, videoUrl } : les
              );
            }
            return updatedChapter;
          }),
        }));
        return { ...c, modules: updatedModules, updatedAt: new Date().toISOString() };
      })
    );

    notifyStudentsCourseUpdated(courseId, 'Faculty updated chapter explanation video lectures.');
  };

  return (
    <LearningContext.Provider
      value={{
        courses,
        getCourseById,
        createCourse,
        updateCourse,
        submitCourseForReview,
        approveCourse,
        rejectCourse,
        enrollments,
        enrollInCourse,
        markLessonComplete,
        isLessonCompleted,
        getCourseProgressPercentage,
        quizzes,
        quizAttempts,
        getQuizForCourse,
        submitQuiz,
        createQuiz,
        assignments,
        submissions,
        getAssignmentForCourse,
        submitAssignment,
        gradeSubmission,
        createAssignment,
        certificates,
        verifyCertificate,
        issueCertificateIfEligible,
        isOffline,
        setIsOffline,
        offlinePackages,
        downloadCourseOffline,
        deleteOfflinePackage,
        pendingSyncCount,
        syncNow,
        lastSyncTime,
        discussions,
        addDiscussionQuestion,
        addDiscussionReply,
        notes,
        saveNote,
        bookmarks,
        toggleBookmark,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        broadcastNotification,
        activeToast,
        dismissToast,
        notifyStudentsCourseUpdated,
        auditLogs,
        recordAuditLog,
        users,
        updateUserStatus,
        updateUserRole,
        createUser,
        doubts,
        askDoubt,
        answerDoubt,
        saveStudentFeedback,
        generateCertificateForStudent,
        updateCourseVideoLink,
        isQuizActive,
        setIsQuizActive,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = (): LearningContextType => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
